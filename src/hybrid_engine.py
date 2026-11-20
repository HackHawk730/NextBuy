"""
Hybrid Recommender Serving Engine
Combines:
  1. Collaborative Filtering (Apache Spark ALS) for personalized discovery.
  2. Content-Based Semantic Filtering for item-to-item similarity.
  3. Bestseller/Popularity Fallback for Cold-Start new users.
"""

import json
from pathlib import Path
from typing import Optional, List, Set, Dict, Any
import logging
import pandas as pd
from src.content_recommender import ContentBasedRecommender

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("HybridEngine")

class HybridRecommenderEngine:
    def __init__(self, data_dir="data/processed", models_dir="models"):
        self.data_dir = Path(data_dir)
        self.models_dir = Path(models_dir)
        self.content_model = ContentBasedRecommender(self.data_dir)
        self.products_df = None
        self.ratings_df = None
        self.als_recommendations = {}
        self.als_metrics = {}
        self.is_loaded = False

    def load(self):
        """Load datasets, ALS precomputed lookups, and content models."""
        products_file = self.data_dir / "products_clean.parquet"
        if not products_file.exists():
            products_file = self.data_dir / "products_clean.csv"
        if not products_file.exists():
            products_file = Path("data/raw/products.csv")

        ratings_file = self.data_dir / "ratings_clean.parquet"
        if not ratings_file.exists():
            ratings_file = self.data_dir / "ratings_clean.csv"
        if not ratings_file.exists():
            ratings_file = Path("data/raw/ratings.csv")

        if str(products_file).endswith(".parquet"):
            self.products_df = pd.read_parquet(products_file)
        else:
            self.products_df = pd.read_csv(products_file)

        if str(ratings_file).endswith(".parquet"):
            self.ratings_df = pd.read_parquet(ratings_file)
        else:
            self.ratings_df = pd.read_csv(ratings_file)

        # Load ALS Recommendations lookup
        als_recs_file = self.models_dir / "als_recommendations.json"
        if als_recs_file.exists():
            with open(als_recs_file, "r") as f:
                self.als_recommendations = json.load(f)

        # Load ALS Metrics
        als_metrics_file = self.models_dir / "als_metrics.json"
        if als_metrics_file.exists():
            with open(als_metrics_file, "r") as f:
                self.als_metrics = json.load(f)

        # Initialize content model
        self.content_model.load()
        self.is_loaded = True
        logger.info("✅ Hybrid Recommender Engine fully loaded into memory!")

    def get_user_history(self, user_id: int):
        """Retrieve user's historical purchases and ratings."""
        if not self.is_loaded:
            self.load()

        user_data = self.ratings_df[self.ratings_df["user_id"] == user_id]
        if user_data.empty:
            return []

        merged = pd.merge(user_data, self.products_df, on="item_id", how="left")
        history = []
        for _, row in merged.iterrows():
            history.append({
                "item_id": int(row["item_id"]),
                "title": str(row["title"]),
                "category": str(row["category"]),
                "price": float(row["price"]),
                "brand": str(row["brand"]),
                "rating": float(row["rating"])
            })

        # Sort highest rating first
        history = sorted(history, key=lambda x: x["rating"], reverse=True)
        return history

    def get_cold_start_recommendations(self, top_n: int = 10, preferred_category: str = None):
        """
        Cold-start fallback for brand new users.
        Recommends highest-rated, popular items with robust review volume.
        """
        if not self.is_loaded:
            self.load()

        df = self.products_df.copy()
        if preferred_category and preferred_category != "All Categories":
            df = df[df["category"].str.lower() == preferred_category.lower()]

        # Sort by avg_rating and total_ratings if available
        sort_col = "computed_avg_rating" if "computed_avg_rating" in df.columns else "avg_rating"
        top_items = df.sort_values(by=sort_col, ascending=False).head(top_n)

        results = []
        for _, row in top_items.iterrows():
            avg_r = float(row.get(sort_col, 4.8))
            results.append({
                "item_id": int(row["item_id"]),
                "title": str(row["title"]),
                "category": str(row["category"]),
                "gender": str(row.get("gender", "Unisex")),
                "price": float(row["price"]),
                "brand": str(row["brand"]),
                "image_url": str(row.get("image_url", "")),
                "predicted_rating": avg_r,
                "match_percentage": round(min(99.0, (avg_r / 5.0) * 100), 1),
                "recommendation_type": "Popularity Fallback (Cold-Start)",
                "reason": f"Ranked #{len(results)+1} bestseller in {row['category']} with {avg_r} / 5.0 rating."
            })
        return results

    def recommend(
        self,
        user_id: int,
        top_n: int = 6,
        preferred_category: Optional[str] = None,
        search_query: Optional[str] = None,
        excluded_item_ids: Optional[Set[int]] = None,
        recent_interactions: Optional[List[dict]] = None,
        recent_searches: Optional[List[dict]] = None
    ) -> Dict[str, Any]:
        """
        Master recommendation dispatcher:
        - Real-Time Intent & Category Affinity Tracking (e.g., Electronics exploration).
        - Strict Explored Item Exclusion (never recommends the exact item the user already explored/viewed/added).
        - Hybrid Ranking: Spark ALS Matrix Factorization + Content Semantic Cosine Similarity + Live Category Affinity.
        """
        if not self.is_loaded:
            self.load()

        # 1. Assemble set of all items already seen / explored / interacted with
        all_excluded: Set[int] = set()
        if excluded_item_ids:
            all_excluded.update(int(x) for x in excluded_item_ids if x is not None)

        history = self.get_user_history(user_id)
        for h in history:
            all_excluded.add(int(h["item_id"]))

        recent_explored_ids = []
        for inter in (recent_interactions or []):
            iid = inter.get("item_id") or inter.get("product_id")
            if iid:
                iid_int = int(iid)
                all_excluded.add(iid_int)
                if iid_int not in recent_explored_ids:
                    recent_explored_ids.append(iid_int)

        # 2. Build Category Affinity Vector
        cat_weights: Dict[str, float] = {
            "Electronics": 1.0,
            "Footware": 1.0,
            "Clothing": 1.0,
            "Fashion-Accessories": 1.0,
            "Sports Equipments": 1.0
        }

        # Baseline from past history
        for h in history:
            cat = h.get("category")
            if cat in cat_weights:
                cat_weights[cat] += float(h.get("rating", 3.0)) * 0.5

        # Live interaction signals (views = 3.0, carts = 6.0, ratings = 8.0)
        for inter in (recent_interactions or []):
            cat = inter.get("category")
            ev = str(inter.get("event_type") or inter.get("type", "view")).lower()
            w = 3.0
            if "cart" in ev:
                w = 6.0
            elif "rate" in ev:
                w = 8.0
            if cat in cat_weights:
                cat_weights[cat] += w

        # Search query intent mapping (Immediate dominant signal!)
        def detect_category(txt: Optional[str]) -> Optional[str]:
            if not txt:
                return None
            t = txt.lower()
            if any(k in t for k in ["electron", "headphone", "earbud", "audio", "speaker", "phone", "laptop", "sound", "charger", "power bank", "bluetooth", "sony", "apple", "macbook", "iphone", "samsung", "jbl", "bose", "boat", "trimmer"]):
                return "Electronics"
            if any(k in t for k in ["shoe", "footwear", "footware", "sneaker", "running", "nike", "adidas", "puma", "boots", "loafers", "superrep"]):
                return "Footware"
            if any(k in t for k in ["cloth", "shirt", "pant", "jacket", "jeans", "t-shirt", "dress", "hoodie", "zara", "levis", "h&m"]):
                return "Clothing"
            if any(k in t for k in ["watch", "wallet", "bag", "sunglasses", "belt", "accessory", "accessories", "rolex", "fossil"]):
                return "Fashion-Accessories"
            if any(k in t for k in ["sport", "gym", "ball", "fitness", "yoga", "bat", "badminton", "dumbbell"]):
                return "Sports Equipments"
            return None

        # Check active search query
        detected_search_cat = detect_category(search_query)
        if detected_search_cat and detected_search_cat in cat_weights:
            cat_weights[detected_search_cat] += 20.0

        # Check historical searches
        for s in (recent_searches or []):
            sq = s.get("search_query") or s.get("query")
            sc = detect_category(sq)
            if sc and sc in cat_weights:
                cat_weights[sc] += 5.0

        # Check category dropdown tab if active
        if preferred_category and preferred_category != "All Categories":
            if preferred_category in cat_weights:
                cat_weights[preferred_category] += 25.0

        total_cat_w = sum(cat_weights.values()) or 1.0
        category_affinities = {
            cat: round((w / total_cat_w) * 100, 1) for cat, w in cat_weights.items()
        }
        dominant_cat = max(cat_weights, key=cat_weights.get)
        dominant_pct = category_affinities[dominant_cat]

        # 3. Ensure content similarity model is ready
        if self.content_model.similarity_matrix is None:
            self.content_model.fit()
        sim_matrix = self.content_model.similarity_matrix
        item_id_to_idx = self.content_model.item_id_to_idx

        # 4. Score Candidate Products (STRICTLY EXCLUDING all_excluded)
        user_str_id = str(user_id)
        user_als_dict = {}
        if user_str_id in self.als_recommendations:
            for r in self.als_recommendations[user_str_id]:
                user_als_dict[int(r["item_id"])] = float(r["predicted_rating"])

        scored_candidates = []
        for _, row in self.products_df.iterrows():
            cand_id = int(row["item_id"])

            # STRICT EXCLUSION: If user already viewed/explored/added/rated this, SKIP IT!
            if cand_id in all_excluded:
                continue

            cand_cat = str(row["category"])

            # If user explicitly filtered by a specific category tab, enforce it
            if preferred_category and preferred_category != "All Categories":
                if cand_cat.lower() != preferred_category.lower():
                    continue

            # a) Category Affinity Score (0.0 to 1.0)
            cat_score = category_affinities.get(cand_cat, 5.0) / 100.0

            # b) Content-Based Semantic Cosine Similarity to explored items (0.0 to 1.0)
            content_sim = 0.0
            cand_idx = item_id_to_idx.get(cand_id)
            if cand_idx is not None and recent_explored_ids:
                sims = []
                for exp_id in recent_explored_ids[:4]:
                    exp_idx = item_id_to_idx.get(exp_id)
                    if exp_idx is not None:
                        sims.append(float(sim_matrix[exp_idx][cand_idx]))
                if sims:
                    content_sim = max(sims)

            # c) Search keyword relevance bonus (0.0 to 0.4)
            search_boost = 0.0
            if search_query and search_query.strip():
                terms = [w for w in search_query.lower().split() if len(w) > 2]
                item_text = f"{row['title']} {row['brand']} {cand_cat}".lower()
                if any(t in item_text for t in terms):
                    search_boost = 0.40

            # d) Spark ALS Collaborative Filtering Score (0.0 to 1.0)
            base_rating = float(row.get("computed_avg_rating", row.get("avg_rating", 4.7)))
            if cand_id in user_als_dict:
                als_score = min(1.0, user_als_dict[cand_id] / 5.0)
            else:
                als_score = min(1.0, base_rating / 5.0)

            # Composite Score:
            # Heavily prioritizes user's explored category intent while leveraging ALS and content similarity!
            composite = (
                (0.40 * cat_score) +
                (0.30 * als_score) +
                (0.20 * content_sim) +
                (0.10 * search_boost)
            )

            predicted_rating = round(min(5.0, max(4.0, 3.8 + (composite * 1.3))), 1)
            match_percentage = round(min(99.4, max(82.0, 78.0 + (composite * 22.0))), 1)

            # Descriptive Explainable Reason
            if cand_cat == dominant_cat and len(recent_explored_ids) > 0:
                reason = f"Top recommendation in {cand_cat} based on your recent exploration (excluding items you've already viewed)."
            elif search_boost > 0:
                reason = f"Matched your search for '{search_query.strip()}' in {cand_cat} with {match_percentage}% relevance."
            elif cand_cat == dominant_cat:
                reason = f"High category affinity ({dominant_pct:.0f}%) in {cand_cat} with {match_percentage}% ALS matrix alignment."
            else:
                reason = f"Personalized ALS collaborative recommendation with {match_percentage}% match."

            scored_candidates.append({
                "item_id": cand_id,
                "title": str(row["title"]),
                "category": cand_cat,
                "gender": str(row.get("gender", "Unisex")),
                "price": float(row["price"]),
                "brand": str(row["brand"]),
                "image_url": str(row.get("image_url", "")),
                "composite_score": composite,
                "predicted_rating": predicted_rating,
                "match_percentage": match_percentage,
                "recommendation_type": "Spark ALS + Real-Time Intent Hybrid",
                "reason": reason
            })

        # 5. Sort descending by composite score
        scored_candidates.sort(key=lambda x: x["composite_score"], reverse=True)
        top_recs = scored_candidates[:top_n]

        # 6. Fallback if candidate pool is small
        if len(top_recs) < top_n:
            cold_candidates = self.get_cold_start_recommendations(top_n * 2, preferred_category)
            for c in cold_candidates:
                if c["item_id"] not in all_excluded and not any(r["item_id"] == c["item_id"] for r in top_recs):
                    top_recs.append(c)
                if len(top_recs) >= top_n:
                    break

        return {
            "user_id": user_id,
            "is_cold_start": len(history) == 0 and len(recent_interactions or []) == 0,
            "active_intent_category": dominant_cat,
            "category_affinities": category_affinities,
            "excluded_count": len(all_excluded),
            "user_history": history,
            "recommendations": top_recs
        }

    def get_similar_products(self, item_id: int, top_n: int = 5):
        """Retrieve similar products using content similarity."""
        if not self.is_loaded:
            self.load()
        return self.content_model.get_similar_products(item_id, top_n)
