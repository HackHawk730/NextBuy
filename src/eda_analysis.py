"""
Big Data Exploratory Data Analysis (EDA)
Computes large-scale distribution metrics, matrix sparsity, Pareto distributions,
and category market-share using PySpark and Pandas.
Exports structured summary metrics for the presentation dashboard.
"""

import os
import sys
import json
from pathlib import Path
import logging
import pandas as pd
import numpy as np

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
logger = logging.getLogger("BigDataEDA")

def compute_eda_metrics(data_dir=Path("data/processed")):
    """
    Compute comprehensive Big Data matrix and distribution metrics.
    """
    ratings_file = data_dir / "ratings_clean.parquet"
    if not ratings_file.exists():
        ratings_file = data_dir / "ratings_clean.csv"
    
    products_file = data_dir / "products_clean.parquet"
    if not products_file.exists():
        products_file = data_dir / "products_clean.csv"

    if not ratings_file.exists():
        logger.error(f"Processed ratings file not found at {ratings_file}. Run ETL first!")
        return None

    # Load data
    if str(ratings_file).endswith(".parquet"):
        df_ratings = pd.read_parquet(ratings_file)
    else:
        df_ratings = pd.read_csv(ratings_file)

    if str(products_file).endswith(".parquet"):
        df_products = pd.read_parquet(products_file)
    else:
        df_products = pd.read_csv(products_file)

    # 1. Fundamental Big Data Matrix Dimensions
    total_ratings = int(len(df_ratings))
    unique_users = int(df_ratings["user_id"].nunique())
    unique_items = int(df_ratings["item_id"].nunique())
    total_possible_cells = unique_users * unique_items

    # 2. Mathematical Matrix Sparsity
    sparsity = 1.0 - (total_ratings / total_possible_cells) if total_possible_cells > 0 else 0.0

    # 3. Rating Distribution
    rating_counts = df_ratings["rating"].value_counts().sort_index().to_dict()
    rating_percentages = {
        str(k): round((v / total_ratings) * 100, 2)
        for k, v in rating_counts.items()
    }

    # 4. Power-Law / User Activity Percentiles
    user_activity = df_ratings.groupby("user_id").size()
    user_percentiles = {
        "p10": int(np.percentile(user_activity, 10)),
        "p25": int(np.percentile(user_activity, 25)),
        "median_p50": int(np.percentile(user_activity, 50)),
        "p75": int(np.percentile(user_activity, 75)),
        "p90": int(np.percentile(user_activity, 90)),
        "p99_power_users": int(np.percentile(user_activity, 99)),
        "max": int(user_activity.max()),
        "mean": round(float(user_activity.mean()), 2)
    }

    # 5. Category Analysis
    merged = pd.merge(df_ratings, df_products[["item_id", "category", "title"]], on="item_id", how="left")
    category_counts = merged["category"].value_counts().to_dict()

    # 6. Top-10 Most Reviewed Products
    top_items = merged.groupby(["item_id", "title", "category"]).agg(
        review_count=("rating", "count"),
        avg_rating=("rating", "mean")
    ).reset_index().sort_values(by="review_count", ascending=False).head(10)
    
    top_items["avg_rating"] = top_items["avg_rating"].round(2)
    top_items_list = top_items.to_dict(orient="records")

    summary = {
        "matrix_dimensions": {
            "total_ratings": total_ratings,
            "unique_users": unique_users,
            "unique_items": unique_items,
            "total_possible_cells": total_possible_cells,
            "sparsity_percentage": round(sparsity * 100, 3)
        },
        "rating_distribution": rating_percentages,
        "rating_counts": {str(k): int(v) for k, v in rating_counts.items()},
        "user_activity_percentiles": user_percentiles,
        "category_distribution": category_counts,
        "top_reviewed_products": top_items_list,
        "mean_rating_overall": round(float(df_ratings["rating"].mean()), 2)
    }

    # Save to JSON
    output_path = data_dir / "eda_summary.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)

    logger.info("=" * 60)
    logger.info("📊 BIG DATA EXPLORATORY ANALYSIS SUMMARY")
    logger.info("=" * 60)
    logger.info(f"Total Transactions: {total_ratings:,}")
    logger.info(f"Unique Users:      {unique_users:,}")
    logger.info(f"Unique Products:   {unique_items:,}")
    logger.info(f"Matrix Sparsity:   {sparsity * 100:.2f}% (Sparse Matrix Factorization Required)")
    logger.info(f"Overall Mean Rating: {summary['mean_rating_overall']} ★")
    logger.info(f"Saved EDA Summary -> {output_path}")
    logger.info("=" * 60)

    return summary

if __name__ == "__main__":
    compute_eda_metrics()
