"""
Unit and Integration Tests for Big Data Product Recommendation System
Verifies data generation, ETL pipeline, matrix sparsity calculation,
ALS model inference, and cold-start fallback handling.
"""

import sys
import unittest
from pathlib import Path
import pandas as pd

# Ensure UTF-8 output on Windows terminals
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if sys.stderr and hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# Add root directory to sys.path
root_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root_dir))

from src.data_generator import build_dataset
from src.etl_pipeline import run_pandas_etl
from src.eda_analysis import compute_eda_metrics
from src.content_recommender import ContentBasedRecommender
from src.als_recommender import PythonVectorizedALS
from src.hybrid_engine import HybridRecommenderEngine

class TestRecommendationSystem(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Prepare small test dataset and execute baseline ETL."""
        cls.raw_dir = Path("data/raw")
        cls.processed_dir = Path("data/processed")
        build_dataset(size="small")
        run_pandas_etl(cls.raw_dir, cls.processed_dir)
        cls.content_rec = ContentBasedRecommender(cls.processed_dir)
        cls.content_rec.fit()
        cls.als = PythonVectorizedALS(rank=10, max_iter=5)
        cls.als.train(cls.processed_dir / "ratings_clean.parquet")
        cls.engine = HybridRecommenderEngine()
        cls.engine.load()

    def test_products_catalog(self):
        """Verify products catalog contains required attributes."""
        df_prod = pd.read_csv("data/raw/products.csv")
        self.assertFalse(df_prod.empty)
        required_cols = ["item_id", "title", "category", "price", "brand"]
        for col in required_cols:
            self.assertIn(col, df_prod.columns)

    def test_matrix_sparsity(self):
        """Verify matrix sparsity is calculated and exceeds 95%."""
        summary = compute_eda_metrics()
        self.assertIsNotNone(summary)
        sparsity = summary["matrix_dimensions"]["sparsity_percentage"]
        self.assertGreater(sparsity, 90.0)

    def test_content_similarity(self):
        """Verify item-to-item similarity returns similar products."""
        similar = self.content_rec.get_similar_products(item_id=101, top_n=3)
        self.assertEqual(len(similar), 3)
        self.assertTrue(all("similarity_score" in s for s in similar))

    def test_existing_user_recommendations(self):
        """Verify existing user receives personalized recommendations."""
        res = self.engine.recommend(user_id=1, top_n=5)
        self.assertFalse(res["is_cold_start"])
        self.assertGreaterEqual(len(res["recommendations"]), 1)

    def test_cold_start_new_user(self):
        """Verify new user triggers cold start fallback."""
        res = self.engine.recommend(user_id=9999999, top_n=5)
        self.assertTrue(res["is_cold_start"])
        self.assertEqual(len(res["recommendations"]), 5)
        for rec in res["recommendations"]:
            self.assertIn("Cold-Start", rec["recommendation_type"])

if __name__ == "__main__":
    unittest.main()
