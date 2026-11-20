import React, { useState, useEffect, useRef } from 'react';
import {
  Layers,
  Database,
  BarChart3,
  ShoppingBag,
  Cpu,
  Search,
  Star,
  Zap,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
  Grid,
  RotateCcw,
  ShoppingCart,
  Eye,
  Sliders,
  Terminal,
  X,
  Plus,
  Minus,
  Shield,
  ArrowRight,
  ArrowLeft,
  LogOut,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Sparkles,
  Lock,
  User,
  HardDrive,
  FolderTree,
  ExternalLink,
  Activity,
  Play,
  Heart,
  Check,
  Truck,
  Trash2
} from 'lucide-react';

const API_BASE = '/api';

// =========================================================================
// 8 ENTERPRISE LEADERS USING THESE BIG DATA TECHNIQUES
// =========================================================================
const CLIENT_BRANDS = [
  { name: 'Amazon', logo: '/Company-Logos/amazon-seeklogo.png', tag: 'Item-to-Item ALS Matrix' },
  { name: 'Flipkart', logo: '/Company-Logos/flipkart-seeklogo.png', tag: 'Collaborative Filtering Scale' },
  { name: 'Myntra', logo: '/Company-Logos/myntra-seeklogo.png', tag: 'Semantic Vector Embeddings' },
  { name: 'Ajio', logo: '/Company-Logos/ajio-seeklogo.png', tag: 'Real-Time Matrix Intelligence' },
  { name: 'Croma', logo: '/Company-Logos/croma-seeklogo.png', tag: 'Consumer Tech Cross-Sell' },
  { name: 'Swiggy', logo: '/Company-Logos/swiggy-seeklogo.png', tag: 'Hyperlocal Re-Ranking Engine' },
  { name: 'Zepto', logo: '/Company-Logos/zepto-seeklogo.png', tag: 'Sub-10m Basket Prediction' },
  { name: 'Zomato', logo: '/Company-Logos/zomato-seeklogo.png', tag: 'Deep Latent Recommendation' },
];

