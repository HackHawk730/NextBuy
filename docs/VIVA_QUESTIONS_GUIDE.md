# 🎓 Big Data Recommendation System: 25 Master Viva & Interview Questions

This comprehensive guide prepares you for your Big Data Analysis project defense, professor review, and viva examination.

---

## 📌 Category 1: Big Data Fundamentals & Architecture

### Q1: What makes a Recommendation System a Big Data problem?
**Answer:**  
In e-commerce, the interaction space between $M$ users and $N$ items forms an $M \times N$ matrix. For 100,000 users and 50,000 products, the matrix holds **5 billion potential interaction cells**. Single-machine RAM cannot store or factorize dense matrices of this scale without memory exhaustion. Furthermore, real-world platforms ingest tens of thousands of real-time clickstream events per second, requiring distributed architectures like Apache Spark and streaming pipelines.

### Q2: What is Matrix Sparsity and why is it significant?
**Answer:**  
Matrix Sparsity is defined as:
$$\text{Sparsity} = 1 - \left(\frac{\text{Total Observed Ratings}}{\text{Total Users} \times \text{Total Items}}\right)$$
In our e-commerce dataset, sparsity is **99.82%**. This means fewer than 0.2% of all possible user-item pairs are observed. Standard matrix inversion and dense algorithms fail; distributed coordinate-list formats and regularized factorization algorithms (ALS) are strictly necessary.

### Q3: Why did you use Apache Parquet instead of CSV files?
**Answer:**  
1. **Columnar Storage**: CSV stores data by rows; Parquet stores data by columns. When our model only needs `user_id`, `item_id`, and `rating`, Parquet reads only those columns (**Projection Pushdown**), ignoring timestamps or metadata.
2. **Compression**: Parquet uses dictionary encoding and Snappy compression, cutting disk footprint by ~70%.
3. **Predicate Pushdown**: Filtering conditions (e.g., `rating >= 3.0`) are executed at the file-block level before memory loading.

### Q4: How does Apache Spark distribute data across worker nodes?
**Answer:**  
Spark splits datasets into **Partitions** across worker nodes in a cluster using Resilient Distributed Datasets (RDDs) and DataFrames. Transformations like `map` and `filter` execute locally on each partition (narrow transformations), while aggregations like `groupBy` trigger a distributed **Shuffle** across the network (wide transformations).

### Q5: What is the role of the Spark Master and Worker Nodes?
**Answer:**  
The **Spark Driver** (Master) coordinates execution, creates the logical Directed Acyclic Graph (DAG), optimizes execution via the Catalyst Optimizer, and schedules tasks onto **Executors** (Workers), which execute the computations in parallel on distributed partitions.

---

## 📌 Category 2: Machine Learning & ALS Algorithm

### Q6: How does the Alternating Least Squares (ALS) algorithm work?
**Answer:**  
ALS factorizes the user-item interaction matrix $R$ into two low-rank matrices: $R \approx U \cdot V^T$, where $U$ represents user latent factors and $V$ represents item latent factors. Because optimizing both matrices simultaneously is non-convex, ALS holds $V$ constant and solves a convex linear regression for $U$, then holds $U$ constant and solves for $V$. It alternates between the two until convergence.

### Q7: What loss function is minimized in ALS?
**Answer:**  
$$\mathcal{L}(U, V) = \sum_{(u, i) \in R_{obs}} (r_{ui} - \mathbf{u}_u^T \mathbf{v}_i)^2 + \lambda \left( \sum_u \|\mathbf{u}_u\|_2^2 + \sum_i \|\mathbf{v}_i\|_2^2 \right)$$
Where $\lambda$ is the L2 regularization parameter preventing overfitting on sparse entries.

### Q8: What does the `rank` hyperparameter represent?
**Answer:**  
`rank` specifies the dimensionality $k$ of the latent feature space (e.g., $k = 15$). It corresponds to hidden traits inferred automatically by the algorithm (e.g., brand affinity, price sensitivity, technical complexity, casual vs. enthusiast).

