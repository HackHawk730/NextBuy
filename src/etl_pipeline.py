"""
Distributed ETL Pipeline
Extracts raw e-commerce interaction data, performs validation, schema enforcement,
filtering, feature enrichment, and writes partitioned Apache Parquet datasets.
Supports both PySpark distributed execution and Pandas fallback.
"""

import os
import sys
from pathlib import Path
import logging

# Ensure root in sys.path
root_dir = Path(__file__).resolve().parent.parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

# Ensure UTF-8 output on Windows terminals
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if sys.stderr and hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("ETLPipeline")

def run_pyspark_etl(raw_dir: Path, processed_dir: Path, min_item_reviews=2, min_user_reviews=2):
    """
    Distributed ETL pipeline using Apache Spark DataFrames.
    """
    from src.spark_session import get_spark_session
    from pyspark.sql.functions import col, count, avg, round as sp_round, from_unixtime, to_date

    logger.info("⚡ Starting PySpark Distributed ETL Pipeline...")
    spark = get_spark_session("ETL-Pipeline")

    ratings_path = str(raw_dir / "ratings.parquet")
    if not os.path.exists(ratings_path):
        ratings_path = str(raw_dir / "ratings.csv")

    products_path = str(raw_dir / "products.csv")

    logger.info(f"Extracting ratings from: {ratings_path}")
    if ratings_path.endswith(".parquet"):
        df_ratings = spark.read.parquet(ratings_path)
    else:
        df_ratings = spark.read.csv(ratings_path, header=True, inferSchema=True)

    logger.info(f"Extracting products catalog from: {products_path}")
    df_products = spark.read.csv(products_path, header=True, inferSchema=True)

    # 1. Schema enforcement and type casting
    df_ratings = (
        df_ratings
        .withColumn("user_id", col("user_id").cast("integer"))
        .withColumn("item_id", col("item_id").cast("integer"))
        .withColumn("rating", col("rating").cast("float"))
        .withColumn("timestamp", col("timestamp").cast("long"))
    )

    # 2. Data Cleaning: Drop Nulls and out-of-bound ratings
    initial_count = df_ratings.count()
    df_ratings = df_ratings.filter(
        (col("user_id").isNotNull()) &
        (col("item_id").isNotNull()) &
        (col("rating").between(1.0, 5.0))
    )

    # 3. Distributed Item & User Activity Filtering (Dense support for ALS)
    item_activity = df_ratings.groupBy("item_id").agg(count("rating").alias("item_review_count"))
    user_activity = df_ratings.groupBy("user_id").agg(count("rating").alias("user_review_count"))

    df_ratings = df_ratings.join(item_activity, on="item_id", how="inner")
    df_ratings = df_ratings.join(user_activity, on="user_id", how="inner")

    df_filtered = df_ratings.filter(
        (col("item_review_count") >= min_item_reviews) &
        (col("user_review_count") >= min_user_reviews)
    )

    filtered_count = df_filtered.count()
    logger.info(f"Filtered interaction records: {filtered_count:,} (Removed {initial_count - filtered_count:,} sparse anomalies)")

    # 4. Feature Enrichment: Add Date and Calculate Product Aggregates
    df_filtered = df_filtered.withColumn("rating_date", to_date(from_unixtime(col("timestamp"))))

    product_stats = (
        df_filtered.groupBy("item_id")
        .agg(
            count("rating").alias("total_ratings"),
            sp_round(avg("rating"), 2).alias("computed_avg_rating")
        )
    )

    df_products_enriched = df_products.join(product_stats, on="item_id", how="left")

    # 5. Load to Processed Parquet Store
    processed_dir.mkdir(parents=True, exist_ok=True)
    out_ratings_path = str(processed_dir / "ratings_clean.parquet")
    out_products_path = str(processed_dir / "products_clean.parquet")

    logger.info(f"Writing partitioned Parquet ratings -> {out_ratings_path}")
    df_filtered.select("user_id", "item_id", "rating", "timestamp", "rating_date") \
               .write.mode("overwrite").parquet(out_ratings_path)

    logger.info(f"Writing enriched products Parquet -> {out_products_path}")
    df_products_enriched.write.mode("overwrite").parquet(out_products_path)

    logger.info("✅ PySpark ETL Pipeline completed successfully!")
    return df_filtered, df_products_enriched

def run_pandas_etl(raw_dir: Path, processed_dir: Path, min_item_reviews=2, min_user_reviews=2):
    """
    Fast Pandas fallback ETL pipeline when PySpark is running standalone.
    """
    import pandas as pd

    logger.info("⚙️ Running Pandas Vectorized ETL Pipeline...")
    ratings_path = raw_dir / "ratings.parquet"
    if not ratings_path.exists():
        ratings_path = raw_dir / "ratings.csv"

    products_path = raw_dir / "products.csv"

    if str(ratings_path).endswith(".parquet"):
        df_ratings = pd.read_parquet(ratings_path)
    else:
        df_ratings = pd.read_csv(ratings_path)

    df_products = pd.read_csv(products_path)

    # Clean & Cast
    df_ratings = df_ratings.dropna(subset=["user_id", "item_id", "rating"])
    df_ratings["user_id"] = df_ratings["user_id"].astype(int)
    df_ratings["item_id"] = df_ratings["item_id"].astype(int)
    df_ratings["rating"] = df_ratings["rating"].astype(float)
    df_ratings = df_ratings[(df_ratings["rating"] >= 1.0) & (df_ratings["rating"] <= 5.0)]

    # Activity Filter
    item_counts = df_ratings["item_id"].value_counts()
    user_counts = df_ratings["user_id"].value_counts()

    valid_items = item_counts[item_counts >= min_item_reviews].index
    valid_users = user_counts[user_counts >= min_user_reviews].index

    df_filtered = df_ratings[df_ratings["item_id"].isin(valid_items) & df_ratings["user_id"].isin(valid_users)].copy()

    # Product Aggregates
    stats = df_filtered.groupby("item_id")["rating"].agg(["count", "mean"]).reset_index()
    stats.columns = ["item_id", "total_ratings", "computed_avg_rating"]
    stats["computed_avg_rating"] = stats["computed_avg_rating"].round(2)

    df_products_enriched = pd.merge(df_products, stats, on="item_id", how="left")

    processed_dir.mkdir(parents=True, exist_ok=True)
    df_filtered.to_parquet(processed_dir / "ratings_clean.parquet", index=False)
    df_filtered.to_csv(processed_dir / "ratings_clean.csv", index=False)
    df_products_enriched.to_parquet(processed_dir / "products_clean.parquet", index=False)
    df_products_enriched.to_csv(processed_dir / "products_clean.csv", index=False)

    logger.info(f"✅ Pandas ETL completed. Processed {len(df_filtered):,} clean records.")
    return df_filtered, df_products_enriched

def run_etl(use_spark=True):
    raw_dir = Path("data/raw")
    processed_dir = Path("data/processed")

    if not raw_dir.exists() or not (raw_dir / "ratings.csv").exists():
        logger.info("Raw data missing. Triggering data generator...")
        from src.data_generator import build_dataset
        build_dataset(size="medium")

    if use_spark:
        try:
            return run_pyspark_etl(raw_dir, processed_dir)
        except Exception as e:
            logger.warning(f"PySpark ETL encountered an error ({e}). Falling back to Pandas ETL...")
            return run_pandas_etl(raw_dir, processed_dir)
    else:
        return run_pandas_etl(raw_dir, processed_dir)

if __name__ == "__main__":
    run_etl()