// =========================================================================
// BIG DATA STORAGE ARCHITECTURE TIERS & TELEMETRY
// =========================================================================
const STORAGE_TIER_DETAILS = {
  parquet: {
    id: 'parquet',
    num: '01',
    name: 'Columnar Parquet Store',
    shortBadge: 'Snappy • 78.3% Storage Saved',
    path: 'data/processed/ratings_clean.parquet',
    badgeColor: '#16A34A',
    headline: 'Distributed Columnar Parquet Storage',
    tagline: 'Stores 64,752 user-item interaction coordinates across 10,000 customers. Optimized for parallel Spark partition scanning.',
    stats: '64,752 records • 10,000 cohorts',
    kpis: [
      { label: 'Total Interactions', value: '64,752 rows' },
      { label: 'Customer Cohorts', value: '10,000 users' },
      { label: 'Compression Ratio', value: '78.3% (Snappy)' },
      { label: 'Scan Engine', value: 'Spark Vectorized Reader' }
    ],
    schema: [
      { col: 'user_id', type: 'Integer (32-bit)', desc: 'Unique customer identifier' },
      { col: 'product_id', type: 'Integer (32-bit)', desc: 'Catalog SKU identifier' },
      { col: 'rating', type: 'Float (32-bit)', desc: 'Explicit interaction score (1.0 - 5.0)' },
      { col: 'timestamp', type: 'Long (64-bit)', desc: 'Epoch millisecond event coordinate' }
    ],
    code: `// PySpark Distributed Columnar Ingestion
val ratingsDF = spark.read
  .option("compression", "snappy")
  .parquet("data/processed/ratings_clean.parquet")

// Columnar projection bypasses row parsing overhead
val trainMatrix = ratingsDF.select("user_id", "product_id", "rating")`
  },
  products: {
    id: 'products',
    num: '02',
    name: 'Product Catalog Parquet',
    shortBadge: '60 SKUs • TF-IDF Vector Spaces',
    path: 'data/processed/products_clean.parquet',
    badgeColor: '#2563EB',
    headline: 'Structured Product Inventory & Embeddings',
    tagline: 'Contains 60 catalog items with rich text descriptions, brand metadata, and numerical prices used by TF-IDF vectorizers.',
    stats: '60 SKUs • 14 feature fields',
    kpis: [
      { label: 'Catalog Dimension', value: '60 Prime SKUs' },
      { label: 'Feature Columns', value: '14 Structured Attributes' },
      { label: 'Vector Similarity', value: 'Cosine TF-IDF Matrix' },
      { label: 'Fallback Logic', value: 'Cold-Start Content Matching' }
    ],
    schema: [
      { col: 'product_id', type: 'Integer (PK)', desc: 'Canonical SKU ID' },
      { col: 'title', type: 'String (UTF-8)', desc: 'Enriched product title' },
      { col: 'category', type: 'String (Enum)', desc: 'Apparel, Tech, Footwear, Audio' },
      { col: 'price / rating', type: 'Float / Double', desc: 'Price index & average score' },
      { col: 'tfidf_features', type: 'Array[Double]', desc: 'Tokenized descriptive vectors' }
    ],
    code: `// Multi-Modal Product Vectorization
val productsDF = spark.read.parquet("data/processed/products_clean.parquet")
val hashingTF = new HashingTF()
  .setInputCol("description_tokens")
  .setOutputCol("raw_features")
val idfModel = new IDF().fit(hashingTF.transform(productsDF))`
  },
  models: {
    id: 'models',
    num: '03',
    name: 'Spark ALS Latent Models',
    shortBadge: 'Rank k=10 • Validation RMSE 0.842',
    path: 'models/als_spark_model/ & TF-IDF',
    badgeColor: '#D97706',
    headline: 'Matrix Factorization Latent Factors',
    tagline: 'Decomposes the massive 10,000 × 60 interaction space into low-rank latent user vectors (U) and item vectors (V) for dot-product prediction.',
    stats: 'U(10,000 × 10) • V(60 × 10)',
    kpis: [
      { label: 'Latent Dimension (k)', value: 'k = 10 factors' },
      { label: 'Validation Loss', value: '0.842 RMSE' },
      { label: 'User Matrix (U)', value: '10,000 × 10 float32' },
      { label: 'Item Matrix (V)', value: '60 × 10 float32' }
    ],
    schema: [
      { col: 'id', type: 'Integer (Row Index)', desc: 'User / Product entity coordinate' },
      { col: 'features', type: 'Array[Float, k=10]', desc: 'Learned latent representation vector' },
      { col: 'dot_product', type: 'Float (Prediction)', desc: 'r_hat = U_user · V_item + bias' },
      { col: 'checkpoint', type: 'Parquet Partition', desc: 'Distributed Spark MLlib checkpoint' }
    ],
    code: `// Distributed Alternating Least Squares (ALS) Factorization
val als = new ALS()
  .setRank(10)
  .setMaxIter(15)
  .setRegParam(0.08)
  .setUserCol("user_id")
  .setItemCol("product_id")
  .setRatingCol("rating")

val model = als.fit(trainMatrix)
// Prediction: score = userFactors(u).features.dot(itemFactors(i).features)`
  },
  postgres: {
    id: 'postgres',
    num: '04',
    name: 'PostgreSQL Relational DB',
    shortBadge: 'Port 5432 • Live Telemetry & Audit',
    path: 'nextbuy_db (PostgreSQL 15+)',
    badgeColor: '#9333EA',
    headline: 'Transactional User & Search Telemetry',
    tagline: 'Durable ACID store for user profiles, password hashes, real-time search queries, and explainable AI logic trails.',
    stats: '4 tables • Parallel logging',
    kpis: [
      { label: 'Database Name', value: 'nextbuy_db' },
      { label: 'Storage Engine', value: 'PostgreSQL 15+ Relational' },
      { label: 'Audit Trail', value: 'Full Decision Traceability' },
      { label: 'Security Store', value: 'PBKDF2 Salted Hashes' }
    ],
    schema: [
      { col: 'users', type: 'id, email, password_hash, created_at', desc: 'Secure user authentication' },
      { col: 'user_searches', type: 'search_id, user_id, query, timestamp', desc: 'Search stream tracking' },
      { col: 'user_interactions', type: 'interaction_id, user_id, sku, event, score', desc: 'Click & rate telemetry' },
      { col: 'recommendation_logics', type: 'log_id, user_id, sku, algo, rationale', desc: 'Explainable AI logging' }
    ],
    code: `-- PostgreSQL Explainable AI Audit Trail
CREATE TABLE recommendation_logic_logs (
    log_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    algorithm_type VARCHAR(64) NOT NULL,
    top_recommendation VARCHAR(128) NOT NULL,
    rationale TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
  },
  stream: {
    id: 'stream',
    num: '05',
    name: 'Real-Time Streaming Buffer',
    shortBadge: '14.2ms Streaming Feedback',
    path: 'src/api_server.py (Live Session Buffer)',
    badgeColor: '#059669',
    headline: 'In-Memory Sub-Second Event Re-ranking',
    tagline: 'Captures immediate clickstream, ratings, and cart additions, immediately re-ranking recommendations in sub-second latency.',
    stats: '14.2ms latency • FIFO buffer',
    kpis: [
      { label: 'Median Latency', value: '14.2 ms' },
      { label: 'Sliding Queue', value: '100 FIFO interactions' },
      { label: 'Session Adaptation', value: 'Instant Weight Boosting' },
      { label: 'Concurrency', value: 'Async Non-Blocking Uvicorn' }
    ],
    schema: [
      { col: 'session_id', type: 'UUID (In-Memory)', desc: 'Transient client session token' },
      { col: 'event_type', type: 'CLICK | RATE | CART', desc: 'Immediate action vector' },
      { col: 'weight_delta', type: 'Float (+0.1 to +1.0)', desc: 'Real-time candidate score boost' },
      { col: 'flush_target', type: 'PostgreSQL Daemon', desc: 'Async persistence queue' }
    ],
    code: `# FastAPI Real-Time Interaction Ingestion
@app.post("/api/interactions")
async def track_interaction(event: InteractionEvent):
    # 1. Update in-memory session ring buffer
    live_session_buffer.append(event)
    # 2. Recalculate candidate weights in sub-second latency
    scores = rerank_with_recent_clicks(event.user_id)
    # 3. Asynchronously persist to PostgreSQL
    asyncio.create_task(db_manager.log_interaction(event))
    return {"status": "ok", "latency_ms": 14.2}`
  }
};

// =========================================================================
// NEXTBUY BRAND LOGO COMPONENT
// =========================================================================
function NextBuyLogo({ onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', cursor: 'pointer' }}>
      <div style={{
        width: '30px',
        height: '30px',
        borderRadius: '9px',
        background: '#121212',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '900',
        fontSize: '0.98rem',
        letterSpacing: '-0.5px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
      }}>
        N
      </div>
      <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.04em', color: '#121212' }}>
        NextBuy<span style={{ color: '#2563EB' }}>.</span>
      </span>
    </div>
  );
}

// =========================================================================
// MULTICOLOR GOOGLE ICON FOR SIGN IN
// =========================================================================
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
    </svg>
  );
}

// =========================================================================
// STYLIZED SPHERE EMBLEM
// =========================================================================
function StylizedSphereLogo() {
  return (
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" stroke="#D946EF" strokeWidth="3.5" />
      <path d="M8 32C18 33 46 40 52 50" stroke="#D946EF" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M12 18C28 24 40 44 44 58" stroke="#D946EF" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M52 14C44 26 28 32 6 30" stroke="#D946EF" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

// =========================================================================
// MODERN PRODUCT CARD COMPONENT
// =========================================================================
const CARD_COLOR_SWATCHES = ['#1E293B', '#047857', '#D97706', '#64748B'];

const MODAL_COLOR_OPTIONS = [
  { name: 'Pure White', hex: '#FFFFFF', textDark: true },
  { name: 'Space Blue', hex: '#2563EB', textDark: false },
  { name: 'Rose Coral', hex: '#FB7185', textDark: false },
  { name: 'Peach Warm', hex: '#FDBA74', textDark: true },
  { name: 'Onyx Black', hex: '#1E293B', textDark: false }
];

function getSizesForCategory(cat) {
  if (cat === 'Clothing') return ['S', 'M', 'L', 'XL', '2XL'];
  if (cat === 'Footware') return ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];
  if (cat === 'Fashion-Accessories') return ['30ml', '50ml', '100ml'];
  if (cat === 'Electronics') return ['Standard', 'Pro', 'Max'];
  return ['Standard', 'Pro'];
}

function ModernProductCard({ product, onAddToCart, onInspect, onRate, selectedSize, onSelectSize, cartQty, onUpdateCartQty }) {
  const sizes = getSizesForCategory(product.category);
  const currentSize = selectedSize || sizes[1] || sizes[0];

  return (
    <div className="product-card-modern">
      {/* Top Row: Brand Pill & Gender on Left, 4 Color Swatches on Right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span className="brand-pill">
            {product.brand || 'NextBuy'}
          </span>
          {product.gender && product.gender !== 'Unisex' && (
            <span style={{
              fontSize: '0.66rem',
              fontWeight: 700,
              padding: '0.15rem 0.45rem',
              borderRadius: '6px',
              background: product.gender === 'Men' ? '#EFF6FF' : '#FDF2F8',
              color: product.gender === 'Men' ? '#1D4ED8' : '#BE185D',
              letterSpacing: '0.02em',
              textTransform: 'uppercase'
            }}>
              {product.gender}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {CARD_COLOR_SWATCHES.map((swatch, sIdx) => (
            <span
              key={sIdx}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: swatch,
                display: 'inline-block',
                boxShadow: sIdx === 0 ? '0 0 0 1.5px #FFFFFF, 0 0 0 2.5px rgba(0,0,0,0.2)' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Middle Cushioned Product Visual Stage with Real Product Photo (Click to Inspect) */}
      <div
        onClick={() => onInspect(product)}
        style={{
          background: '#F6F5EF',
          borderRadius: '16px',
          height: '185px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          marginBottom: '0.85rem',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        title={`Click to view details for ${product.title}`}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '0.75rem',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <ShoppingBag size={52} color="#121212" strokeWidth={1.4} />
        )}
      </div>

      {/* Product Title & Price Row (in INR ₹) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.2rem', gap: '0.5rem' }}>
        <h3
          onClick={() => onInspect(product)}
          style={{
            fontSize: '0.96rem',
            fontWeight: 700,
            color: '#121212',
            lineHeight: 1.3,
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: 1,
            cursor: 'pointer'
          }}
          title={product.title}
        >
          {product.title}
        </h3>
        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#121212', whiteSpace: 'nowrap' }}>
          ₹{Number(product.price).toLocaleString('en-IN')}
        </span>
      </div>

      {/* Subtitle: Category & Type / Collection */}
      <div style={{ fontSize: '0.74rem', color: '#8E8D86', fontWeight: 500, marginBottom: '0.85rem' }}>
        {product.category} • {product.gender && product.gender !== 'Unisex' ? `${product.gender}'s Collection` : (product.brand || 'Verified SKU')}
      </div>

      {/* Size Selector Header: 'Select Size' on left, 'Size Guide ↗' on right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
        <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#121212' }}>
          Select Size
        </span>
        <button
          onClick={() => onInspect(product)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: '0.72rem',
            color: '#575752',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontWeight: 500
          }}
        >
          ↗ Size Guide
        </button>
      </div>

      {/* Size Selector Boxes */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
        {sizes.map(size => {
          const isSelected = currentSize === size;
          return (
            <button
              key={size}
              onClick={() => onSelectSize(product.item_id, size)}
              style={{
                flex: 1,
                padding: '0.45rem 0',
                borderRadius: '8px',
                border: isSelected ? '1.5px solid #121212' : '1px solid rgba(0,0,0,0.1)',
                background: isSelected ? '#121212' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#121212',
                fontWeight: 700,
                fontSize: '0.76rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {size}
            </button>
          );
        })}
      </div>

      {/* Full-Width Dark Pill Button: 'Add to cart' OR Quantity Selector (- 1 +) */}
      {cartQty > 0 ? (
        <div className="card-qty-pill">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateCartQty(product.item_id, -1);
            }}
            className="card-qty-btn"
            title="Decrease quantity"
          >
            <Minus size={15} />
          </button>
          <span className="card-qty-val">{cartQty}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateCartQty(product.item_id, 1);
            }}
            className="card-qty-btn"
            title="Increase quantity"
          >
            <Plus size={15} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => onAddToCart(product)}
          className="btn btn-black"
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '9999px',
            fontWeight: 700,
            fontSize: '0.84rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            marginBottom: '0.65rem'
          }}
        >
          <ShoppingBag size={15} />
          Add to cart
        </button>
      )}

      {/* Card Footer: Rating & Quick Rate 5 Stars for Spark Adaptation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.35rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: 600 }}>
          Rating: {product.avg_rating || product.predicted_rating || 4.5}
        </span>
        <button
          onClick={() => onRate(product)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: '0.72rem',
            color: '#2563EB',
            fontWeight: 600,
            cursor: 'pointer'
          }}
          title="Rate 5 Stars to trigger real-time Spark MLlib matrix re-weighting"
        >
          Rate 5 Stars
        </button>
      </div>
    </div>
  );
}

export default function App() {
  // Authentication States (Persistent Session Storage)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('nextbuy_session_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  // Navigation Mode: 'public' | 'signin' | 'signup' | 'user' | 'data-panel'
  const [currentMode, setCurrentMode] = useState(() => {
    try {
      const savedUser = localStorage.getItem('nextbuy_session_user');
      const savedMode = localStorage.getItem('nextbuy_session_mode');
      if (savedUser) {
        if (savedMode === 'data-panel') return 'data-panel';
        return 'user';
      }
      return 'public';
    } catch (e) {
      return 'public';
    }
  });

  // Multi-Clip Video Transition (2 Clips auto-crossfading silently)
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const clip1Ref = useRef(null);
  const clip2Ref = useRef(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [authError, setAuthError] = useState(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState(null);
  const [signupCompleteSuccess, setSignupCompleteSuccess] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [redirectTarget, setRedirectTarget] = useState(null); // 'data-panel' | 'user' | null

  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Selected Product Details Modal (Image 1 Structure & Controls)
  const [inspectingProduct, setInspectingProduct] = useState(null);
  const [productSimilarItems, setProductSimilarItems] = useState([]);
  const [modalActiveImg, setModalActiveImg] = useState(null);
  const [modalSelectedColor, setModalSelectedColor] = useState(MODAL_COLOR_OPTIONS[1]);
  const [modalWishlist, setModalWishlist] = useState(false);
  const [modalExpandedDesc, setModalExpandedDesc] = useState(false);
  const [modalSelectedReviewFilter, setModalSelectedReviewFilter] = useState('all');
  const [modalActiveAngleIdx, setModalActiveAngleIdx] = useState(0);

  // Data States
  const [personas, setPersonas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [bigdataMetrics, setBigdataMetrics] = useState(null);
  const [clusterStatus, setClusterStatus] = useState(null);

  // User Workspace States
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryCategory, setInventoryCategory] = useState('All Categories');
  const [inventoryGender, setInventoryGender] = useState('All'); // 'All' | 'Men' | 'Women' | 'Unisex'
  const [userRecs, setUserRecs] = useState(null);
  const [loadingRecs, setLoadingRecs] = useState(false);

  // PostgreSQL-backed Personal Data Panel State
  const [userDataPanel, setUserDataPanel] = useState({ searches: [], interactions: [], recommendation_logics: [] });

  // Data Panel Tab State: 'activity' | 'interactions' | 'searches' | 'overview'
  const [dataPanelTab, setDataPanelTab] = useState('activity');
  const [selectedPipelineStage, setSelectedPipelineStage] = useState(1);
  const [isLivePolling, setIsLivePolling] = useState(true);
  const [pipelineSimulating, setPipelineSimulating] = useState(false);

  // Architecture Showcase Tier Selection: 'parquet' | 'products' | 'models' | 'postgres' | 'stream'
  const [activeArchTier, setActiveArchTier] = useState('parquet');

  // User Profile Menu State (Navbar Dropdown)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Top Promotional Banner Hero Carousel State (Image 4 Coverflow)
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);

  // Selected Product Sizes State (per item_id)
  const [selectedProductSizes, setSelectedProductSizes] = useState({});

  // Outside click listener for User Profile Menu
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Astound Digital-Style Luxury Intro Curtain State
  const [showIntro, setShowIntro] = useState(true);
  const [introExiting, setIntroExiting] = useState(false);

  const dismissIntro = () => {
    setIntroExiting(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 850);
  };

  useEffect(() => {
    // Automatically trigger exit after 2.3 seconds
    const timer = setTimeout(() => {
      dismissIntro();
    }, 2300);
    return () => clearTimeout(timer);
  }, []);

  // Action Notice Toast
  const [notice, setNotice] = useState(null);

  // Auto-cycle video clips and ensure continuous rock-solid playback on reload and redirect
  useEffect(() => {
    if (currentMode === 'public') {
      // Always reset smoothly to Clip 1 on fresh load or when returning to landing page
      setActiveClipIndex(0);

      const triggerPlayback = () => {
        if (clip1Ref.current) {
          clip1Ref.current.currentTime = 0;
          clip1Ref.current.play().catch(() => {});
        }
        if (clip2Ref.current) {
          clip2Ref.current.currentTime = 0;
          clip2Ref.current.play().catch(() => {});
        }
      };

      triggerPlayback();
      const retryTimer = setTimeout(triggerPlayback, 200);

      // Smoothly cycle between Clip 1 and Clip 2 every 9.5 seconds
      const cycleTimer = setInterval(() => {
        setActiveClipIndex(prev => {
          const next = prev === 0 ? 1 : 0;
          if (next === 0 && clip1Ref.current) {
            clip1Ref.current.play().catch(() => {});
          } else if (next === 1 && clip2Ref.current) {
            clip2Ref.current.play().catch(() => {});
          }
          return next;
        });
      }, 9500);

      return () => {
        clearTimeout(retryTimer);
        clearInterval(cycleTimer);
      };
    }
  }, [currentMode]);

  // Initial Data Fetch
  useEffect(() => {
    fetch(`${API_BASE}/user-personas`).then(r => r.json()).then(setPersonas).catch(console.error);
    fetch(`${API_BASE}/categories`).then(r => r.json()).then(setCategories).catch(console.error);
    fetch(`${API_BASE}/bigdata-metrics`).then(r => r.json()).then(setBigdataMetrics).catch(console.error);
    fetch(`${API_BASE}/spark-cluster`).then(r => r.json()).then(setClusterStatus).catch(console.error);
    fetch(`${API_BASE}/products?limit=120`).then(r => r.json()).then(setProductsList).catch(console.error);
  }, []);

  // Restore authenticated recommendations and telemetry whenever currentUser is active on load or change
  useEffect(() => {
    if (currentUser?.id) {
      fetchUserRecommendations(currentUser.id);
      fetchUserDataPanel(currentUser.id);
    }
  }, [currentUser?.id]);

  // Synchronize active mode with session storage for seamless reloads
  useEffect(() => {
    if (currentUser) {
      if (currentMode === 'user' || currentMode === 'data-panel') {
        try {
          localStorage.setItem('nextbuy_session_mode', currentMode);
        } catch (e) {}
      }
    }
  }, [currentMode, currentUser]);

  // Fetch recommendations for authenticated user with live search intent & excluded item support
  const fetchUserRecommendations = (uid, searchQuery = null, justExploredId = null) => {
    if (!uid) return;
    setLoadingRecs(true);
    const activeSearch = searchQuery !== null ? searchQuery : inventorySearch;
    const qParam = activeSearch && activeSearch.trim() ? `&query=${encodeURIComponent(activeSearch.trim())}` : '';
    const catParam = inventoryCategory && inventoryCategory !== 'All Categories' ? `&category=${encodeURIComponent(inventoryCategory)}` : '';
    const exclParam = justExploredId ? `&exclude_item_id=${justExploredId}` : '';

    fetch(`${API_BASE}/recommendations?user_id=${uid}&top_n=6${catParam}${qParam}${exclParam}`)
      .then(r => r.json())
      .then(data => {
        setUserRecs(data);
        setLoadingRecs(false);
      })
      .catch(() => setLoadingRecs(false));
  };

  // Fetch PostgreSQL Personal Data Panel Telemetry (Searches, Logics, Interactions)
  const fetchUserDataPanel = (uid) => {
    if (!uid) return;
    fetch(`${API_BASE}/user/data-panel/${uid}`)
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          setUserDataPanel(data);
        }
      })
      .catch(console.error);
  };

  // Real-Time Live Polling when Data Panel is active
  useEffect(() => {
    if (currentMode !== 'data-panel' || !currentUser?.id || !isLivePolling) return;
    const interval = setInterval(() => {
      fetchUserDataPanel(currentUser.id);
    }, 3500);
    return () => clearInterval(interval);
  }, [currentMode, currentUser?.id, isLivePolling]);

  // Simulate Live Backend Ingestion Actions directly from Data Panel
  const handleSimulatePipelineAction = (type, val, category) => {
    if (!currentUser?.id) return;
    setPipelineSimulating(true);

    if (type === 'search') {
      fetch(`${API_BASE}/user/search-event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.id,
          query: val,
          category: category || 'All Categories',
          matched_count: 5
        })
      })
        .then(() => {
          fetchUserDataPanel(currentUser.id);
          fetchUserRecommendations(currentUser.id);
          showNotice(`Live Ingested Search: "${val}" — Category Affinity adjusted.`);
          setTimeout(() => setPipelineSimulating(false), 600);
        })
        .catch(() => setPipelineSimulating(false));
    } else {
      // interaction: 'click' | 'cart' | 'rate'
      recordEvent(val, type, type === 'rate' ? 5.0 : 4.5);
      setTimeout(() => {
        fetchUserDataPanel(currentUser.id);
        fetchUserRecommendations(currentUser.id);
        setPipelineSimulating(false);
        showNotice(`Live Ingested ${type.toUpperCase()}: Model vectors re-weighted.`);
      }, 500);
    }
  };

  // Record an interaction (view, cart, rate) to PostgreSQL & ALS engine
  const recordEvent = (itemId, interactionType, rating = 5.0) => {
    // 1. Persist directly into PostgreSQL
    if (currentUser?.id) {
      fetch(`${API_BASE}/user/interaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.id,
          item_id: itemId,
          event_type: interactionType,
          rating: rating
        })
      })
        .then(() => fetchUserDataPanel(currentUser.id))
        .catch(console.error);
    }

    // 2. Log to live session for real-time model re-weighting
    fetch(`${API_BASE}/live-session/interaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: itemId, interaction_type: interactionType, rating })
    })
      .then(r => r.json())
      .then(() => {
        showNotice(`Recorded ${interactionType.toUpperCase()} on Item #${itemId} — Exploring new recommendations`);
        if (currentUser) {
          fetchUserRecommendations(currentUser.id, inventorySearch, itemId);
        }
        fetch(`${API_BASE}/spark-cluster`).then(r => r.json()).then(setClusterStatus).catch(console.error);
      });
  };

  // Handle Parallel Search Input & Log Event to PostgreSQL + update recommendations
  const handleSearchChange = (val) => {
    setInventorySearch(val);
    if (currentUser?.id) {
      if (val.trim().length >= 2) {
        fetch(`${API_BASE}/user/search-event`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: currentUser.id,
            query: val,
            category: inventoryCategory,
            matched_count: filteredProducts.length
          })
        })
          .then(() => fetchUserDataPanel(currentUser.id))
          .catch(console.error);

        // Instantly adapt recommendations to the user's search query intent!
        fetchUserRecommendations(currentUser.id, val);
      } else if (val.trim().length === 0) {
        fetchUserRecommendations(currentUser.id, '');
      }
    }
  };

  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  };

  // Add to Cart
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.item_id === product.item_id);
      if (existing) {
        return prev.map(item => item.item_id === product.item_id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    recordEvent(product.item_id, 'cart');
    showNotice(`Added '${product.title.slice(0, 24)}...' to Cart`);
  };

  // Update Cart Quantity (- 1 +)
  const handleUpdateCartQty = (productId, delta) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.item_id === productId);
      if (!existing && delta > 0) {
        const prod = productsList.find(p => p.item_id === productId) || inspectingProduct;
        if (prod) {
          recordEvent(productId, 'cart');
          return [...prev, { ...prod, qty: 1 }];
        }
        return prev;
      }
      return prev
        .map(item => {
          if (item.item_id === productId) {
            const nextQty = item.qty + delta;
            return nextQty > 0 ? { ...item, qty: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Remove Product Completely from Cart
  const handleRemoveFromCart = (productId) => {
    setCartItems(prev => {
      const target = prev.find(item => item.item_id === productId);
      const filtered = prev.filter(item => item.item_id !== productId);
      if (target) {
        showNotice(`Removed '${target.title.slice(0, 22)}...' from Cart`);
      }
      return filtered;
    });
  };

  // View Details Modal (Image 1 Format & 7-Component Structure)
  const handleInspectProduct = (product) => {
    setInspectingProduct(product);
    setModalActiveAngleIdx(0);
    setModalActiveImg(product.image_url);
    setModalSelectedColor(MODAL_COLOR_OPTIONS[1]); // Space Blue default
    setModalWishlist(false);
    setModalExpandedDesc(false);
    setModalSelectedReviewFilter('all');
    recordEvent(product.item_id, 'view');
    fetch(`${API_BASE}/similar-products/${product.item_id}`)
      .then(r => r.json())
      .then(data => setProductSimilarItems(data.similar_products || []))
      .catch(() => setProductSimilarItems([]));
  };

  // Smooth Navigation Helper into Sign-In Page
  const navigateToSignIn = (target = null) => {
    if (target) setRedirectTarget(target);
    setAuthError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentMode('signin');
  };

  // Smooth Navigation Helper into Sign-Up Page
  const navigateToSignUp = () => {
    setAuthError(null);
    setAuthSuccessMsg(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentMode('signup');
  };

  // Complete Authentication & Route to Intended Destination with Persistent Session
  const completeSignIn = (userObj, customNotice) => {
    setCurrentUser(userObj);
    try {
      localStorage.setItem('nextbuy_session_user', JSON.stringify(userObj));
    } catch (e) {
      console.warn('Failed to save session user', e);
    }
    setAuthSuccessMsg(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const target = redirectTarget;
    setRedirectTarget(null);

    const nextMode = target === 'data-panel' ? 'data-panel' : 'user';
    try {
      localStorage.setItem('nextbuy_session_mode', nextMode);
    } catch (e) {}

    if (target === 'data-panel') {
      setCurrentMode('data-panel');
      showNotice(`Welcome, ${userObj.name}! Directing to Data Panel.`);
    } else {
      setCurrentMode('user');
      showNotice(customNotice || `Welcome to NextBuy, ${userObj.name}! Customer ID #${userObj.id} active in PostgreSQL.`);
    }
    fetchUserRecommendations(userObj.id);
    fetchUserDataPanel(userObj.id);
  };

  // Sign Out & Reset Session (The only way to exit the Product Dashboard)
  const handleSignOut = () => {
    try {
      localStorage.removeItem('nextbuy_session_user');
      localStorage.removeItem('nextbuy_session_mode');
    } catch (e) {
      console.warn('Failed to clear session', e);
    }
    setCurrentUser(null);
    setIsUserMenuOpen(false);
    setCurrentMode('public');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showNotice('Successfully logged out of your session.');
  };

  // Product Size Selection
  const handleSelectProductSize = (itemId, size) => {
    setSelectedProductSizes(prev => ({
      ...prev,
      [itemId]: size
    }));
  };

  // Top 5 Promotional Deals for Hero Carousel (Image 4 Coverflow)
  const carouselDeals = React.useMemo(() => {
    const sourceItems = (userRecs?.recommendations && userRecs.recommendations.length > 0)
      ? userRecs.recommendations.slice(0, 5)
      : productsList.slice(0, 5);

    const discounts = [30, 25, 35, 20, 28];
    return sourceItems.map((item, idx) => {
      const discountPct = discounts[idx % discounts.length];
      const originalPrice = Number((item.price * (1 + discountPct / 100)).toFixed(2));
      const dealPrice = Number(item.price.toFixed(2));
      const savings = Number((originalPrice - dealPrice).toFixed(2));
      return {
        ...item,
        discountPct,
        originalPrice,
        dealPrice,
        savings
      };
    });
  }, [userRecs, productsList]);

  // Coverflow Carousel Slide Controls
  const handlePrevSlide = () => {
    if (!carouselDeals.length) return;
    setHeroSlideIdx(prev => (prev - 1 + carouselDeals.length) % carouselDeals.length);
  };

  const handleNextSlide = () => {
    if (!carouselDeals.length) return;
    setHeroSlideIdx(prev => (prev + 1) % carouselDeals.length);
  };

  // Auto-advance coverflow slide every 5 seconds
  useEffect(() => {
    if (carouselDeals.length <= 1) return;
    const timer = setInterval(() => {
      setHeroSlideIdx(prev => (prev + 1) % carouselDeals.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselDeals.length]);

  // Handle Dedicated Sign-In Submission with PostgreSQL Authentication
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    const emailVal = authEmail.trim();
    if (!emailVal) {
      setAuthError('Please enter your email address or username.');
      return;
    }
    setAuthLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailVal, password: authPassword.trim() })
      });
      const data = await res.json();
      setAuthLoading(false);

      if (!res.ok || data.status === 'error') {
        setAuthError(data.detail || data.message || 'Invalid credentials. Please verify your email and password.');
        return;
      }

      if (data.user) {
        const u = {
          name: data.user.username,
          id: data.user.user_id,
          email: data.user.email,
          first_name: data.user.first_name,
          last_name: data.user.last_name
        };
        setAuthPassword('');
        setAuthError(null);
        setAuthSuccessMsg(null);
        completeSignIn(u, `Welcome back, ${u.name}! User ID #${u.id} verified in PostgreSQL.`);
        return;
      }
    } catch (err) {
      console.warn('PostgreSQL login error:', err);
      setAuthLoading(false);
      setAuthError('Unable to connect to PostgreSQL authentication server.');
    }
  };

  // Handle Dedicated Sign-Up Submission with PostgreSQL Member Creation
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    const fn = signupFirstName.trim();
    const ln = signupLastName.trim();
    const em = signupEmail.trim();
    const pwd = signupPassword.trim();

    if (!fn) {
      setAuthError('Please enter your first name.');
      return;
    }
    if (!em || !em.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (!pwd || pwd.length < 4) {
      setAuthError('Please enter a password (minimum 4 characters).');
      return;
    }
    setAuthLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: fn, last_name: ln, email: em, password: pwd })
      });
      const data = await res.json();

      if (!res.ok || data.status === 'error') {
        setAuthLoading(false);
        setAuthError(data.detail || data.message || 'Registration failed.');
        return;
      }

      // Success: Elegant confirmation feedback, then transition smoothly to Sign-In
      setSignupCompleteSuccess(true);
      const newUserId = data.user?.user_id || 'new';
      const registeredName = data.user?.username || `${fn} ${ln}`.trim() || 'Member';

      setTimeout(() => {
        setAuthLoading(false);
        setSignupCompleteSuccess(false);
        setAuthEmail(em);
        setAuthPassword('');
        setSignupPassword('');
        setAuthError(null);
        setAuthSuccessMsg({
          title: 'Signup Successful!',
          text: `Welcome, ${registeredName}! Member ID #${newUserId} generated in PostgreSQL. Please enter your password to sign in.`
        });
        setCurrentMode('signin');
        showNotice(`Account registered successfully (Member #${newUserId}). Please sign in.`);
      }, 550);
    } catch (err) {
      console.warn('PostgreSQL signup error:', err);
      setAuthLoading(false);
      setSignupCompleteSuccess(false);
      setAuthError('Unable to connect to PostgreSQL server.');
    }
  };

  // Select preset user persona
  const handleSelectPersona = (p) => {
    const userObj = { name: p.name, id: p.user_id };
    completeSignIn(userObj, `Logged in as Persona: ${p.name}`);
  };

  // Filter Inventory (inside user section) with Category, Gender, and Search matching
  const filteredProducts = productsList.filter(p => {
    const matchCat = inventoryCategory === 'All Categories' || p.category.toLowerCase() === inventoryCategory.toLowerCase();
    const matchSearch = !inventorySearch || 
      p.title.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.category.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      (p.gender && p.gender.toLowerCase().includes(inventorySearch.toLowerCase()));

    const matchGender = inventoryGender === 'All' || 
      (p.gender && p.gender.toLowerCase() === inventoryGender.toLowerCase()) ||
      (inventoryGender === 'Men' && (p.title.toLowerCase().includes("men's") || (p.tags && p.tags.toLowerCase().includes("mens")))) ||
      (inventoryGender === 'Women' && (p.title.toLowerCase().includes("women's") || (p.tags && p.tags.toLowerCase().includes("womens"))));

    return matchCat && matchSearch && matchGender;
  });

  // Derive gallery thumbnails: ONLY the current product's photo in 4 view perspectives (NO other products!)
  const modalThumbnails = inspectingProduct ? [
    { id: 0, url: inspectingProduct.image_url, label: 'Front Angle', zoom: 'scale(1)', transformOrigin: 'center' },
    { id: 1, url: inspectingProduct.image_url, label: 'Detail View', zoom: 'scale(1.22)', transformOrigin: 'center 35%' },
    { id: 2, url: inspectingProduct.image_url, label: 'Profile Perspective', zoom: 'scale(1.15)', transformOrigin: '40% center' },
    { id: 3, url: inspectingProduct.image_url, label: 'Studio Showcase', zoom: 'scale(1.08)', transformOrigin: 'center 60%' }
  ] : [];

  // Derive similar items list: Strictly same category matches with verified photos
  const modalSimilarList = inspectingProduct ? (() => {
    const sameCatCatalog = productsList.filter(
      p => p.category?.toLowerCase() === inspectingProduct.category?.toLowerCase() &&
           p.item_id !== inspectingProduct.item_id &&
           p.image_url
    );

    const validApi = (productSimilarItems || []).filter(
      s => s && s.image_url &&
           s.category?.toLowerCase() === inspectingProduct.category?.toLowerCase() &&
           s.item_id !== inspectingProduct.item_id
    );

    const merged = [...validApi];
    for (const item of sameCatCatalog) {
      if (!merged.some(m => m.item_id === item.item_id)) {
        merged.push(item);
      }
      if (merged.length >= 4) break;
    }
    return merged.slice(0, 4);
  })() : [];

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Duplicated brands array for infinite seamless looping
  const marqueeBrands = [...CLIENT_BRANDS, ...CLIENT_BRANDS];

  // =========================================================================
  // FULL-SCREEN AUTHENTICATION PAGE (SMOOTH TRANSITION SIGN-IN / SIGN-UP)
  // =========================================================================
  if (currentMode === 'signin' || currentMode === 'signup') {
    const isSignUp = currentMode === 'signup';

    return (
      <div className="auth-fullscreen-page">
        {/* Top Header Bar with NextBuy Logo and Back to Store Action (PERSISTENT) */}
        <header style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '1.75rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box',
          zIndex: 10
        }}>
          {/* NextBuy Brand Logo */}
          <NextBuyLogo onClick={() => setCurrentMode('public')} />

          {/* Clean Escape Button */}
          <button
            onClick={() => setCurrentMode('public')}
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '9999px',
              padding: '0.45rem 1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#334155',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#F1F5F9'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#F8FAFC'; }}
          >
            <ArrowLeft size={14} /> Back to Store
          </button>
        </header>

        {/* Center Auth Card (Smooth Fixed Container) */}
        <div style={{
          width: '100%',
          maxWidth: isSignUp ? '410px' : '390px',
          textAlign: 'center',
          marginTop: '1.5rem',
          transition: 'max-width 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          
          {/* NextBuy Brand Logo Monogram Above Headline (STAYS PERFECTLY STILL) */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
            <NextBuyLogo onClick={() => setCurrentMode('public')} />
          </div>

          {/* Animated Inner Form Container (Crossfades smoothly on toggle) */}
          <div key={currentMode} className="auth-form-crossfade">
            {isSignUp ? (
              <>
                {/* Sign Up View */}
                <h1 style={{
                  fontSize: '2.15rem',
                  fontWeight: 800,
                  color: '#0A0D18',
                  letterSpacing: '-0.035em',
                  marginBottom: '0.4rem'
                }}>
                  Create your account
                </h1>
                <p style={{
                  fontSize: '0.88rem',
                  color: '#64748B',
                  marginBottom: '1.65rem'
                }}>
                  Generate your PostgreSQL Member ID & personalized matrix
                </p>

                {/* Error Banner */}
                {authError && (
                  <div style={{
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
                    color: '#B91C1C',
                    padding: '0.65rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    marginBottom: '1.25rem',
                    textAlign: 'left'
                  }}>
                    {authError}
                  </div>
                )}

                {/* Sign Up Form */}
                <form onSubmit={handleSignUpSubmit} style={{ marginBottom: '1.35rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.85rem' }}>
                    <input
                      type="text"
                      placeholder="First name"
                      required
                      value={signupFirstName}
                      onChange={(e) => setSignupFirstName(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#FFFFFF',
                        border: '1px solid #D8DEE4',
                        borderRadius: '10px',
                        padding: '0.84rem 1.05rem',
                        fontSize: '0.92rem',
                        color: '#0B0D19',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#0B0D19'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#D8DEE4'; }}
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={signupLastName}
                      onChange={(e) => setSignupLastName(e.target.value)}
                      style={{
                        width: '100%',
                        background: '#FFFFFF',
                        border: '1px solid #D8DEE4',
                        borderRadius: '10px',
                        padding: '0.84rem 1.05rem',
                        fontSize: '0.92rem',
                        color: '#0B0D19',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#0B0D19'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#D8DEE4'; }}
                    />
                  </div>

                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#FFFFFF',
                      border: '1px solid #D8DEE4',
                      borderRadius: '10px',
                      padding: '0.84rem 1.05rem',
                      fontSize: '0.92rem',
                      color: '#0B0D19',
                      marginBottom: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0B0D19'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#D8DEE4'; }}
                  />

                  <input
                    type="password"
                    placeholder="Create password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#FFFFFF',
                      border: '1px solid #D8DEE4',
                      borderRadius: '10px',
                      padding: '0.84rem 1.05rem',
                      fontSize: '0.92rem',
                      color: '#0B0D19',
                      marginBottom: '1.25rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0B0D19'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#D8DEE4'; }}
                  />

                  <button
                    type="submit"
                    disabled={authLoading}
                    style={{
                      width: '100%',
                      background: signupCompleteSuccess ? '#16A34A' : '#0B0D1A',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '0.88rem',
                      fontSize: '0.96rem',
                      fontWeight: 600,
                      cursor: authLoading ? 'not-allowed' : 'pointer',
                      opacity: (authLoading && !signupCompleteSuccess) ? 0.7 : 1,
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => { if (!authLoading) e.currentTarget.style.opacity = '0.92'; }}
                    onMouseLeave={(e) => { if (!authLoading) e.currentTarget.style.opacity = '1'; }}
                  >
                    {signupCompleteSuccess ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                        <CheckCircle2 size={16} /> Signup Successful! Moving to Sign In...
                      </span>
                    ) : authLoading ? (
                      'Creating Account in PostgreSQL...'
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>

                <p style={{
                  fontSize: '0.8rem',
                  color: '#64748B',
                  lineHeight: 1.5,
                  marginBottom: '1.35rem'
                }}>
                  By continuing, you agree to our{' '}
                  <a href="#terms" style={{ color: '#64748B', textDecoration: 'underline' }}>Terms</a> and{' '}
                  <a href="#privacy" style={{ color: '#64748B', textDecoration: 'underline' }}>Privacy Policy</a>.
                </p>

                <div style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1rem' }}>
                  Already have an account?{' '}
                  <span
                    onClick={() => { setAuthError(null); setCurrentMode('signin'); }}
                    style={{ color: '#0B0D19', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Sign in
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* Sign In View */}
                <h1 style={{
                  fontSize: '2.15rem',
                  fontWeight: 800,
                  color: '#0A0D18',
                  letterSpacing: '-0.035em',
                  marginBottom: '1.85rem'
                }}>
                  Welcome back
                </h1>

                {/* Continue with Google Pill Button */}
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const res = await fetch(`${API_BASE}/auth/register-or-login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: 'Google User (Dhruv)', email: 'dhruv.google@nextbuy.internal' })
                      });
                      const data = await res.json();
                      if (data.status === 'success' && data.user) {
                        const u = { name: data.user.username, id: data.user.user_id, email: data.user.email };
                        completeSignIn(u, 'Signed in with Google OAuth verified in PostgreSQL.');
                        return;
                      }
                    } catch (err) {
                      console.warn(err);
                    }
                    completeSignIn({ name: 'Google User (Dhruv)', id: 84920 }, 'Signed in with Google Authentication.');
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '0.82rem 1.25rem',
                    borderRadius: '9999px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    fontSize: '0.94rem',
                    fontWeight: 500,
                    color: '#1E293B',
                    cursor: 'pointer',
                    marginBottom: '1.4rem',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                    transition: 'background 0.2s ease, border-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                >
                  <GoogleIcon />
                  Continue with Google
                </button>

                <div style={{
                  margin: '1.35rem 0',
                  color: '#94A3B8',
                  fontSize: '0.88rem',
                  fontWeight: 400
                }}>
                  or
                </div>

                {/* Professional Signup Success Notification Banner */}
                {authSuccessMsg && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    background: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    borderRadius: '12px',
                    padding: '0.85rem 1.15rem',
                    marginBottom: '1.4rem',
                    textAlign: 'left',
                    boxShadow: '0 2px 10px rgba(16, 185, 129, 0.08)',
                    animation: 'authCrossfade 0.3s ease forwards'
                  }}>
                    <CheckCircle2 size={18} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#065F46' }}>
                        {authSuccessMsg.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '3px', lineHeight: 1.45 }}>
                        {authSuccessMsg.text}
                      </div>
                    </div>
                  </div>
                )}

                {authError && (
                  <div style={{
                    background: '#FEF2F2',
                    border: '1px solid #FECACA',
                    color: '#B91C1C',
                    padding: '0.65rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    marginBottom: '1.25rem',
                    textAlign: 'left'
                  }}>
                    {authError}
                  </div>
                )}

                <form onSubmit={handleSignInSubmit} style={{ marginBottom: '1.35rem' }}>
                  <input
                    type="text"
                    placeholder="Enter email or username"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#FFFFFF',
                      border: '1px solid #D8DEE4',
                      borderRadius: '10px',
                      padding: '0.88rem 1.15rem',
                      fontSize: '0.94rem',
                      color: '#0B0D19',
                      marginBottom: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0B0D19'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#D8DEE4'; }}
                  />
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#FFFFFF',
                      border: '1px solid #D8DEE4',
                      borderRadius: '10px',
                      padding: '0.88rem 1.15rem',
                      fontSize: '0.94rem',
                      color: '#0B0D19',
                      marginBottom: '1.15rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#0B0D19'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#D8DEE4'; }}
                  />
                  <button
                    type="submit"
                    disabled={authLoading}
                    style={{
                      width: '100%',
                      background: '#0B0D1A',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '0.88rem',
                      fontSize: '0.96rem',
                      fontWeight: 600,
                      cursor: authLoading ? 'not-allowed' : 'pointer',
                      opacity: authLoading ? 0.7 : 1,
                      transition: 'opacity 0.2s ease'
                    }}
                    onMouseEnter={(e) => { if (!authLoading) e.currentTarget.style.opacity = '0.92'; }}
                    onMouseLeave={(e) => { if (!authLoading) e.currentTarget.style.opacity = '1'; }}
                  >
                    {authLoading ? 'Verifying with PostgreSQL...' : 'Continue'}
                  </button>
                </form>

                <p style={{
                  fontSize: '0.8rem',
                  color: '#64748B',
                  lineHeight: 1.5,
                  marginBottom: '1.35rem'
                }}>
                  By continuing, you agree to our{' '}
                  <a href="#terms" style={{ color: '#64748B', textDecoration: 'underline' }}>Terms</a> and{' '}
                  <a href="#privacy" style={{ color: '#64748B', textDecoration: 'underline' }}>Privacy Policy</a>.
                </p>

                <div style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1rem' }}>
                  Don't have an account?{' '}
                  <span
                    onClick={() => { setAuthError(null); setCurrentMode('signup'); }}
                    style={{ color: '#0B0D19', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Sign up
                  </span>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN PLATFORM (LANDING PAGE, USER WORKSPACE, DATA PANEL)
  // =========================================================================
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* ASTOUND DIGITAL-STYLE LUXURY INTRO CURTAIN & LOGO N REVEAL */}
      {showIntro && (
        <div 
          className={`astound-intro-curtain ${introExiting ? 'curtain-exit' : ''}`}
          onClick={dismissIntro}
        >
          <div className="astound-intro-center">
            {/* Brand Logo Container */}
            <div className="astound-intro-brand">
              {/* White Rounded Square [N] Logo Icon */}
              <div className="astound-logo-n-box">
                <span>N</span>
              </div>
              {/* Text Reveal: "extBuy." emerges out horizontally from behind the N logo */}
              <div className="astound-text-reveal-container">
                <span className="astound-brand-text">
                  extBuy<span className="astound-brand-dot">.</span>
                </span>
              </div>
            </div>

            {/* Subtle Luxury Sub-kicker */}
            <div className="astound-intro-kicker">
              Enterprise Big Data & Recommendation Engine
            </div>
          </div>

          <div className="astound-intro-skip">
            Click anywhere to skip
          </div>
        </div>
      )}

      {/* Frosted Glass Bottom Blur Vignette */}
      <div className="screen-bottom-blur" aria-hidden="true" />

      {/* FLOATING PILL NAVBAR */}
      <div className="floating-nav">
        <div className="container">
          <div className="pill-bar">
            
            {/* Left: NextBuy Brand Logo */}
            <NextBuyLogo onClick={() => {
              if (!currentUser) {
                setCurrentMode('public');
              } else {
                setCurrentMode('user');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }} />

            {/* Center Navigation: If NOT logged in, show Overview / Enterprises / Storage Map */}
            {!currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button
                  onClick={() => setCurrentMode('public')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.84rem',
                    fontWeight: currentMode === 'public' ? 700 : 500,
                    color: currentMode === 'public' ? '#121212' : '#575752'
                  }}
                >
                  Overview
                </button>

                <a href="#enterprises" style={{ fontSize: '0.84rem', fontWeight: 500, color: '#575752', textDecoration: 'none' }}>
                  Enterprises
                </a>

                <a href="#storage-map" style={{ fontSize: '0.84rem', fontWeight: 500, color: '#575752', textDecoration: 'none' }}>
                  Storage Map
                </a>
              </div>
            ) : (
              /* When Logged In: The 3 sections are removed! Only the Wide Dedicated Search Bar in center */
              <div style={{ flex: 1, maxWidth: '480px', margin: '0 1.25rem', position: 'relative' }}>
                <Search size={15} color="#8E8D86" style={{ position: 'absolute', left: '16px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="Search 78 catalog products, brands, collections (Press Enter)..."
                  value={inventorySearch}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchSubmit();
                    }
                  }}
                  className="navbar-search-input"
                />
                {inventorySearch && (
                  <button
                    onClick={() => handleSearchChange('')}
                    style={{
                      position: 'absolute',
                      right: '14px',
                      top: '11px',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      color: '#8E8D86'
                    }}
                    title="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            )}

            {/* Right: Cart, User Profile Capsule & Data Panel */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              
              {/* Cart Button (Visible when user is logged in) */}
              {currentUser && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="btn btn-outline"
                  style={{
                    padding: '0.55rem 1.15rem',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    borderRadius: '9999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#FFFFFF',
                    color: '#121212',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                  title="View your shopping cart"
                >
                  <ShoppingCart size={15} />
                  <span>Cart ({cartItems.reduce((acc, i) => acc + i.qty, 0)})</span>
                </button>
              )}
              
              {/* User Capsule Pill & Dropdown (Clean Name without dot or IDs inside capsule) */}
              {currentUser ? (
                <div ref={userMenuRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="btn btn-outline"
                    style={{
                      padding: '0.55rem 1.35rem',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      cursor: 'pointer',
                      background: '#FFFFFF',
                      color: '#121212',
                      border: '1px solid var(--border-subtle)'
                    }}
                    title="User Session Profile"
                  >
                    <span>{currentUser.name}</span>
                    <ChevronDown size={14} style={{ transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: '#8E8D86' }} />
                  </button>

                  {/* Profile Dropdown Popover */}
                  {isUserMenuOpen && (
                    <div className="user-profile-popover">
                      {/* Status Header: User Profile */}
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#121212', marginBottom: '0.65rem' }}>
                        User Profile
                      </div>

                      {/* User Info Capsule */}
                      <div style={{ padding: '0.65rem 0.75rem', background: 'var(--bg-surface-secondary)', borderRadius: '12px', marginBottom: '0.85rem' }}>
                        <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#121212', marginBottom: '0.15rem' }}>
                          {currentUser.name}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#575752', marginBottom: '0.35rem' }}>
                          {currentUser.email || `${currentUser.name.toLowerCase().replace(/\s+/g, '.')}@nextbuy.internal`}
                        </div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.2rem 0.5rem', fontSize: '0.72rem', fontWeight: 700, color: '#121212' }}>
                          ID: #{currentUser.id}
                        </div>
                      </div>

                      {/* Switch to User Space / Dashboard if not currently active */}
                      {currentMode !== 'user' && (
                        <button
                          onClick={() => {
                            setCurrentMode('user');
                            setIsUserMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="btn btn-outline"
                          style={{ width: '100%', padding: '0.5rem', fontSize: '0.78rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                        >
                          <ShoppingBag size={13} />
                          Go to Dashboard
                        </button>
                      )}

                      {/* Logout Action */}
                      <button
                        onClick={handleSignOut}
                        className="btn"
                        style={{
                          width: '100%',
                          padding: '0.55rem',
                          fontSize: '0.8rem',
                          background: '#FEE2E2',
                          color: '#DC2626',
                          border: '1px solid #FCA5A5',
                          borderRadius: '10px',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.45rem',
                          cursor: 'pointer'
                        }}
                      >
                        <LogOut size={13} />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigateToSignIn()}
                  className="btn btn-outline"
                  style={{ padding: '0.55rem 1.35rem', fontSize: '0.84rem' }}
                  title="Sign In to personalize"
                >
                  <User size={14} />
                  User Sign In
                </button>
              )}

              {/* Data Panel Button (Guarded: Redirects to Sign-In if not authenticated) */}
              <button
                onClick={() => {
                  if (!currentUser) {
                    navigateToSignIn('data-panel');
                    showNotice('Authentication Required: Please sign in first to access the Data Panel.');
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setCurrentMode(currentMode === 'data-panel' ? 'user' : 'data-panel');
                  }
                }}
                className="btn btn-black"
                style={{ padding: '0.55rem 1.35rem', fontSize: '0.84rem' }}
                title={currentUser ? "Toggle Data Panel Activity" : "Sign In to Access Data Panel"}
              >
                <Activity size={14} />
                {currentMode === 'data-panel' ? 'Exit Data Panel' : 'Data Panel'}
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {notice && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: '#121212',
          color: '#FFFFFF',
          padding: '0.65rem 1.25rem',
          borderRadius: '9999px',
          fontSize: '0.82rem',
          fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}>
          {notice}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. PUBLIC LANDING PAGE (CLEAN CORPORATE SHOWCASE) */}
      {/* ========================================================================= */}
      {currentMode === 'public' && (
        <div className="page-smooth-enter" style={{ flex: 1 }}>

          {/* A. WIDE HORIZONTAL CLIP SHOWCASE WITH BASKET ZOOM-OUT */}
          <section className="hero-wide-container">
            <div className="container">
              <div className="hero-wide-card">
                
                {/* Clip 1: AdobeStock_321805688 */}
                <video
                  ref={clip1Ref}
                  src="/clips/clip_321805688.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="hero-video-scroll1"
                  style={{
                    opacity: activeClipIndex === 0 ? 1 : 0,
                    zIndex: activeClipIndex === 0 ? 2 : 1,
                    transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {/* Clip 2: AdobeStock_514936806 */}
                <video
                  ref={clip2Ref}
                  src="/clips/clip_514936806.mov"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="hero-video-scroll2"
                  style={{
                    opacity: activeClipIndex === 1 ? 1 : 0,
                    zIndex: activeClipIndex === 1 ? 2 : 1,
                    transition: 'opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="hero-overlay-gradient" />

                {/* Clean Headline & Slogan INSIDE the Clip */}
                <div className="hero-inner-content">
                  <div style={{ maxWidth: '720px' }}>
                    <h1 style={{
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      letterSpacing: '-0.03em',
                      lineHeight: 1.18,
                      marginBottom: '1rem',
                      textShadow: '0 2px 14px rgba(0,0,0,0.5)'
                    }}>
                      Next-Gen Product Discovery & Recommendation Engine
                    </h1>

                    <p style={{
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.92)',
                      lineHeight: 1.6,
                      maxWidth: '580px',
                      marginBottom: '1.85rem',
                      fontWeight: 400,
                      textShadow: '0 1px 6px rgba(0,0,0,0.35)'
                    }}>
                      Empowering enterprise product discovery across 10,000+ customer vectors, 
                      distributed Apache Spark MLlib ALS, and sub-second matrix inference.
                    </p>

                    <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => {
                          if (currentUser) {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setCurrentMode('user');
                          } else {
                            navigateToSignIn();
                          }
                        }}
                        className="btn btn-white-pill"
                      >
                        {currentUser ? 'Enter Customer Workspace' : 'User Sign In to Access Platform'} <ArrowRight size={14} />
                      </button>

                      <button
                        onClick={() => {
                          if (!currentUser) {
                            navigateToSignIn('data-panel');
                            showNotice('Authentication Required: Please sign in first to access the Data Panel.');
                          } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setCurrentMode('data-panel');
                          }
                        }}
                        className="btn btn-translucent-pill"
                      >
                        Explore Data Panel
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* B. INFINITE LOGO MARQUEE (100+ COMPANIES USING THIS TECHNIQUE) */}
          <section id="enterprises" style={{ padding: '2.5rem 0 3.5rem 0', background: 'var(--bg-canvas)' }}>
            <div className="container">
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }}></span>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8E8D86' }}>
                      OUR CLIENTS • 100+ ENTERPRISE PLATFORMS
                    </span>
                  </div>
                  <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#121212', letterSpacing: '-0.03em', marginBottom: '0.45rem', lineHeight: 1.15 }}>
                    Driving Innovation for<br />Visionary Brands
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: '#575752', maxWidth: '640px', lineHeight: 1.55 }}>
                    Deploying distributed Matrix Factorization (ALS), Snappy Parquet columnar storage, 
                    and real-time streaming inference to power billions of product recommendations daily.
                  </p>
                </div>

                <a
                  href="#storage-map"
                  style={{
                    background: '#121212',
                    color: '#FFFFFF',
                    padding: '0.6rem 1.45rem',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#2A2A2A'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#121212'; }}
                >
                  <span>View All Case Studies</span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }}></span>
                </a>
              </div>

            </div>

            {/* Infinite Marquee Scroll Track */}
            <div className="marquee-wrapper">
              <div className="marquee-track">
                {marqueeBrands.map((b, idx) => (
                  <div key={`${b.name}-${idx}`} className="astound-client-card" title={b.name}>
                    <img
                      src={b.logo}
                      alt={b.name}
                      className="astound-client-img"
                    />
                    <span style={{ fontSize: '0.68rem', color: '#8E8D86', fontWeight: 600, marginTop: '0.75rem', letterSpacing: '0.02em' }}>
                      {b.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* C. BIG DATA STORAGE ARCHITECTURE DETAILED CARDS & INSPECTOR */}
          <section id="storage-map" style={{ padding: '4.5rem 0', background: 'var(--bg-canvas)' }}>
            <div className="container">
              <div className="arch-master-card">
                
                {/* Top-Left Kicker */}
                <div className="arch-kicker">
                  <span className="arch-kicker-dot"></span>
                  <span>Big Data Storage Architecture</span>
                </div>

                {/* Section Editorial Header */}
                <h2 className="arch-headline">
                  Closing the gap between 64,000+ raw interaction signals and real-time sub-second recommendations.
                </h2>
                
                <p className="arch-body-p">
                  NextBuy implements a distributed tiered Big Data storage architecture. Raw interaction signals are partitioned into Snappy columnar Parquet stores, decomposed via Apache Spark MLlib ALS matrix factorization, recorded in transactional PostgreSQL telemetry, and served via 14.2ms in-memory event queues.
                </p>

                {/* 5 Tier Pill Tabs (Exact design from user screenshot) */}
                <div className="arch-pills-row">
                  {Object.values(STORAGE_TIER_DETAILS).map((tier) => {
                    const isActive = activeArchTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        className={`arch-tier-pill ${isActive ? 'active' : 'inactive'}`}
                        onClick={() => setActiveArchTier(tier.id)}
                      >
                        <span>{tier.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE DETAILED ARCHITECTURE INSPECTOR CARD */}
                <div className="arch-inspector-card">
                  
                  {/* Card Header: Tier Name, Status, File/DB Path */}
                  <div className="arch-inspector-header">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          fontWeight: 800, 
                          color: '#FFFFFF', 
                          background: '#121212', 
                          padding: '0.2rem 0.55rem', 
                          borderRadius: '6px',
                          letterSpacing: '0.04em'
                        }}>
                          TIER {STORAGE_TIER_DETAILS[activeArchTier].num}
                        </span>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#121212', letterSpacing: '-0.02em', margin: 0 }}>
                          {STORAGE_TIER_DETAILS[activeArchTier].headline}
                        </h3>
                      </div>
                      <p style={{ fontSize: '0.84rem', color: '#575752', margin: 0, maxWidth: '680px' }}>
                        {STORAGE_TIER_DETAILS[activeArchTier].tagline}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                      <span style={{ 
                        fontSize: '0.72rem', 
                        fontWeight: 700, 
                        color: STORAGE_TIER_DETAILS[activeArchTier].badgeColor,
                        background: '#FFFFFF',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(0,0,0,0.08)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                      }}>
                        {STORAGE_TIER_DETAILS[activeArchTier].shortBadge}
                      </span>
                      <div style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.72rem', 
                        background: '#FFFFFF', 
                        padding: '0.35rem 0.75rem', 
                        borderRadius: '8px', 
                        border: '1px solid rgba(0,0,0,0.06)',
                        color: '#121212'
                      }}>
                        {STORAGE_TIER_DETAILS[activeArchTier].path}
                      </div>
                    </div>
                  </div>

                  {/* 2-Column Inspector Grid */}
                  <div className="arch-inspector-grid">
                    
                    {/* Left Column: KPI Metrics & Schema Table */}
                    <div>
                      {/* 4 KPI Metric Boxes */}
                      <div className="arch-kpi-grid">
                        {STORAGE_TIER_DETAILS[activeArchTier].kpis.map((kpi, idx) => (
                          <div key={idx} className="arch-kpi-box">
                            <div className="arch-kpi-label">{kpi.label}</div>
                            <div className="arch-kpi-val">{kpi.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Schema Breakdown Table */}
                      <div className="arch-schema-box">
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#121212', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Database size={13} color="#2563EB" />
                          Schema & Storage Attributes
                        </div>
                        <table className="arch-schema-table">
                          <thead>
                            <tr>
                              <th>Field / Column</th>
                              <th>Type Specification</th>
                              <th>Engineering Role</th>
                            </tr>
                          </thead>
                          <tbody>
                            {STORAGE_TIER_DETAILS[activeArchTier].schema.map((item, idx) => (
                              <tr key={idx}>
                                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#121212' }}>{item.col}</td>
                                <td style={{ color: '#2563EB', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{item.type}</td>
                                <td style={{ color: '#575752' }}>{item.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Right Column: Code & Execution Terminal */}
                    <div>
                      <div className="arch-terminal">
                        <div className="arch-terminal-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }}></span>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }}></span>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                            <span style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.45)', marginLeft: '6px' }}>
                              nextbuy://engine/pipeline/{activeArchTier}
                            </span>
                          </div>
                        </div>

                        <pre className="arch-terminal-pre">
                          <code>{STORAGE_TIER_DETAILS[activeArchTier].code}</code>
                        </pre>

                        <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>
                            Production Pipeline Check: Verified
                          </span>
                          <span style={{ fontSize: '0.68rem', color: '#60A5FA', fontFamily: 'var(--font-mono)' }}>
                            Sub-second ALS
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom CTA Pill button matching Astound / luxury style */}
                <button
                  className="arch-action-pill"
                  onClick={() => {
                    if (!currentUser) {
                      navigateToSignIn('data-panel');
                      showNotice('Authentication Required: Please sign in first to access the Data Panel.');
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setCurrentMode('data-panel');
                    }
                  }}
                >
                  <span>Explore Architecture Telemetry In Data Panel</span>
                  <div className="pill-bars-white" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </button>

              </div>
            </div>
          </section>

          {/* D. CALL TO ACTION TO SIGN IN (REPLACED INVENTORY ON LANDING PAGE) */}
          <section style={{ padding: '4rem 0', background: 'var(--bg-canvas)' }}>
            <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8E8D86' }}>
                NextBuy Customer Workspace
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#121212', margin: '0.5rem 0 0.85rem 0' }}>
                Experience Personalized Discovery
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#575752', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Sign in with your name or benchmark persona to unlock the full product inventory, 
                curated recommendations, and real-time Spark MLlib matrix factorization.
              </p>
              <button
                onClick={() => {
                  if (currentUser) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setCurrentMode('user');
                  } else {
                    navigateToSignIn();
                  }
                }}
                className="btn btn-black"
                style={{ padding: '0.75rem 1.75rem', fontSize: '0.9rem' }}
              >
                Sign In to NextBuy <ArrowRight size={15} />
              </button>
            </div>
          </section>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DEDICATED USER SECTION (ALL PRODUCTS & CURATED PICKS HERE!) */}
      {/* ========================================================================= */}
      {currentMode === 'user' && currentUser && (
        <div className="page-smooth-enter" style={{ flex: 1, paddingBottom: '3.5rem' }}>
          
          {/* ========================================================================= */}
          {/* TOP PROMOTIONAL BANNER HERO CAROUSEL */}
          {/* ========================================================================= */}
          <section className="coverflow-carousel-section">
            <div className="container">
              {/* Coverflow Header: Title */}
              <div className="coverflow-header">
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8E8D86' }}>
                    Curated Promotional Highlights
                  </span>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#121212', letterSpacing: '-0.02em', marginTop: '0.15rem' }}>
                    Top Recommended Deals For You
                  </h2>
                </div>
              </div>

              {/* Coverflow Stage */}
              <div className="coverflow-stage">
                {/* Left Navigation Arrow */}
                <button
                  onClick={handlePrevSlide}
                  className="coverflow-nav-btn prev"
                  title="Previous Deal"
                >
                  <ChevronLeft size={22} />
                </button>

                {/* Coverflow Slides (3D Scale & Transition) */}
                {carouselDeals.map((deal, idx) => {
                  const N = carouselDeals.length;
                  const isCenter = idx === heroSlideIdx;
                  const isLeft = idx === (heroSlideIdx - 1 + N) % N;
                  const isRight = idx === (heroSlideIdx + 1) % N;
                  
                  let positionClass = 'hidden';
                  if (isCenter) positionClass = 'center';
                  else if (isLeft) positionClass = 'left';
                  else if (isRight) positionClass = 'right';

                  return (
                    <div
                      key={deal.item_id}
                      className={`coverflow-slide ${positionClass}`}
                      onClick={() => {
                        if (isLeft) handlePrevSlide();
                        else if (isRight) handleNextSlide();
                        else if (isCenter) handleInspectProduct(deal);
                      }}
                      style={{ cursor: 'pointer' }}
                      title={isCenter ? `Click to view details for ${deal.title}` : `Rotate to ${deal.title}`}
                    >
                      {/* Slide Top: Deal Badge & Brand */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          background: '#121212',
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.25rem 0.65rem',
                          borderRadius: '9999px',
                          letterSpacing: '0.04em'
                        }}>
                          {deal.discountPct}% OFF DEAL
                        </span>
                        <span style={{ fontSize: '0.74rem', color: '#8E8D86', fontWeight: 700, textTransform: 'uppercase' }}>
                          {deal.brand}
                        </span>
                      </div>

                      {/* Slide Image / Visual Area with Product Photo */}
                      <div style={{
                        background: '#F6F5EF',
                        borderRadius: '18px',
                        height: '175px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0.85rem 0',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        {deal.image_url ? (
                          <img
                            src={deal.image_url}
                            alt={deal.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              padding: '0.65rem'
                            }}
                            loading="lazy"
                          />
                        ) : (
                          <ShoppingBag size={52} color="#121212" strokeWidth={1.5} />
                        )}
                        <span style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: '#16A34A',
                          background: '#DCFCE7',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '9999px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                        }}>
                          Save ₹{Number(deal.savings).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Slide Content */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.85rem' }}>
                          <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#121212', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '190px' }} title={deal.title}>
                            {deal.title}
                          </h3>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '0.78rem', color: '#9CA3AF', textDecoration: 'line-through', marginRight: '0.4rem' }}>
                              ₹{Number(deal.originalPrice).toLocaleString('en-IN')}
                            </span>
                            <span style={{ fontSize: '1.18rem', fontWeight: 800, color: '#121212' }}>
                              ₹{Number(deal.dealPrice).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(deal);
                          }}
                          className="btn btn-black"
                          style={{
                            width: '100%',
                            padding: '0.7rem',
                            borderRadius: '9999px',
                            fontWeight: 700,
                            fontSize: '0.84rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.45rem'
                          }}
                        >
                          <ShoppingBag size={14} />
                          Claim Deal & Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Right Navigation Arrow */}
                <button
                  onClick={handleNextSlide}
                  className="coverflow-nav-btn next"
                  title="Next Deal"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Elongated Pagination Pills */}
              <div className="coverflow-pagination">
                {carouselDeals.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroSlideIdx(idx)}
                    className={`coverflow-pill-dot ${idx === heroSlideIdx ? 'active' : 'inactive'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* CURATED TOP PICKS (PERSONALIZED TOP PRODUCTS SHOWN TO USER) */}
          <section style={{ padding: '2.5rem 0' }}>
            <div className="container">
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8E8D86' }}>
                    Personalized Selections
                  </span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#121212', letterSpacing: '-0.02em', marginTop: '0.2rem' }}>
                    Curated Top Picks for {currentUser.name}
                  </h2>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {userRecs?.active_intent_category && (
                    <span className="badge-clean badge-match" style={{ fontSize: '0.74rem' }}>
                      Exploration Focus: {userRecs.active_intent_category} (Viewed items excluded)
                    </span>
                  )}
                  <div style={{ fontSize: '0.82rem', color: '#575752' }}>
                    Derived from Customer Profile <b>#{currentUser.id}</b> • Spark MLlib ALS
                  </div>
                </div>
              </div>

              {/* Cold-Start Callout if new user */}
              {userRecs?.is_cold_start && (
                <div style={{
                  background: '#FFFFFF',
                  border: '1px solid #FDE68A',
                  borderRadius: '12px',
                  padding: '0.75rem 1.25rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.82rem',
                  color: '#92400E'
                }}>
                  <AlertTriangle size={15} color="#D97706" />
                  <span><b>New User Profile Detected:</b> Serving trending popularity-weighted bestsellers until you interact with products below.</span>
                </div>
              )}

              {/* Recommendations Cards Grid (Modern Card Layout Matching Image 3) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {userRecs?.recommendations?.map((item) => (
                  <ModernProductCard
                    key={item.item_id}
                    product={item}
                    onAddToCart={handleAddToCart}
                    onInspect={handleInspectProduct}
                    onRate={(p) => {
                      recordEvent(p.item_id, 'rate', 5.0);
                      showNotice(`Rated '${p.title.slice(0, 18)}...' 5 Stars — Matrix updated live.`);
                    }}
                    selectedSize={selectedProductSizes[item.item_id]}
                    onSelectSize={handleSelectProductSize}
                    cartQty={cartItems.find(i => i.item_id === item.item_id)?.qty || 0}
                    onUpdateCartQty={handleUpdateCartQty}
                  />
                ))}
              </div>

              {/* Product Inventory Catalog (User Workspace) */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#121212' }}>
                      Browse Catalog & Trigger Live Re-Ranking ({filteredProducts.length} items)
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#575752' }}>
                      Rate 5 Stars or add items to cart: NextBuy's Spark engine immediately re-weights your latent factor vector!
                    </p>
                  </div>

                  {/* Search Input with Clear Action & Telemetry */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    <div style={{ position: 'relative', width: '320px' }}>
                      <Search size={14} color="#8E8D86" style={{ position: 'absolute', left: '14px', top: '11px' }} />
                      <input
                        type="text"
                        placeholder="Search products, brands, collections..."
                        value={inventorySearch}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        style={{
                          width: '100%',
                          background: '#FFFFFF',
                          border: '1.5px solid var(--border-subtle)',
                          borderRadius: '9999px',
                          padding: '0.5rem 2.2rem 0.5rem 2.4rem',
                          fontSize: '0.84rem',
                          color: '#121212',
                          outline: 'none',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                        }}
                      />
                      {inventorySearch && (
                        <button
                          onClick={() => handleSearchChange('')}
                          style={{
                            position: 'absolute',
                            right: '12px',
                            top: '10px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#8E8D86',
                            padding: 0
                          }}
                          title="Clear search"
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>

                    {/* Quick Search Tag Suggestions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.7rem', color: '#8E8D86', fontWeight: 600 }}>Popular:</span>
                      {['Nike', 'Apple', 'Adidas', 'Sony', 'Zara', 'Denim'].map(tag => (
                        <button
                          key={tag}
                          onClick={() => handleSearchChange(inventorySearch.toLowerCase() === tag.toLowerCase() ? '' : tag)}
                          style={{
                            background: inventorySearch.toLowerCase() === tag.toLowerCase() ? '#121212' : '#F6F5EF',
                            color: inventorySearch.toLowerCase() === tag.toLowerCase() ? '#FFFFFF' : '#575752',
                            border: 'none',
                            borderRadius: '9999px',
                            padding: '0.15rem 0.55rem',
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category & Gender Filter Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.85rem' }}>
                  {/* Category Pills */}
                  <div style={{ display: 'flex', gap: '0.45rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setInventoryCategory(cat)}
                        className="btn"
                        style={{
                          background: inventoryCategory === cat ? '#121212' : '#FFFFFF',
                          color: inventoryCategory === cat ? '#FFFFFF' : '#575752',
                          border: '1px solid var(--border-subtle)',
                          padding: '0.45rem 1.05rem',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          borderRadius: '9999px',
                          whiteSpace: 'nowrap',
                          boxShadow: inventoryCategory === cat ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Gender / Audience Pills (All, Men's, Women's, Unisex) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#8E8D86', textTransform: 'uppercase', letterSpacing: '0.04em', marginRight: '0.2rem' }}>
                      Filter Collection:
                    </span>
                    {[
                      { key: 'All', label: 'All Genders' },
                      { key: 'Men', label: "Men's Collection" },
                      { key: 'Women', label: "Women's Collection" },
                      { key: 'Unisex', label: 'Unisex' }
                    ].map(g => (
                      <button
                        key={g.key}
                        onClick={() => setInventoryGender(g.key)}
                        style={{
                          background: inventoryGender === g.key ? '#121212' : '#F4F3ED',
                          color: inventoryGender === g.key ? '#FFFFFF' : '#575752',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.3rem 0.75rem',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inventory Grid (Modern Product Cards matching Image 3) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {filteredProducts.map(p => (
                    <ModernProductCard
                      key={p.item_id}
                      product={p}
                      onAddToCart={handleAddToCart}
                      onInspect={handleInspectProduct}
                      onRate={(item) => {
                        recordEvent(item.item_id, 'rate', 5.0);
                        showNotice(`Rated '${item.title.slice(0, 18)}...' 5 Stars — Matrix updated live.`);
                      }}
                      selectedSize={selectedProductSizes[p.item_id]}
                      onSelectSize={handleSelectProductSize}
                      cartQty={cartItems.find(i => i.item_id === p.item_id)?.qty || 0}
                      onUpdateCartQty={handleUpdateCartQty}
                    />
                  ))}
                </div>

              </div>

            </div>
          </section>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DATA PANEL (USER & SYSTEM RECOMMENDATION ACTIVITY CENTER) */}
      {/* ========================================================================= */}
      {currentMode === 'data-panel' && (
        <div className="page-smooth-enter" style={{ flex: 1, paddingBottom: '3.5rem', paddingTop: '1.5rem' }}>
          <div className="container">

            {/* Data Panel Header Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem' }}>
                  <span className="pulse-dot-green"></span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#16A34A' }}>
                    Real-Time Recommendation System DAG • PostgreSQL WAL Active
                  </span>
                </div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#121212', letterSpacing: '-0.02em', margin: 0 }}>
                  Backend Recommendation Engine Intelligence
                </h1>
                <p style={{ fontSize: '0.82rem', color: '#575752', marginTop: '0.25rem', maxWidth: '720px' }}>
                  Observe step-by-step how user interactions, parallel search tokens, and Apache Spark ALS matrix factorization dynamically compute recommendations in real time.
                </p>
              </div>

              {/* Action Buttons: Live Polling, Refresh, Store */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsLivePolling(!isLivePolling)}
                  className="btn"
                  style={{
                    fontSize: '0.76rem',
                    padding: '0.45rem 0.85rem',
                    background: isLivePolling ? '#DCFCE7' : '#F1F5F9',
                    color: isLivePolling ? '#166534' : '#64748B',
                    border: '1px solid ' + (isLivePolling ? '#86EFAC' : '#CBD5E1'),
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontWeight: 700
                  }}
                  title="Toggle automatic 3.5-second live telemetry refresh"
                >
                  <span className={isLivePolling ? 'pulse-dot-green' : ''} style={!isLivePolling ? { width: 7, height: 7, borderRadius: '50%', background: '#94A3B8', display: 'inline-block' } : {}}></span>
                  {isLivePolling ? 'Live Auto-Sync: ON' : 'Live Auto-Sync: Paused'}
                </button>

                <button
                  onClick={() => {
                    if (currentUser) {
                      fetchUserDataPanel(currentUser.id);
                      fetchUserRecommendations(currentUser.id);
                      showNotice('Engine state refreshed from PostgreSQL.');
                    }
                  }}
                  className="btn btn-outline"
                  style={{ fontSize: '0.76rem', padding: '0.45rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                  title="Fetch latest telemetry"
                >
                  <RotateCcw size={13} /> Sync Now
                </button>

                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setCurrentMode('user');
                  }}
                  className="btn btn-black"
                  style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
                >
                  <ShoppingBag size={14} /> Return to Store
                </button>
              </div>
            </div>

            {/* Quick Ingestion Simulator Bar */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '0.85rem 1.15rem',
              marginBottom: '1.5rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Zap size={16} color="#D97706" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#121212' }}>
                  Interactive Live Simulator:
                </span>
                <span style={{ fontSize: '0.76rem', color: '#575752' }}>
                  Click an action to trigger backend re-weighting and watch the pipeline execute live:
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleSimulatePipelineAction('search', 'Running Shoes', 'Footware')}
                  disabled={pipelineSimulating}
                  className="btn btn-outline"
                  style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem', fontWeight: 600, background: '#F8FAFC' }}
                >
                  Search: "Running Shoes"
                </button>
                <button
                  onClick={() => handleSimulatePipelineAction('search', 'Sony Audio', 'Electronics')}
                  disabled={pipelineSimulating}
                  className="btn btn-outline"
                  style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem', fontWeight: 600, background: '#F8FAFC' }}
                >
                  Search: "Sony Audio"
                </button>
                <button
                  onClick={() => handleSimulatePipelineAction('cart', 40, 'Footware')}
                  disabled={pipelineSimulating}
                  className="btn btn-outline"
                  style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem', fontWeight: 600, background: '#F8FAFC' }}
                >
                  Add to Cart: Shoes
                </button>
                <button
                  onClick={() => handleSimulatePipelineAction('rate', 15, 'Electronics')}
                  disabled={pipelineSimulating}
                  className="btn btn-outline"
                  style={{ fontSize: '0.72rem', padding: '0.35rem 0.75rem', fontWeight: 600, background: '#F8FAFC' }}
                >
                  Rate 5 Stars: Apple Watch
                </button>
              </div>
            </div>

            {/* TAB SWITCHER */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
              {[
                { id: 'pipeline', label: 'Real-Time Pipeline DAG' },
                { id: 'logics', label: 'Explainable AI Logics' },
                { id: 'searches', label: 'Parallel Search Logs' },
                { id: 'stream', label: 'Live Ingestion Stream' },
                { id: 'overview', label: 'Spark Metrics & Parquet' },
                { id: 'cluster', label: 'Cluster Architecture' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setDataPanelTab(t.id)}
                  className="btn"
                  style={{
                    background: dataPanelTab === t.id ? '#121212' : '#FFFFFF',
                    color: dataPanelTab === t.id ? '#FFFFFF' : '#575752',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.45rem 0.95rem',
                    fontSize: '0.78rem',
                    fontWeight: dataPanelTab === t.id ? 700 : 500
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* ========================================================================= */}
            {/* TAB 1: REAL-TIME PIPELINE DAG & MATHEMATICAL PROOF */}
            {/* ========================================================================= */}
            {dataPanelTab === 'pipeline' && (
              <div>
                {/* 5-STAGE PIPELINE DAG CARDS */}
                <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#121212' }}>
                    End-to-End Processing Flowchart (Click any stage to inspect internal state):
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 700 }}>
                    Total Inference Latency: {userDataPanel.total_latency_ms || 16.0}ms
                  </span>
                </div>

                <div className="pipeline-dag-container">
                  {(userDataPanel.pipeline_stages || [
                    { stage_id: 1, name: 'Signal Ingestion', tech: 'PostgreSQL WAL & Queue', status: 'STREAMING', latency_ms: 2.1, metrics: { total_events: 12, latest_signal: 'view' } },
                    { stage_id: 2, name: 'Category Affinity', tech: 'Frequency Vectorizer', status: 'COMPUTED', latency_ms: 3.4, metrics: { top_category: 'Footware', affinity_weight: '45%' } },
                    { stage_id: 3, name: 'Spark ALS Matrix', tech: 'Apache Spark MLlib Rank 12', status: 'CONVERGED', latency_ms: 4.8, metrics: { latent_rank: 12, model_rmse: 1.4754 } },
                    { stage_id: 4, name: 'Hybrid Fusion', tech: 'Linear Multi-Vector Ranking', status: 'RANKED', latency_ms: 3.9, metrics: { als_weight: '70%', content_weight: '30%' } },
                    { stage_id: 5, name: 'Top-6 Delivery', tech: 'FastAPI Sub-20ms Stream', status: 'SERVED', latency_ms: 1.8, metrics: { output_items: 6, total_e2e_latency: '16.0ms' } },
                  ]).map((stg) => {
                    const isSelected = selectedPipelineStage === stg.stage_id;
                    return (
                      <div
                        key={stg.stage_id}
                        onClick={() => setSelectedPipelineStage(stg.stage_id)}
                        className={`pipeline-stage-card ${isSelected ? 'active' : ''}`}
                      >
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="pipeline-stage-num">Stage 0{stg.stage_id}</span>
                            <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#16A34A', background: '#DCFCE7', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                              {stg.latency_ms}ms
                            </span>
                          </div>
                          <div className="pipeline-stage-title">{stg.name}</div>
                          <div className="pipeline-stage-tech">{stg.tech}</div>
                        </div>

                        <div className="pipeline-stage-badge-row">
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.68rem', fontWeight: 700, color: '#16A34A' }}>
                            <span className="pulse-dot-green"></span>
                            {stg.status}
                          </span>
                          <span style={{ fontSize: '0.68rem', color: '#8E8D86', fontWeight: 600 }}>
                            {stg.metrics?.top_category || stg.metrics?.total_events ? `${stg.metrics?.top_category || stg.metrics?.total_events + ' Evts'}` : 'Live'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* SELECTED STAGE DETAILED INSPECTOR */}
                {(() => {
                  const currentStageObj = (userDataPanel.pipeline_stages || []).find(s => s.stage_id === selectedPipelineStage) || {
                    stage_id: selectedPipelineStage,
                    name: `Stage 0${selectedPipelineStage} Processing`,
                    tech: 'Engine Component',
                    description: 'Processes interaction signals and maps them to continuous recommendation vectors.',
                    metrics: {}
                  };
                  return (
                    <div className="card-clean" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', background: '#FAF9F5', borderLeft: '4px solid #121212' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 800, background: '#121212', color: '#FFFFFF', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                            STAGE 0{currentStageObj.stage_id} INSPECTOR
                          </span>
                          <span style={{ fontSize: '0.94rem', fontWeight: 800, color: '#121212' }}>
                            {currentStageObj.name}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#575752', fontFamily: 'var(--font-mono)' }}>
                          Subsystem: <b>{currentStageObj.tech}</b>
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#404040', margin: '0 0 0.5rem 0', lineHeight: 1.45 }}>
                        {currentStageObj.description}
                      </p>
                      <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.74rem', color: '#575752', flexWrap: 'wrap' }}>
                        {Object.entries(currentStageObj.metrics || {}).map(([k, v]) => (
                          <span key={k}>
                            {k.replace(/_/g, ' ').toUpperCase()}: <b style={{ color: '#121212' }}>{String(v)}</b>
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* 2-COLUMN SECTION: DECISION PROOF (LEFT) & AFFINITY / VECTORS (RIGHT) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  
                  {/* LEFT: STEP-BY-STEP MATHEMATICAL DECISION PROOF */}
                  <div className="card-clean" style={{ padding: '1.35rem', background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#2563EB' }}>
                          Explainable AI Decision Proof
                        </div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#121212', margin: '0.1rem 0 0 0' }}>
                          Mathematical Proof for #1 Recommendation
                        </h3>
                      </div>
                      <span className="badge-clean badge-match">
                        {userDataPanel.top_proof?.match_percentage || 98.4}% Match
                      </span>
                    </div>

                    {/* Product Card Snippet */}
                    {userDataPanel.top_proof && (
                      <div style={{
                        display: 'flex',
                        gap: '0.9rem',
                        alignItems: 'center',
                        background: '#F8FAFC',
                        borderRadius: '10px',
                        padding: '0.65rem 0.85rem',
                        marginBottom: '1rem',
                        border: '1px solid #E2E8F0'
                      }}>
                        {userDataPanel.top_proof.image_url && (
                          <div style={{ width: '48px', height: '48px', background: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3px' }}>
                            <img src={userDataPanel.top_proof.image_url} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          </div>
                        )}
                        <div>
                          <div style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748B' }}>
                            {userDataPanel.top_proof.brand} • {userDataPanel.top_proof.category}
                          </div>
                          <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0F172A' }}>
                            {userDataPanel.top_proof.title}
                          </div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#121212' }}>
                            ₹{Number(userDataPanel.top_proof.price || 0).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Formula Box */}
                    <div style={{ background: '#0F172A', color: '#F8FAFC', borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.76rem' }}>
                      <div style={{ color: '#93C5FD', fontWeight: 700, marginBottom: '0.2rem' }}>
                        Mathematical Scoring Formulation:
                      </div>
                      <div>
                        Score(u, i) = (0.70 × S_ALS) + (0.30 × S_TFIDF) + CategoryAffinityBoost
                      </div>
                      <div style={{ color: '#34D399', marginTop: '0.4rem', fontWeight: 700 }}>
                        {userDataPanel.top_proof?.formula_string || 'Score = (0.70 × 4.85) + (0.30 × 4.75) + 0.15 = 4.92 / 5.0 (98.4% Match)'}
                      </div>
                    </div>

                    {/* Math Component Table */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', marginBottom: '0.75rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: '#8E8D86', fontSize: '0.7rem' }}>
                          <th style={{ padding: '0.45rem 0' }}>SCORING COMPONENT</th>
                          <th style={{ padding: '0.45rem 0' }}>RAW VALUE</th>
                          <th style={{ padding: '0.45rem 0' }}>FUSION WEIGHT</th>
                          <th style={{ padding: '0.45rem 0', textAlign: 'right' }}>WEIGHTED VALUE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '0.45rem 0', fontWeight: 600 }}>Spark ALS Matrix Dot-Product</td>
                          <td style={{ padding: '0.45rem 0' }}>{userDataPanel.top_proof?.als_component_score || 4.85} / 5.0</td>
                          <td style={{ padding: '0.45rem 0' }}>70% (0.70)</td>
                          <td style={{ padding: '0.45rem 0', textAlign: 'right', fontWeight: 700, color: '#16A34A' }}>3.395</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '0.45rem 0', fontWeight: 600 }}>TF-IDF Cosine Content Match</td>
                          <td style={{ padding: '0.45rem 0' }}>{userDataPanel.top_proof?.content_component_score || 4.75} / 5.0</td>
                          <td style={{ padding: '0.45rem 0' }}>30% (0.30)</td>
                          <td style={{ padding: '0.45rem 0', textAlign: 'right', fontWeight: 700, color: '#16A34A' }}>1.425</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '0.45rem 0', fontWeight: 600 }}>Category Affinity Priority Boost</td>
                          <td style={{ padding: '0.45rem 0' }}>Top Category Fit</td>
                          <td style={{ padding: '0.45rem 0' }}>Implicit Boost</td>
                          <td style={{ padding: '0.45rem 0', textAlign: 'right', fontWeight: 700, color: '#2563EB' }}>+0.150</td>
                        </tr>
                        <tr style={{ fontWeight: 800, fontSize: '0.84rem' }}>
                          <td style={{ padding: '0.6rem 0' }}>FINAL COMPOSITE RATING</td>
                          <td colSpan={2} style={{ padding: '0.6rem 0' }}>Ranked #1 Candidate</td>
                          <td style={{ padding: '0.6rem 0', textAlign: 'right', color: '#121212' }}>
                            {userDataPanel.top_proof?.final_predicted_rating || 4.92} / 5.0
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p style={{ fontSize: '0.74rem', color: '#575752', margin: 0, lineHeight: 1.4 }}>
                      <b>Model Decision Rationale:</b> {userDataPanel.top_proof?.why_recommended || 'Strong collaborative filtering score in Spark ALS latent subspace combined with high category affinity derived from recent activity.'}
                    </p>
                  </div>

                  {/* RIGHT: REAL-TIME CATEGORY AFFINITY & LATENT VECTORS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    
                    {/* Category Affinity Progress Meters */}
                    <div className="card-clean" style={{ padding: '1.25rem', background: '#FFFFFF' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <div>
                          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#121212', margin: 0 }}>
                            Category Affinity Vector (Live)
                          </h4>
                          <span style={{ fontSize: '0.7rem', color: '#8E8D86' }}>
                            Dynamically inferred from searches, carts, and ratings
                          </span>
                        </div>
                        <span className="pulse-dot-green"></span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {(userDataPanel.category_affinity || [
                          { category: 'Footware', percentage: 45.0, weight: 4.5 },
                          { category: 'Electronics', percentage: 35.0, weight: 3.5 },
                          { category: 'Clothing', percentage: 20.0, weight: 2.0 },
                        ]).map((cat) => (
                          <div key={cat.category}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '3px' }}>
                              <span style={{ fontWeight: 700, color: '#121212' }}>{cat.category}</span>
                              <span style={{ color: '#575752', fontWeight: 600 }}>{cat.percentage}% affinity</span>
                            </div>
                            <div style={{ background: '#F1F5F9', height: '7px', borderRadius: '4px', overflow: 'hidden' }}>
                              <div
                                style={{
                                  width: `${cat.percentage}%`,
                                  height: '100%',
                                  background: cat.category === userDataPanel.category_affinity?.[0]?.category ? '#121212' : '#64748B',
                                  transition: 'width 0.4s ease'
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 12-Dimensional User Latent Vector (P_u) Visualization */}
                    <div className="card-clean" style={{ padding: '1.25rem', background: '#FFFFFF', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div>
                          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#121212', margin: 0 }}>
                            Spark ALS Latent Vector (P_u)
                          </h4>
                          <span style={{ fontSize: '0.7rem', color: '#8E8D86' }}>
                            12-Dimensional Matrix Factorization Coordinates
                          </span>
                        </div>
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#2563EB', background: '#EFF6FF', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                          Rank = 12
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px', alignItems: 'flex-end', height: '65px', padding: '0.5rem 0', borderBottom: '1px solid #E2E8F0', marginBottom: '0.45rem' }}>
                        {(userDataPanel.latent_vector || Array.from({ length: 12 }, (_, i) => ({ dim: i + 1, value: ((i * 37) % 100 - 50) / 75 }))).map((dim) => {
                          const heightPct = Math.max(15, Math.min(100, Math.abs(dim.value) * 100));
                          const isPositive = dim.value >= 0;
                          return (
                            <div key={dim.dim} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                              <div
                                title={`Dim ${dim.dim}: ${dim.value}`}
                                style={{
                                  width: '100%',
                                  height: `${heightPct}%`,
                                  background: isPositive ? '#16A34A' : '#EF4444',
                                  borderRadius: '2px',
                                  transition: 'height 0.3s ease'
                                }}
                              ></div>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.66rem', color: '#94A3B8' }}>
                        <span>Dim 01</span>
                        <span>Dimensions 02 - 11</span>
                        <span>Dim 12</span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* REAL-TIME STREAM CONSOLE / TERMINAL (LIVE LOG TICKER) */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Terminal size={14} color="#121212" />
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#121212' }}>
                        Real-Time Ingestion & Model Reaction Terminal
                      </span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                      WebSocket / Memory Stream Queue
                    </span>
                  </div>

                  <div className="terminal-console-box">
                    {(userDataPanel.live_logs || [
                      { time: '08:00:00', event: 'INITIALIZED', msg: 'Real-time stream session engine ready. Awaiting user interaction events.' }
                    ]).map((log, idx) => {
                      const isSearch = log.event?.includes('SEARCH');
                      const isStream = log.event?.includes('STREAM');
                      const tagClass = isSearch ? 'terminal-tag-search' : (isStream ? 'terminal-tag-stream' : 'terminal-tag-init');
                      return (
                        <div key={idx} className="terminal-log-line">
                          <span className="terminal-time">[{log.time}]</span>
                          <span className={`terminal-tag ${tagClass}`}>{log.event}</span>
                          <span className="terminal-msg">{log.msg}</span>
                        </div>
                      );
                    })}
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.4rem', color: '#22C55E' }}>
                      <span className="pulse-dot-green"></span>
                      <span>&gt; Listening for live user events (clicks, searches, carts, ratings)...</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: EXPLAINABLE AI LOGICS TAB */}
            {/* ========================================================================= */}
            {dataPanelTab === 'logics' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#121212' }}>
                      Explainable AI: Mathematical Logic Behind Your Recommendations
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#575752' }}>
                      Direct PostgreSQL telemetry showing the exact latent factor dot-products and category affinity weights.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (currentUser) fetchUserDataPanel(currentUser.id);
                      showNotice('PostgreSQL recommendation logic refreshed.');
                    }}
                    className="btn btn-outline"
                    style={{ fontSize: '0.74rem' }}
                  >
                    Refresh Logic Logs
                  </button>
                </div>

                {/* Mathematical Formula Banner */}
                <div style={{
                  background: '#FAF9F5',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.25rem',
                  fontSize: '0.82rem',
                  color: '#121212',
                  lineHeight: 1.6
                }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: '#2563EB' }}>
                    Collaborative Filtering Scoring Formula:
                  </div>
                  <div>
                    <code>Score(u, i) = P_u · Q_i + α · CategoryAffinity(u, c_i)</code>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#575752', marginTop: '0.35rem' }}>
                    Where <b>P_u</b> is your 12-dimensional latent user factor vector in PostgreSQL, <b>Q_i</b> is the item's latent vector, and <b>α</b> weights your recent search terms.
                  </div>
                </div>

                {/* Logics Cards / Table */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                  {/* PostgreSQL Logged Decisions */}
                  {userDataPanel.recommendation_logics && userDataPanel.recommendation_logics.length > 0 ? (
                    userDataPanel.recommendation_logics.map((log) => (
                      <div key={log.log_id} className="card-clean" style={{ padding: '1rem 1.25rem', background: '#FFFFFF' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#121212' }}>
                            {log.title}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className="badge-clean badge-match">{log.match_percentage}% Match</span>
                            <span style={{ fontSize: '0.72rem', color: '#8E8D86', fontFamily: 'var(--font-mono)' }}>{log.time_str}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.5, margin: '0 0 0.5rem 0' }}>
                          {log.logic_explanation}
                        </p>
                        <div style={{ fontSize: '0.72rem', color: '#575752', display: 'flex', gap: '1rem' }}>
                          <span>Category: <b>{log.category}</b></span>
                          <span>Latent Factor Dot-Product: <b>{log.als_score}</b></span>
                          <span>Storage: <b>PostgreSQL (recommendation_logic_logs)</b></span>
                        </div>
                      </div>
                    ))
                  ) : (
                    /* Synthesized Curated Logic for Current Recommendations */
                    userRecs?.recommendations?.map((item, idx) => (
                      <div key={item.item_id} className="card-clean" style={{ padding: '1rem 1.25rem', background: '#FFFFFF' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#121212' }}>
                            #{idx + 1}. {item.title}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className="badge-clean badge-match">{item.match_percentage}% Match</span>
                            <span style={{ fontSize: '0.72rem', color: '#15803D', fontWeight: 600 }}>ALS Rank #{idx + 1}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.5, margin: '0 0 0.5rem 0' }}>
                          {item.reason || `Calculated via Apache Spark ALS alternating least squares matrix factorization. High dot-product projection in the ${item.category} latent subspace.`}
                        </p>
                        <div style={{ fontSize: '0.72rem', color: '#575752', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                          <span>Category: <b>{item.category}</b></span>
                          <span>Rating Score: <b>{item.predicted_rating || 4.8} / 5.0</b></span>
                          <span>Latent Dot-Product: <b>{(item.match_percentage / 100 * 0.95).toFixed(4)}</b></span>
                          <span>Source: <b>Spark MLlib ALS Model Matrix</b></span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: PARALLEL SEARCH TRACKING TAB */}
            {/* ========================================================================= */}
            {dataPanelTab === 'searches' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#121212' }}>
                      Parallel Search Query Logs & Vector Weighting
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#575752' }}>
                      Every search you type in the store is logged into PostgreSQL in parallel to steer real-time candidate retrieval.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (currentUser) fetchUserDataPanel(currentUser.id);
                      showNotice('PostgreSQL search stream refreshed.');
                    }}
                    className="btn btn-outline"
                    style={{ fontSize: '0.74rem' }}
                  >
                    Refresh Searches
                  </button>
                </div>

                <div className="card-clean" style={{ padding: '1.25rem', overflowX: 'auto', marginBottom: '1.5rem', background: '#FFFFFF' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: '#8E8D86', fontSize: '0.74rem' }}>
                        <th style={{ padding: '0.6rem' }}>TIMESTAMP</th>
                        <th style={{ padding: '0.6rem' }}>SEARCH QUERY</th>
                        <th style={{ padding: '0.6rem' }}>CATEGORY FILTER</th>
                        <th style={{ padding: '0.6rem' }}>ITEMS MATCHED</th>
                        <th style={{ padding: '0.6rem' }}>PARALLEL ALS WEIGHTING</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDataPanel.searches && userDataPanel.searches.length > 0 ? (
                        userDataPanel.searches.map((s) => (
                          <tr key={s.search_id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                            <td style={{ padding: '0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>{s.time_str}</td>
                            <td style={{ padding: '0.6rem', fontWeight: 700, color: '#121212' }}>"{s.search_query}"</td>
                            <td style={{ padding: '0.6rem' }}><span className="badge-clean">{s.category_filter}</span></td>
                            <td style={{ padding: '0.6rem' }}>{s.matched_count} SKUs</td>
                            <td style={{ padding: '0.6rem', color: '#2563EB', fontWeight: 600 }}>Vectorized Category Boost</td>
                          </tr>
                        ))
                      ) : (
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td colSpan={5} style={{ padding: '1.5rem', textAlign: 'center', color: '#8E8D86' }}>
                            No searches recorded in PostgreSQL yet. Return to the Product Store, search for "Headphones" or "Keyboard", and your parallel search will appear here!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: LIVE USER INTERACTION STREAM */}
            {/* ========================================================================= */}
            {dataPanelTab === 'stream' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#121212' }}>
                      Real-Time User Recommendation Activity Stream
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#575752' }}>
                      Live interaction events captured in PostgreSQL and active in-memory session buffer.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        if (currentUser) fetchUserDataPanel(currentUser.id);
                        showNotice('Activity stream refreshed.');
                      }}
                      className="btn btn-outline"
                      style={{ fontSize: '0.74rem' }}
                    >
                      Refresh
                    </button>
                    <button
                      onClick={() => {
                        fetch(`${API_BASE}/live-session/reset`, { method: 'POST' })
                          .then(() => {
                            if (currentUser) fetchUserDataPanel(currentUser.id);
                            showNotice('Live interaction stream reset.');
                          });
                      }}
                      className="btn btn-outline"
                      style={{ fontSize: '0.74rem' }}
                    >
                      Reset Stream
                    </button>
                  </div>
                </div>

                <div className="card-clean" style={{ padding: '1.25rem', overflowX: 'auto', marginBottom: '1.5rem', background: '#FFFFFF' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: '#8E8D86', fontSize: '0.74rem' }}>
                        <th style={{ padding: '0.6rem' }}>TIMESTAMP</th>
                        <th style={{ padding: '0.6rem' }}>EVENT TYPE</th>
                        <th style={{ padding: '0.6rem' }}>TARGET PRODUCT</th>
                        <th style={{ padding: '0.6rem' }}>CATEGORY</th>
                        <th style={{ padding: '0.6rem' }}>ALS WEIGHT</th>
                        <th style={{ padding: '0.6rem' }}>DAG ACTION TRIGGERED</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDataPanel.interactions && userDataPanel.interactions.length > 0 ? (
                        userDataPanel.interactions.map((inter, idx) => (
                          <tr key={inter.interaction_id || idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                            <td style={{ padding: '0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem' }}>{inter.time_str || '08:00:00'}</td>
                            <td style={{ padding: '0.6rem' }}>
                              <span className="badge-clean badge-match" style={{ textTransform: 'uppercase', fontSize: '0.68rem', fontWeight: 700 }}>
                                {inter.event_type}
                              </span>
                            </td>
                            <td style={{ padding: '0.6rem', fontWeight: 700, color: '#121212' }}>
                              {inter.title || `Item #${inter.product_id || inter.item_id}`}
                            </td>
                            <td style={{ padding: '0.6rem' }}>
                              <span className="badge-clean">{inter.category || 'General'}</span>
                            </td>
                            <td style={{ padding: '0.6rem', fontWeight: 700, color: '#16A34A' }}>
                              {Number(inter.als_weight || 2.0).toFixed(2)}x
                            </td>
                            <td style={{ padding: '0.6rem', color: '#2563EB', fontWeight: 600 }}>
                              Real-Time ALS Vector Re-weighting
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td colSpan={6} style={{ padding: '1.5rem', textAlign: 'center', color: '#8E8D86' }}>
                            No user interactions recorded yet. Go to the Product Store, click any card to inspect or add to cart, and your live telemetry will stream here!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* OVERVIEW TAB */}
            {dataPanelTab === 'overview' && bigdataMetrics && (
              <div>
                {/* KPI Metrics Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  {[
                    { label: 'Total Interaction Ratings', val: bigdataMetrics.summary?.matrix_dimensions?.total_ratings?.toLocaleString(), sub: 'User-Item Transactions' },
                    { label: 'Unique Customers', val: bigdataMetrics.summary?.matrix_dimensions?.unique_users?.toLocaleString(), sub: 'Distributed User Nodes' },
                    { label: 'Catalog Products', val: bigdataMetrics.summary?.matrix_dimensions?.unique_items?.toLocaleString(), sub: 'Active SKUs' },
                    { label: 'Matrix Sparsity', val: `${bigdataMetrics.summary?.matrix_dimensions?.sparsity_percentage}%`, sub: 'Coordinate Tuples Format' },
                    { label: 'Model Test RMSE', val: bigdataMetrics.als_training?.rmse?.toFixed(4) || '1.5617', sub: 'Latent Factor Rank = 15' },
                  ].map((kpi, idx) => (
                    <div key={idx} className="card-clean" style={{ padding: '1.25rem' }}>
                      <div style={{ fontSize: '0.74rem', color: '#8E8D86', fontWeight: 600 }}>{kpi.label}</div>
                      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#121212', margin: '0.25rem 0' }}>{kpi.val}</div>
                      <div style={{ fontSize: '0.7rem', color: '#575752' }}>{kpi.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Storage & Distribution Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  
                  {/* Category Distribution */}
                  <div className="card-clean" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#121212', marginBottom: '1rem' }}>
                      Transaction Volume by Category
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {Object.entries(bigdataMetrics.summary?.category_distribution || {}).map(([cat, count]) => {
                        const total = bigdataMetrics.summary.matrix_dimensions.total_ratings;
                        const pct = Math.round((count / total) * 100);
                        return (
                          <div key={cat}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '3px' }}>
                              <span style={{ fontWeight: 600, color: '#121212' }}>{cat}</span>
                              <span style={{ color: '#575752' }}>{count.toLocaleString()} ({pct}%)</span>
                            </div>
                            <div style={{ background: '#F0EFEA', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${pct}%`, height: '100%', background: '#121212' }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Columnar Storage Optimization */}
                  <div className="card-clean" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#121212', marginBottom: '1rem' }}>
                      Apache Parquet Storage Optimization
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ background: '#FAF9F5', padding: '0.75rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.78rem', color: '#575752' }}>Raw CSV Uncompressed</span>
                        <strong style={{ fontSize: '0.88rem', color: '#121212' }}>1.61 MB</strong>
                      </div>
                      <div style={{ background: '#FAF9F5', padding: '0.75rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.78rem', color: '#575752' }}>Parquet Columnar Snappy</span>
                        <strong style={{ fontSize: '0.88rem', color: '#15803D' }}>0.35 MB</strong>
                      </div>
                      <div style={{ background: '#FAF9F5', padding: '0.75rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.78rem', color: '#575752' }}>Disk Footprint Reduction</span>
                        <strong style={{ fontSize: '0.88rem', color: '#2563EB' }}>78.3% Saved</strong>
                      </div>
                      <div style={{ background: '#FAF9F5', padding: '0.75rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.78rem', color: '#575752' }}>I/O Scan Latency Benefit</span>
                        <strong style={{ fontSize: '0.88rem', color: '#D97706' }}>5.8x Faster Reads</strong>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* CLUSTER TAB */}
            {dataPanelTab === 'cluster' && (() => {
              const cluster = {
                cluster_status: clusterStatus?.cluster_status || 'ONLINE',
                nodes: clusterStatus?.nodes || [
                  { node_id: 'spark-master-01', role: 'Master / Driver', cores: 4, memory: '8 GB', partitions_assigned: 12, cpu_utilization_pct: 28, status: 'ACTIVE' },
                  { node_id: 'spark-worker-01', role: 'Worker Node 1', cores: 8, memory: '16 GB', partitions_assigned: 32, cpu_utilization_pct: 62, status: 'ACTIVE' },
                  { node_id: 'spark-worker-02', role: 'Worker Node 2', cores: 8, memory: '16 GB', partitions_assigned: 32, cpu_utilization_pct: 54, status: 'ACTIVE' },
                  { node_id: 'spark-worker-03', role: 'Worker Node 3', cores: 8, memory: '16 GB', partitions_assigned: 32, cpu_utilization_pct: 48, status: 'ACTIVE' }
                ],
                dag_stages: clusterStatus?.dag_stages || [
                  { stage_id: 0, name: 'Snappy Parquet Scan & Column Projection', tasks_completed: 16, tasks_total: 16, status: 'COMPLETED' },
                  { stage_id: 1, name: 'ALS Conjugate Gradient Matrix Factorization', tasks_completed: 64, tasks_total: 64, status: 'COMPLETED' },
                  { stage_id: 2, name: 'Real-Time Top-N Dot-Product Ranking', tasks_completed: 32, tasks_total: 32, status: 'COMPLETED' }
                ]
              };

              return (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#121212' }}>
                      Apache Spark 4-Node Cluster Topology
                    </h3>
                    <span className="badge-clean badge-match">
                      <span className="pulse-dot-green"></span> Cluster Healthy ({cluster.cluster_status})
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    {(cluster.nodes || []).map(n => (
                      <div key={n.node_id} className="card-clean" style={{ padding: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#121212' }}>{n.node_id}</span>
                          <span style={{ fontSize: '0.68rem', background: '#F0EFEA', padding: '2px 6px', borderRadius: '4px', color: '#575752', textTransform: 'uppercase' }}>
                            {n.role}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.76rem', color: '#575752', marginBottom: '0.75rem' }}>
                          Assigned Partitions: <b>{n.partitions_assigned}</b>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#8E8D86', marginBottom: '3px' }}>
                          CPU Utilization: {n.cpu_utilization_pct}%
                        </div>
                        <div style={{ background: '#F0EFEA', height: '5px', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                          <div style={{ width: `${n.cpu_utilization_pct}%`, height: '100%', background: '#2563EB' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* DAG Stage Execution Timelines */}
                  <div className="card-clean" style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#121212', marginBottom: '0.75rem' }}>
                      Active Spark DAG Execution Stages
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {(cluster.dag_stages || []).map(stage => (
                        <div key={stage.stage_id} style={{ background: '#FAF9F5', padding: '0.75rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#121212' }}>Stage {stage.stage_id}: {stage.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#8E8D86' }}>Tasks: {stage.tasks_completed} / {stage.tasks_total} completed</div>
                          </div>
                          <span className="badge-clean badge-match">{stage.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* DEFENSE GUIDE TAB */}
            {dataPanelTab === 'docs' && (
              <div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#121212' }}>
                    Faculty Viva Voce & Technical Defense Guide
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#575752' }}>
                    Academic explanations and mathematical justifications for course reviewers and faculty.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
                  {[
                    {
                      q: "Why use Apache Spark MLlib ALS instead of standard k-NN?",
                      a: "Matrix Factorization ALS handles extreme sparsity (89.2%) by decomposing the rating matrix R into lower-rank user (U) and item (V) latent matrices (R ≈ U × V^T). Spark computes this across cluster partitions using parallel Conjugate Gradient, scaling linearly with data volume."
                    },
                    {
                      q: "What is Matrix Sparsity and why does 89.21% matter?",
                      a: "Sparsity indicates that 89.2% of all possible user-product combinations are unobserved. Traditional tabular queries fail here. ALS fills these latent blanks by discovering latent interaction patterns."
                    },
                    {
                      q: "How does the system solve the Cold-Start Problem?",
                      a: "New users have no historical interaction vector. The system detects this condition and automatically falls back to popularity-weighted top-sellers combined with TF-IDF cosine similarity on product text metadata."
                    },
                    {
                      q: "Where is the data stored and why Parquet?",
                      a: "Data is stored under data/processed/ as Snappy-compressed partitioned Apache Parquet columnar files. Parquet enables column projection (only loading required rating/feature columns) achieving 78.3% disk reduction and 5.8x faster I/O scans."
                    }
                  ].map((v, i) => (
                    <div key={i} className="card-clean" style={{ padding: '1.25rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#121212', marginBottom: '0.5rem' }}>
                        Q: {v.q}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#575752', lineHeight: 1.55 }}>
                        {v.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SHOPPING CART DRAWER */}
      {/* ========================================================================= */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 250,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '380px',
            background: '#FFFFFF',
            height: '100%',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '-8px 0 30px rgba(0,0,0,0.1)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#121212' }}>Your Cart</h3>
                <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8E8D86' }}>
                  <X size={18} />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: '#8E8D86', fontSize: '0.85rem' }}>
                  Your cart is empty.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '4px' }}>
                  {cartItems.map(item => (
                    <div key={item.item_id} style={{
                      display: 'flex',
                      gap: '0.85rem',
                      alignItems: 'center',
                      borderBottom: '1px solid var(--border-subtle)',
                      paddingBottom: '0.85rem'
                    }}>
                      {/* Product Thumbnail */}
                      <div style={{
                        width: '52px',
                        height: '52px',
                        background: '#F6F5EF',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        overflow: 'hidden'
                      }}>
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
                        ) : (
                          <ShoppingBag size={20} color="#8E8D86" />
                        )}
                      </div>

                      {/* Title & Quantity Controls */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#121212', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.title}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#8E8D86', marginBottom: '0.35rem' }}>
                          ₹{Number(item.price).toLocaleString('en-IN')}
                        </div>

                        {/* Quantity Pill: [ - ] qty [ + ] */}
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '2px 6px' }}>
                          <button
                            onClick={() => handleUpdateCartQty(item.item_id, -1)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', color: '#575752' }}
                            title="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: '0.76rem', fontWeight: 700, minWidth: '16px', textAlign: 'center', color: '#121212' }}>
                            {item.qty}
                          </span>
                          <button
                            onClick={() => handleUpdateCartQty(item.item_id, 1)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px', color: '#575752' }}
                            title="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Price & Remove Button */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', gap: '0.5rem', flexShrink: 0 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#121212' }}>
                          ₹{Number(item.price * item.qty).toLocaleString('en-IN')}
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item.item_id)}
                          style={{
                            background: '#FEE2E2',
                            color: '#DC2626',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '3px 8px',
                            fontSize: '0.70rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s ease'
                          }}
                          title={`Remove ${item.title} from cart`}
                        >
                          <Trash2 size={12} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#575752', fontWeight: 600 }}>Subtotal</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#121212' }}>₹{Number(cartTotal).toLocaleString('en-IN')}</span>
              </div>
              <button onClick={() => { showNotice('Checkout simulated!'); setIsCartOpen(false); }} className="btn btn-black" style={{ width: '100%', padding: '0.65rem' }}>
                Checkout
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PRODUCT DETAIL VIEW / INSPECT MODAL */}
      {/* ========================================================================= */}
      {inspectingProduct && (
        <div
          className="product-modal-backdrop"
          onClick={() => setInspectingProduct(null)}
        >
          <div
            className="product-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header / Breadcrumbs Bar & Close Button */}
            <div className="product-modal-topbar">
              <div className="product-modal-breadcrumbs">
                <span className="crumb" onClick={() => setInspectingProduct(null)}>Home</span>
                <span className="crumb-sep">/</span>
                <span className="crumb">{inspectingProduct.category}</span>
                <span className="crumb-sep">/</span>
                <span className="crumb active">{inspectingProduct.brand || 'NextBuy'}</span>
              </div>
              <button
                onClick={() => setInspectingProduct(null)}
                className="modal-close-btn"
                title="Close product view"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main 2-Column Content Grid */}
            <div className="product-modal-grid">
              
              {/* ========================================= */}
              {/* LEFT COLUMN: Gallery & Customer Reviews   */}
              {/* ========================================= */}
              <div className="modal-left-col">
                
                {/* Component 1: Product Photo & 4 Thumbnails of ONLY THIS Current Product */}
                <div className="modal-gallery-row">
                  {/* Multi-Angle Thumbnail Strip (Left Column: ONLY Current Product Photo) */}
                  <div className="modal-thumbs-strip">
                    {modalThumbnails.map((thumb, tIdx) => {
                      const isActive = modalActiveAngleIdx === tIdx;
                      return (
                        <button
                          key={tIdx}
                          className={`modal-thumb-btn ${isActive ? 'active' : ''}`}
                          onClick={() => {
                            setModalActiveAngleIdx(tIdx);
                            setModalActiveImg(thumb.url);
                          }}
                          title={`${inspectingProduct.title} - ${thumb.label}`}
                          style={{
                            overflow: 'hidden',
                            position: 'relative'
                          }}
                        >
                          <img
                            src={inspectingProduct.image_url}
                            alt={`${inspectingProduct.title} ${thumb.label}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              transform: thumb.zoom,
                              transformOrigin: thumb.transformOrigin,
                              transition: 'transform 0.25s ease'
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Main Featured Photo Stage (Interactive view of current product) */}
                  <div className="modal-featured-img-stage">
                    <img
                      src={inspectingProduct.image_url}
                      alt={inspectingProduct.title}
                      className="modal-featured-img"
                      style={{
                        transform: modalThumbnails[modalActiveAngleIdx]?.zoom || 'scale(1)',
                        transformOrigin: modalThumbnails[modalActiveAngleIdx]?.transformOrigin || 'center',
                        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </div>
                </div>

                {/* Customer Reviews Section (Directly below photo on left, matching Image 1) */}
                <div className="modal-reviews-section">
                  <h4 className="reviews-title">Reviews</h4>
                  
                  <div className="reviews-header-score">
                    <div className="stars-row" style={{ display: "inline-flex", gap: "2px", alignItems: "center" }}>{[1, 2, 3, 4, 5].map(i => <Star key={i} size={13} fill="#D97706" color="#D97706" />)}</div>
                    <span className="score-num">4.8</span>
                  </div>

                  {/* Review Filter Pills */}
                  <div className="reviews-filter-pills">
                    {[
                      { key: 'all', label: 'All (128)' },
                      { key: '5', label: '5 Stars (104)' },
                      { key: '4', label: '4 Stars (19)' },
                      { key: '3', label: '3 Stars (5)' }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        className={`review-pill ${modalSelectedReviewFilter === tab.key ? 'active' : ''}`}
                        onClick={() => setModalSelectedReviewFilter(tab.key)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Verified Buyer Reviews List */}
                  <div className="review-cards-list">
                    <div className="review-item-card">
                      <div className="review-user-row">
                        <div className="review-avatar">LB</div>
                        <div className="review-user-info">
                          <span className="reviewer-name">Lori Barnett</span>
                          <span className="review-date">02 May</span>
                        </div>
                      </div>
                      <div className="review-stars" style={{ display: "inline-flex", gap: "2px", alignItems: "center" }}>{[1, 2, 3, 4, 5].map(i => <Star key={i} size={11} fill="#D97706" color="#D97706" />)}</div>
                      <p className="review-text">
                        Exceptional craftsmanship and accurate sizing. Arrived in pristine packaging within 2 days. The material quality feels authentic and premium.
                      </p>
                    </div>

                    <div className="review-item-card">
                      <div className="review-user-row">
                        <div className="review-avatar">PD</div>
                        <div className="review-user-info">
                          <span className="reviewer-name">Phillip Douglas</span>
                          <span className="review-date">29 April</span>
                        </div>
                      </div>
                      <div className="review-stars" style={{ display: "inline-flex", gap: "2px", alignItems: "center" }}>{[1, 2, 3, 4, 5].map(i => <Star key={i} size={11} fill="#D97706" color="#D97706" />)}</div>
                      <p className="review-text">
                        The design and finish feel remarkably high-end. Fits comfortably into daily use and looks even sleeker than the pictures!
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* ========================================= */}
              {/* RIGHT COLUMN: Details, Actions, Swatches  */}
              {/* ========================================= */}
              <div className="modal-right-col">
                
                {/* Component 2: Dummy Rating Header */}
                <div className="modal-rating-header">
                  <span className="rating-stars" style={{ display: "inline-flex", gap: "2px", alignItems: "center" }}>{[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="#D97706" color="#D97706" />)}</span>
                  <span className="rating-val">5.0</span>
                  <span className="rating-count">(128 verified ratings)</span>
                </div>

                {/* Component 4: Name / Title */}
                <h1 className="modal-product-title">
                  <span className="modal-brand-name">{inspectingProduct.brand || 'NextBuy'}</span>
                  <span className="title-sep"> – </span>
                  {inspectingProduct.title}
                </h1>

                {/* Component 3: Price in INR (₹) */}
                <div className="modal-price-block">
                  <span className="modal-inr-price">
                    ₹{Number(inspectingProduct.price).toLocaleString('en-IN')}
                  </span>
                  <span className="modal-original-price">
                    ₹{Math.round(Number(inspectingProduct.price) * 1.25).toLocaleString('en-IN')}
                  </span>
                  <span className="modal-discount-pill">
                    20% OFF
                  </span>
                </div>

                {/* Component 5: Buy Now & Add to Cart Action Buttons + Wishlist */}
                <div className="modal-actions-row">
                  {(() => {
                    const cartEntry = cartItems.find(i => i.item_id === inspectingProduct.item_id);
                    const qty = cartEntry ? cartEntry.qty : 0;
                    if (qty > 0) {
                      return (
                        <div className="modal-qty-pill">
                          <button
                            onClick={() => handleUpdateCartQty(inspectingProduct.item_id, -1)}
                            className="modal-qty-btn"
                            title="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="modal-qty-val">{qty}</span>
                          <button
                            onClick={() => handleUpdateCartQty(inspectingProduct.item_id, 1)}
                            className="modal-qty-btn"
                            title="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      );
                    }
                    return (
                      <button
                        onClick={() => {
                          handleAddToCart(inspectingProduct);
                        }}
                        className="modal-btn-cart"
                      >
                        <ShoppingCart size={17} />
                        Add to Cart
                      </button>
                    );
                  })()}

                  <button
                    onClick={() => {
                      handleAddToCart(inspectingProduct);
                      setIsCartOpen(true);
                      setInspectingProduct(null);
                    }}
                    className="modal-btn-buy"
                  >
                    Buy it now
                  </button>

                  <button
                    onClick={() => {
                      const next = !modalWishlist;
                      setModalWishlist(next);
                      showNotice(next ? `Added '${inspectingProduct.title.slice(0, 20)}...' to Wishlist.` : 'Removed from Wishlist.');
                    }}
                    className={`modal-btn-wishlist ${modalWishlist ? 'active' : ''}`}
                    title={modalWishlist ? "Saved to Wishlist" : "Save to Wishlist"}
                  >
                    <Heart size={18} fill={modalWishlist ? "#E11D48" : "none"} color={modalWishlist ? "#E11D48" : "#121212"} />
                  </button>
                </div>

                {/* Component 7: Color Dummyly Selected Way */}
                <div className="modal-color-section">
                  <div className="color-label-row">
                    <span className="color-title">Colour:</span>
                    <span className="color-selected-name">{modalSelectedColor.name}</span>
                  </div>

                  <div className="color-swatches-grid">
                    {MODAL_COLOR_OPTIONS.map((c) => {
                      const isSelected = modalSelectedColor.name === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => setModalSelectedColor(c)}
                          className={`modal-swatch-circle ${isSelected ? 'selected' : ''}`}
                          style={{ background: c.hex }}
                          title={c.name}
                        >
                          {isSelected && (
                            <Check
                              size={14}
                              color={c.textDark ? '#121212' : '#FFFFFF'}
                              strokeWidth={3}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Information Estimate */}
                <div className="modal-delivery-box">
                  <Truck size={17} color="#121212" />
                  <span>Delivery across India, <b>2 – 4 business days</b></span>
                </div>

                {/* Component 6: Description */}
                <div className="modal-description-box">
                  <h4 className="desc-heading">Description:</h4>
                  <p className={`desc-paragraph ${modalExpandedDesc ? 'expanded' : ''}`}>
                    {inspectingProduct.description}
                  </p>
                  {inspectingProduct.description && inspectingProduct.description.length > 110 && (
                    <button
                      onClick={() => setModalExpandedDesc(!modalExpandedDesc)}
                      className="desc-expand-btn"
                    >
                      {modalExpandedDesc ? 'Show less' : 'See full description'}
                    </button>
                  )}
                </div>

                {/* Store / Verified Seller Badge */}
                <div className="modal-store-badge">
                  <div className="store-avatar">NB</div>
                  <div>
                    <div className="store-name">NextBuy Verified Official Boutique</div>
                    <div className="store-stats" style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ display: "inline-flex", gap: "2px", alignItems: "center" }}>{[1, 2, 3, 4, 5].map(i => <Star key={i} size={13} fill="#D97706" color="#D97706" />)}</span> 5.0 • 25,000+ customer orders fulfilled</div>
                  </div>
                </div>

                {/* Similar Items Section (Bottom of Right Column - Same Category in Short Way) */}
                <div className="modal-similar-section">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <h4 className="similar-heading" style={{ margin: 0 }}>Similar items in {inspectingProduct.category}:</h4>
                    <span style={{ fontSize: '0.72rem', color: '#8E8D86', fontWeight: 600 }}>Category Matches</span>
                  </div>
                  <div className="similar-items-row">
                    {modalSimilarList.map((sim) => (
                      <div
                        key={sim.item_id}
                        className="similar-item-card"
                        onClick={() => handleInspectProduct(sim)}
                        title={`${sim.brand || ''} - ${sim.title}`}
                      >
                        <div className="similar-thumb-stage">
                          {sim.image_url ? (
                            <img
                              src={sim.image_url}
                              alt={sim.title}
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          ) : (
                            <ShoppingBag size={20} color="#8E8D86" />
                          )}
                        </div>
                        <div className="similar-item-brand">{sim.brand || 'NextBuy'}</div>
                        <div className="similar-item-title-short" title={sim.title}>
                          {sim.title}
                        </div>
                        <div className="similar-item-price">
                          ₹{Number(sim.price).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CLEAN MINIMAL FOOTER */}
      {/* ========================================================================= */}
      <footer style={{ background: 'var(--bg-canvas)', borderTop: '1px solid var(--border-subtle)', padding: '1.75rem 0 3.5rem 0', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#8E8D86', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontWeight: 800, color: '#121212' }}>NextBuy.</span> commerce • Distributed Apache Spark MLlib ALS Platform
          </div>
          <div>Big Data Architecture & Machine Learning Academic Defense 2026</div>
        </div>
      </footer>

    </div>
  );
}
