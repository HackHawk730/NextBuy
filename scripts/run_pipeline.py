"""
Master End-to-End Execution Pipeline
Executes all stages of the Big Data Product Recommendation System:
1. Data Generation (Realistic E-Commerce Amazon-style dataset)
2. Distributed ETL Pipeline (PySpark / Parquet)
3. Big Data Exploratory Analysis (Sparsity, Distributions)
4. Content-Based TF-IDF Model Training
5. Matrix Factorization Training (PySpark MLlib ALS)
6. Launch Streamlit UI Dashboard
"""

import sys
import os
import subprocess
from pathlib import Path

# Ensure UTF-8 output on Windows terminals
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if sys.stderr and hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# Ensure root in sys.path
root_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root_dir))

def print_header(title):
    print("\n" + "=" * 70)
    print(f"🚀 {title.upper()}")
    print("=" * 70)

def main():
    print_header("Stage 1: Generating Big Data E-Commerce Dataset")
    from src.data_generator import build_dataset
    build_dataset(size="medium")

    print_header("Stage 2: Executing Distributed ETL Pipeline")
    from src.etl_pipeline import run_etl
    run_etl(use_spark=True)

    print_header("Stage 3: Computing Big Data Matrix & Sparsity Metrics")
    from src.eda_analysis import compute_eda_metrics
    compute_eda_metrics()

    print_header("Stage 4: Fitting Content-Based Semantic Engine")
    from src.content_recommender import ContentBasedRecommender
    content_rec = ContentBasedRecommender()
    content_rec.fit()

    print_header("Stage 5: Training Distributed ALS Matrix Factorization Model")
    from src.als_recommender import train_recommender
    train_recommender(use_spark=True)

    print_header("Stage 6: Launching Interactive Streamlit Dashboard")
    ui_script = root_dir / "ui" / "app.py"
    subprocess.run([sys.executable, "-m", "streamlit", "run", str(ui_script)])

if __name__ == "__main__":
    main()
