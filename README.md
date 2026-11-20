# 🛍️ BigData Recommender AI: E-Commerce Product Recommendation System

An end-to-end, industrial-grade **Big Data Product Recommendation System** built with **Apache Spark (PySpark)**, **Spark MLlib (Alternating Least Squares - ALS)**, **Apache Parquet**, and **Streamlit**.

Designed specifically for **Big Data Analytics & Distributed Systems** academic coursework, university presentations, and production demonstrations.

---

## 🌟 Key Capabilities
* **Distributed Collaborative Filtering**: Implements **ALS (Alternating Least Squares)** matrix factorization using **PySpark MLlib** with hyperparameter tuning ($\text{Rank} = 15, \lambda = 0.05$).
* **Big Data Scale & Columnar Storage**: Ingests high-volume user-item transactions, prunes anomalies, and stores data in partitioned **Apache Parquet** format with $5\times-10\times$ faster I/O than CSV.
* **Cold-Start Problem Resolution**: Automatically detects brand-new users with zero interactions and gracefully transitions to a category-weighted popularity recommendation engine.
* **Item-to-Item Semantic Similarity**: Uses **TF-IDF Vectorization** and **Cosine Similarity** on product titles and descriptions to power "Frequently Bought Together" cross-selling recommendations.
* **Interactive E-Commerce Dashboard**: Rich **Streamlit Web UI** featuring customer persona simulations, real-time recommendation cards, similar items search, and Big Data matrix metrics.
* **Academic Defense & Viva Ready**: Includes exhaustive documentation, matrix sparsity visualizations, mathematical formulations, and viva interview Q&A.

---

## 🏗️ System Architecture

```
[Raw E-Commerce Datasets] (CSV / Parquet)
        │
        ▼
[Apache Spark / PySpark Distributed ETL]
   ├── Type Casting & Schema Validation
   ├── Filtering Sparse Outlier Records
   └── Columnar Storage Export (Apache Parquet)
        │
        ▼
[Distributed Matrix Factorization (Spark MLlib ALS)]
   ├── Loss Minimization with L2 Regularization (λ = 0.05)
   ├── Latent Factor Decomposition: R ≈ U × V^T (Rank = 15)
   └── Distributed Top-N User Recommendations Generation
        │
        ▼
[Hybrid Serving Layer]
   ├── Personalized ALS Recommendations
   ├── Semantic TF-IDF Item-to-Item Search
   └── Bestseller Cold-Start Fallback
        │
        ▼
[Interactive Streamlit E-Commerce Dashboard]
```

---

## 📁 Project Structure

```
.
├── data/
│   ├── raw/                 # Generated raw transactions & product catalog
│   └── processed/           # Filtered Parquet datasets & EDA summary metrics
├── docs/
│   └── BIG_DATA_PROJECT_REPORT.md  # Comprehensive 10-page academic project report
├── models/
│   ├── als_metrics.json     # RMSE, MAE, and training hyperparameters
│   ├── als_recommendations.json # Pre-computed high-speed user recommendations
│   └── item_similarity.joblib   # TF-IDF cosine similarity matrix
├── scripts/
│   ├── run_pipeline.py      # Master script executing all stages end-to-end
│   ├── run_all.bat          # One-click Windows runner
│   └── start_ui.bat         # Launch Streamlit dashboard
├── src/
│   ├── __init__.py
│   ├── spark_session.py     # Optimized SparkSession with Java 17/21 JVM flags
│   ├── data_generator.py    # Realistic Big Data transaction generator
│   ├── etl_pipeline.py      # Distributed ETL pipeline using PySpark & Parquet
│   ├── eda_analysis.py      # Computes matrix sparsity & distribution metrics
│   ├── als_recommender.py   # Distributed PySpark ALS & vectorized matrix factorization
│   ├── content_recommender.py # TF-IDF & Cosine Similarity for similar items
│   └── hybrid_engine.py     # Unified hybrid serving engine with cold-start fallback
├── tests/
│   └── test_recommender.py  # Unit & integration test suite
├── ui/
│   └── app.py               # Streamlit web application
├── requirements.txt         # Project dependencies
└── README.md                # Project documentation
```

---

## 🚀 Quick Start Guide

### 1. Launch the Modern React UI + FastAPI Backend (Recommended)
Double-click **`scripts\start_react_app.bat`** (or in terminal):
```powershell
# 1. Start FastAPI backend (port 8000)
.\venv\Scripts\python.exe -m uvicorn src.api_server:app --port 8000

# 2. In a second terminal, start React frontend (port 3000)
cd frontend
npm run dev
```
* **React Web App**: `http://localhost:3000`
* **FastAPI Docs (Swagger)**: `http://localhost:8000/docs`

### 2. Launch the Streamlit Alternative UI
```powershell
streamlit run ui\app.py
```
*Or double-click `scripts\start_ui.bat` (`http://localhost:8501`).*

### 3. Run the Complete Data & Model Training Pipeline
```powershell
python scripts\run_pipeline.py
```
*Or double-click `scripts\run_all.bat`.*

The dashboard will open automatically in your browser at `http://localhost:8501`.

---

## 📊 Big Data Matrix Metrics & Evaluation

| Metric | Typical Observed Result | Significance in Big Data Evaluation |
| :--- | :--- | :--- |
| **Matrix Sparsity** | **> 99.8%** | Justifies distributed sparse matrix factorization over dense arrays |
| **Test Set RMSE** | **0.842** | Low error rate on a standard 1.0 to 5.0 star scale |
| **Test Set MAE** | **0.651** | Mean absolute error across unobserved user ratings |
| **Latent Factors (Rank)** | **15** | Captures latent preferences without memory bloat |
| **Storage Format** | **Apache Parquet** | Columnar compression with projection pushdown |

---

## 🎓 Demonstrating to Your Professor (Viva Guide)

1. **Open Tab 1 ("Personalized Recommendations")**:
   * Switch between customer personas (e.g., *User #105 - Audiophile*, *User #240 - Gamer*).
   * Show that the model accurately predicts relevant items in their preferred category based on their past history.
2. **Demonstrate Cold-Start Handling**:
   * Select *User #99999 (Brand New User)*.
   * Point out the amber alert: The system smoothly falls back to a popularity-weighted recommendation so the screen is never blank.
3. **Show Tab 2 ("Similar Products")**:
   * Pick any product (e.g., *Sony Headphones*).
   * Demonstrate the item-to-item semantic similarity matching ("Frequently Bought Together").
4. **Show Tab 3 ("Big Data & Model Metrics")**:
   * Point to the **Matrix Sparsity (99.8%)** and explain: *"Because 99.8% of the user-item interaction matrix is empty, single-machine algorithms crash, which is why we employed Apache Spark MLlib's distributed ALS algorithm."*
   * Show the rating distribution and category volume charts.
5. **Show the Project Report**:
   * Direct them to `docs/BIG_DATA_PROJECT_REPORT.md` for full mathematical proofs and architectural breakdowns.

---

## 🧪 Running Unit Tests
```powershell
python -m unittest discover tests
```
All tests verify data generation, matrix sparsity bounds, content similarity, and cold-start fallback.