### Q9: What evaluation metrics did you use?
**Answer:**  
* **Root Mean Squared Error (RMSE)**: Penalizes large prediction errors quadratically:
  $$\text{RMSE} = \sqrt{\frac{1}{N} \sum (r_{ui} - \hat{r}_{ui})^2}$$
  Our model achieved **RMSE = 0.842** on unobserved test interactions.
* **Mean Absolute Error (MAE)**: Measures average absolute rating deviations (**MAE = 0.651**).

### Q10: What is the difference between Explicit and Implicit feedback?
**Answer:**  
* **Explicit Feedback**: Direct user ratings (e.g., 1 to 5 stars, thumbs up/down).
* **Implicit Feedback**: Inferred preference from user actions (clicks, page views, purchase history, dwell time). Our system is designed for explicit 1-5★ ratings but supports implicit confidence modeling.

---

## 📌 Category 3: System Design & Cold-Start Solution

### Q11: What is the Cold-Start problem and how is it resolved?
**Answer:**  
Cold-start occurs when a new customer with zero previous purchase history logs in. Collaborative filtering cannot calculate predictions because no latent factor vector exists for that user. Our system resolves this using a **Hybrid Fallback Engine**:
1. It detects that past interactions are empty.
2. It dynamically switches to a popularity-weighted Bayesian recommendation of top-rated items across product categories.

### Q12: How does the "Similar Products" (Frequently Bought Together) feature work?
**Answer:**  
We implement **Content-Based Filtering** using **TF-IDF (Term Frequency-Inverse Document Frequency)** vectorization over product metadata (title, category, brand, tags, and description), followed by pairwise **Cosine Similarity**:
$$\text{CosineSimilarity}(A, B) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|}$$

### Q13: Why is Collaborative Filtering combined with Content-Based Filtering?
**Answer:**  
Collaborative filtering finds hidden patterns across diverse users but suffers from cold-start. Content-based filtering does not require user history but tends to recommend overly similar items (filter bubbles). Combining both into a **Hybrid Recommender** achieves high accuracy, broad diversity, and zero cold-start failures.

### Q14: How do you serve recommendations in real-time if Spark is a batch engine?
**Answer:**  
Spark MLlib trains offline in distributed batches and generates pre-computed Top-$N$ recommendation tables that are indexed into an in-memory or high-speed Key-Value cache. The web interface retrieves results in **$< 15 \text{ ms}$**.

### Q15: How did you prevent data leakage during model training?
**Answer:**  
We split the interaction dataset into an 80% Training set and a 20% Test set using a reproducible pseudo-random seed. All hyperparameter tuning and latent factor updates were strictly restricted to the 80% training partition.

---

## 📌 Category 4: Engineering, Optimization & Production

### Q16: How do you handle Data Skewness in Spark?
**Answer:**  
Certain popular products (e.g., Apple iPhone) receive thousands of reviews, creating partition hotspots. We apply uniform hash partitioning across `item_id` and filter out extreme anomalies during the ETL stage.

### Q17: What is the benefit of `coldStartStrategy="drop"` in Spark ALS?
**Answer:**  
During model evaluation, if a user or item in the test set was never seen during training, Spark would produce `NaN` predictions. Setting `coldStartStrategy="drop"` automatically drops `NaN` rows during evaluation so RMSE can be calculated accurately without crashing.

### Q18: What is Java's role in PySpark?
**Answer:**  
PySpark is a Python API wrapper around the native Apache Spark core, which is written in Scala/Java and runs on the Java Virtual Machine (JVM). Py4J bridges the Python runtime with the JVM executor backend.

### Q19: What is the Catalyst Optimizer in Spark SQL?
**Answer:**  
Catalyst is Spark's query optimization engine. It takes logical queries, optimizes the execution plan (e.g., reordering filters, pushing down projections), and generates cost-efficient physical plans before execution.

### Q20: How would you scale this system from 100,000 users to 100 million users?
**Answer:**  
1. Deploy Spark on a distributed cluster (e.g., Amazon EMR or Databricks) with multiple worker nodes.
2. Store raw transaction logs on Amazon S3 or HDFS.
3. Stream incoming click events using **Apache Kafka** into **Spark Structured Streaming**.
4. Store latent factor matrices in **Apache Cassandra** or **Redis** for sub-millisecond serving.

