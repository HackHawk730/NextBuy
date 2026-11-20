"""
Initialize NextBuy PostgreSQL Database Schema & Seed Data
Target Database: nextbuy_db on PostgreSQL 17
"""

import os
import sys
import psycopg2
from psycopg2.extras import execute_values
import pandas as pd
from pathlib import Path

DB_CONFIG = {
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "#Dhruv_005",
    "database": "nextbuy_db"
}

SCHEMA_SQL = """
-- 1. Users Table (Unified User Account with no separate admin role)
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- 2. Products Catalog Table
CREATE TABLE IF NOT EXISTS products (
    product_id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 0.0,
    rating_count INT DEFAULT 0,
    specifications JSONB DEFAULT '{}'::jsonb,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- 3. User Interactions & Ratings Table
CREATE TABLE IF NOT EXISTS user_interactions (
    interaction_id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'view', 'cart', 'rate_5'
    rating_value NUMERIC(3, 1) DEFAULT 0.0,
    als_weight NUMERIC(4, 2) DEFAULT 1.0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_interactions_user_id ON user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_interactions_timestamp ON user_interactions(timestamp DESC);

-- 4. User Search History Table (Parallel Searching Tracker)
CREATE TABLE IF NOT EXISTS user_searches (
    search_id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    search_query VARCHAR(255) NOT NULL,
    category_filter VARCHAR(100) DEFAULT 'All Categories',
    matched_count INT DEFAULT 0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_searches_user_id ON user_searches(user_id);
CREATE INDEX IF NOT EXISTS idx_searches_timestamp ON user_searches(timestamp DESC);

-- 5. Recommendation Logic & Calculations Table (Explainable AI / Logics behind work)
CREATE TABLE IF NOT EXISTS recommendation_logic_logs (
    log_id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    match_percentage INT NOT NULL,
    als_score NUMERIC(6, 4) NOT NULL,
    algorithm_breakdown JSONB DEFAULT '{}'::jsonb,
    logic_explanation TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_rec_logic_user_id ON recommendation_logic_logs(user_id);
"""

def init_postgres():
    print("Connecting to PostgreSQL nextbuy_db...")
    conn = psycopg2.connect(**DB_CONFIG)
    conn.autocommit = True
    cur = conn.cursor()

    # Execute schema
    print("Executing redesigned schema...")
    cur.execute(SCHEMA_SQL)
    print("Tables created successfully: users, products, user_interactions, user_searches, recommendation_logic_logs.")

    # Seed initial demo users
    demo_users = [
        ("Dhruv Patel", "dhruv@nextbuy.internal"),
        ("Alex Vance", "alex.vance@nextbuy.internal"),
        ("Marcus Chen", "marcus.chen@nextbuy.internal"),
        ("Sarah Connor", "sarah.connor@nextbuy.internal"),
        ("David Miller", "david.miller@nextbuy.internal"),
    ]
    for uname, email in demo_users:
        cur.execute(
            "INSERT INTO users (username, email) VALUES (%s, %s) ON CONFLICT (username) DO NOTHING;",
            (uname, email)
        )
    print("Seeded demo users.")

    # Seed products from clean parquet
    parquet_path = Path("data/processed/products_clean.parquet")
    if parquet_path.exists():
        df = pd.read_parquet(parquet_path)
        print(f"Loaded {len(df)} products from {parquet_path}")

        prod_data = []
        for _, row in df.iterrows():
            import json
            specs = {
                "specs": row.get("specs", "") or "",
                "description": row.get("description", "") or "",
                "rank": int(row.get("salesRank", 0) or 0)
            }
            prod_data.append((
                int(row["item_id"]),
                str(row["title"])[:250],
                str(row.get("brand", "Generic")),
                str(row.get("category", "Electronics")),
                float(row.get("price", 99.99)),
                float(row.get("rating", 4.5)),
                int(row.get("rating_count", 100)),
                json.dumps(specs),
                True
            ))

        insert_sql = """
            INSERT INTO products (product_id, title, brand, category, price, rating, rating_count, specifications, in_stock)
            VALUES %s
            ON CONFLICT (product_id) DO UPDATE SET
                title = EXCLUDED.title,
                price = EXCLUDED.price,
                rating = EXCLUDED.rating;
        """
        execute_values(cur, insert_sql, prod_data)
        print(f"Successfully populated {len(prod_data)} products into PostgreSQL products table!")

    # Verify counts
    cur.execute("SELECT COUNT(*) FROM users;")
    u_cnt = cur.fetchone()[0]
    cur.execute("SELECT COUNT(*) FROM products;")
    p_cnt = cur.fetchone()[0]
    print(f"PostgreSQL Status: {u_cnt} users registered, {p_cnt} catalog products ready.")

    cur.close()
    conn.close()

if __name__ == "__main__":
    init_postgres()

