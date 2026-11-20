"""
Content-Based Recommender Engine
Computes item-to-item semantic similarities using TF-IDF Vectorization and Cosine Similarity.
Powers the 'Frequently Bought Together' / 'Similar Products' feature and handles cold-start scenarios.
"""

import os
import sys
from pathlib import Path
import logging
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib

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
logger = logging.getLogger("ContentRecommender")

class ContentBasedRecommender:
    def __init__(self, data_dir=Path("data/processed")):
        self.data_dir = Path(data_dir)
        self.df_products = None
        self.tfidf_matrix = None
        self.similarity_matrix = None
        self.vectorizer = None
        self.item_id_to_idx = {}
        self.idx_to_item_id = {}

    def fit(self):
        """Build TF-IDF representations and cosine similarity matrix."""
        products_file = self.data_dir / "products_clean.parquet"
        if not products_file.exists():
            products_file = self.data_dir / "products_clean.csv"
        if not products_file.exists():
            products_file = Path("data/raw/products.csv")

        logger.info(f"Loading products from {products_file}...")
        if str(products_file).endswith(".parquet"):
            self.df_products = pd.read_parquet(products_file)
        else:
            self.df_products = pd.read_csv(products_file)

        # Build composite feature text
        self.df_products["content_soup"] = (
            self.df_products["title"].fillna("") + " " +
            self.df_products["category"].fillna("") + " " +
            self.df_products["brand"].fillna("") + " " +
            self.df_products["description"].fillna("") + " " +
            self.df_products["tags"].fillna("")
        )

        logger.info("Computing TF-IDF matrices across product corpus...")
        self.vectorizer = TfidfVectorizer(
            stop_words="english",
            max_features=500,
            ngram_range=(1, 2)
        )
        self.tfidf_matrix = self.vectorizer.fit_transform(self.df_products["content_soup"])

        logger.info("Calculating pairwise Cosine Similarity...")
        self.similarity_matrix = cosine_similarity(self.tfidf_matrix, self.tfidf_matrix)

        for idx, row in self.df_products.iterrows():
            item_id = int(row["item_id"])
            self.item_id_to_idx[item_id] = idx
            self.idx_to_item_id[idx] = item_id

        # Save artifacts
        models_dir = Path("models")
        models_dir.mkdir(parents=True, exist_ok=True)
        joblib.dump(self.similarity_matrix, models_dir / "item_similarity.joblib")
        joblib.dump(self.df_products[["item_id", "title", "category", "price", "brand", "avg_rating"]], models_dir / "products_summary.joblib")
        logger.info("✅ Content-Based Recommender fitted and persisted successfully!")

    def load(self):
        """Load precomputed similarity matrices."""
        models_dir = Path("models")
        sim_path = models_dir / "item_similarity.joblib"
        prod_path = models_dir / "products_summary.joblib"

        if sim_path.exists() and prod_path.exists():
            self.similarity_matrix = joblib.load(sim_path)
            self.df_products = joblib.load(prod_path)
            for idx, row in self.df_products.iterrows():
                item_id = int(row["item_id"])
                self.item_id_to_idx[item_id] = idx
                self.idx_to_item_id[idx] = item_id
            return True
        return False

    def get_similar_products(self, item_id: int, top_n: int = 5):
        """
        Retrieve the top_n most similar products for a given item_id.
        """
        if self.similarity_matrix is None:
            if not self.load():
                self.fit()

        if item_id not in self.item_id_to_idx:
            logger.warning(f"Item ID {item_id} not found in catalog.")
            return []

        item_idx = self.item_id_to_idx[item_id]
        current_cat = str(self.df_products.iloc[item_idx]["category"])
        sim_scores = list(enumerate(self.similarity_matrix[item_idx]))
        
        # Sort by similarity score descending (excluding self at index 0)
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = [s for s in sim_scores if s[0] != item_idx]

        # Prioritize products in the same category for coherent similarity
        same_cat_scores = [s for s in sim_scores if str(self.df_products.iloc[s[0]]["category"]) == current_cat]
        selected_scores = (same_cat_scores if len(same_cat_scores) >= top_n else sim_scores)[:top_n]

        results = []
        for idx, score in selected_scores:
            matched_item = self.df_products.iloc[idx]
            results.append({
                "item_id": int(matched_item["item_id"]),
                "title": str(matched_item["title"]),
                "category": str(matched_item["category"]),
                "price": float(matched_item["price"]),
                "brand": str(matched_item["brand"]),
                "image_url": str(matched_item.get("image_url", "")),
                "gender": str(matched_item.get("gender", "Unisex")),
                "description": str(matched_item.get("description", "")),
                "avg_rating": float(matched_item.get("avg_rating", 4.5)),
                "similarity_score": round(float(score) * 100, 1)  # percentage match
            })

        return results

    def get_category_recommendations(self, category: str, top_n: int = 5):
        """
        Fallback popularity recommender for a specific category.
        """
        if self.df_products is None:
            self.load()

        cat_items = self.df_products[self.df_products["category"].str.lower() == category.lower()]
        if cat_items.empty:
            cat_items = self.df_products

        top_cat = cat_items.sort_values(by="avg_rating", ascending=False).head(top_n)
        return top_cat.to_dict(orient="records")

if __name__ == "__main__":
    recommender = ContentBasedRecommender()
    recommender.fit()
    sample_id = 101
    similar = recommender.get_similar_products(sample_id, top_n=3)
    print(f"\n🔍 Products similar to Item #{sample_id}:")
    for s in similar:
        print(f"  • {s['title']} ({s['category']}) - {s['similarity_score']}% Match")
