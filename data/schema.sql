-- ============================================================================
-- NextBuy Enterprise Big Data & Recommendation Platform Database Schema
-- Target Database: PostgreSQL 14+
-- ============================================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- 2. Products Catalog Table
CREATE TABLE IF NOT EXISTS products (
    product_id INT PRIMARY KEY,
    sku VARCHAR(50),
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
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);

-- 3. User Interactions & Ratings Table (ALS Training Data Source)
CREATE TABLE IF NOT EXISTS user_interactions (
    interaction_id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'view', 'cart', 'rate_5', 'purchase'
    rating_value NUMERIC(3, 1) DEFAULT 0.0,
    als_implicit_weight NUMERIC(4, 2) DEFAULT 1.0,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_interactions_user_id ON user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_interactions_product_id ON user_interactions(product_id);
CREATE INDEX IF NOT EXISTS idx_interactions_timestamp ON user_interactions(timestamp DESC);

-- 4. ALS Offline & Online Recommendations Cache
CREATE TABLE IF NOT EXISTS als_recommendations (
    rec_id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    rank_position INT NOT NULL,
    predicted_score NUMERIC(5, 4) NOT NULL,
    match_percentage INT NOT NULL,
    model_version VARCHAR(50) DEFAULT 'Spark-ALS-v2',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_product_model UNIQUE (user_id, product_id, model_version)
);

CREATE INDEX IF NOT EXISTS idx_als_user_rank ON als_recommendations(user_id, rank_position);

-- 5. System & Real-Time Telemetry Logs (Displayed in Data Panel)
CREATE TABLE IF NOT EXISTS telemetry_logs (
    log_id BIGSERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    duration_ms NUMERIC(8, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_telemetry_created_at ON telemetry_logs(created_at DESC);

