"""
NextBuy PostgreSQL Database Manager
Provides connection helpers, transactional writes, and queries
for unified user authentication, catalog storage, search tracking,
and explainable recommendation logic logs.
"""

import os
import sys
import psycopg2
from psycopg2.extras import RealDictCursor
from pathlib import Path
from typing import Optional, Dict, Any, List

root_dir = Path(__file__).resolve().parent.parent

DB_CONFIG = {
    "host": os.getenv("POSTGRES_HOST", "localhost"),
    "port": int(os.getenv("POSTGRES_PORT", 5432)),
    "user": os.getenv("POSTGRES_USER", "postgres"),
    "password": os.getenv("POSTGRES_PASSWORD", "#Dhruv_005"),
    "database": os.getenv("POSTGRES_DB", "nextbuy_db"),
}

def get_connection():
    """Returns an active PostgreSQL connection with auto-commit."""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        conn.autocommit = True
        return conn
    except Exception as e:
        print(f"[DB ERROR] Connection failed: {e}")
        return None

import hashlib

def hash_password(password: str) -> str:
    """Returns SHA-256 hash of password."""
    return hashlib.sha256(password.strip().encode("utf-8")).hexdigest()

def register_user(first_name: str, last_name: str, email: str, password: str) -> Dict[str, Any]:
    """
    Registers a new user in PostgreSQL with First Name, Last Name, Email, and Password.
    Generates a unique user_id Primary Key.
    """
    fn = (first_name or "").strip()
    ln = (last_name or "").strip()
    clean_email = (email or "").strip().lower()
    clean_pwd = (password or "").strip()
    full_name = f"{fn} {ln}".strip() or clean_email.split("@")[0]

    conn = get_connection()
    if not conn:
        return {
            "status": "error",
            "message": "Database service unavailable. Please ensure PostgreSQL is running."
        }

    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)

        # 1. Check if email already registered
        cur.execute("SELECT user_id, email FROM users WHERE LOWER(email) = %s LIMIT 1;", (clean_email,))
        if cur.fetchone():
            return {
                "status": "error",
                "message": f"An account with email '{clean_email}' already exists. Please sign in."
            }

        # 2. Ensure username uniqueness
        cur.execute("SELECT user_id FROM users WHERE username = %s LIMIT 1;", (full_name,))
        if cur.fetchone():
            import random
            full_name = f"{full_name}_{random.randint(100, 999)}"

        pwd_hash = hash_password(clean_pwd) if clean_pwd else ""

        # 3. Insert new user record
        cur.execute(
            """
            INSERT INTO users (username, first_name, last_name, email, password_hash, created_at, last_active)
            VALUES (%s, %s, %s, %s, %s, NOW(), NOW())
            RETURNING user_id, username, first_name, last_name, email;
            """,
            (full_name, fn, ln, clean_email, pwd_hash)
        )
        new_row = cur.fetchone()
        return {
            "status": "success",
            "message": "Account created successfully in PostgreSQL!",
            "user": dict(new_row)
        }
    except Exception as e:
        print(f"[DB ERROR in register_user]: {e}")
        return {
            "status": "error",
            "message": f"Registration failed: {str(e)}"
        }
    finally:
        conn.close()

def authenticate_user(email_or_user: str, password: str) -> Dict[str, Any]:
    """
    Authenticates a user via email (or username) and password against PostgreSQL.
    """
    ident = (email_or_user or "").strip()
    clean_pwd = (password or "").strip()

    conn = get_connection()
    if not conn:
        return {
            "status": "error",
            "message": "Database service unavailable."
        }

    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(
            """
            SELECT user_id, username, first_name, last_name, email, password_hash
            FROM users
            WHERE LOWER(email) = %s OR LOWER(username) = %s
            LIMIT 1;
            """,
            (ident.lower(), ident.lower())
        )
        row = cur.fetchone()
        if not row:
            return {
                "status": "error",
                "message": "No account found matching this email or username."
            }

        stored_hash = row.get("password_hash")
        # If password hash exists, verify it (also supports plain password match if seeded without hash)
        if stored_hash:
            if hash_password(clean_pwd) != stored_hash and clean_pwd != stored_hash:
                return {
                    "status": "error",
                    "message": "Incorrect password. Please verify your credentials."
                }

        # Update last_active
        cur.execute("UPDATE users SET last_active = NOW() WHERE user_id = %s;", (row["user_id"],))

        u_data = dict(row)
        u_data.pop("password_hash", None)
        return {
            "status": "success",
            "user": u_data
        }
    except Exception as e:
        print(f"[DB ERROR in authenticate_user]: {e}")
        return {
            "status": "error",
            "message": f"Authentication error: {str(e)}"
        }
    finally:
        conn.close()

def get_or_create_user(username: str, email: Optional[str] = None) -> Dict[str, Any]:
    """
    Registers a new user or retrieves existing user by username.
    Updates last_active timestamp.
    """
    clean_username = username.strip() or "Guest Customer"
    clean_email = email.strip() if email else f"{clean_username.lower().replace(' ', '.')}@nextbuy.internal"

    conn = get_connection()
    if not conn:
        # Fallback offline mode if PG service is unreachable
        return {
            "user_id": 105,
            "username": clean_username,
            "email": clean_email,
            "source": "memory_fallback"
        }

    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        # Check if user exists
        cur.execute("SELECT user_id, username, email FROM users WHERE username = %s LIMIT 1;", (clean_username,))
        row = cur.fetchone()

        if row:
            cur.execute("UPDATE users SET last_active = NOW() WHERE user_id = %s;", (row["user_id"],))
            user_data = dict(row)
            user_data["source"] = "postgres"
            return user_data

        # Insert new user
        cur.execute(
            """
            INSERT INTO users (username, email, created_at, last_active)
            VALUES (%s, %s, NOW(), NOW())
            RETURNING user_id, username, email;
            """,
            (clean_username, clean_email)
        )
        new_row = cur.fetchone()
        user_data = dict(new_row)
        user_data["source"] = "postgres_new"
        return user_data

    except Exception as e:
        print(f"[DB ERROR in get_or_create_user]: {e}")
        return {
            "user_id": 9999,
            "username": clean_username,
            "email": clean_email,
            "source": "error_fallback"
        }
    finally:
        conn.close()

def log_search(user_id: int, query: str, category: str = "All Categories", matched_count: int = 0):
    """Logs a user search query in PostgreSQL to show parallel searching history."""
    if not query or not query.strip():
        return
    conn = get_connection()
    if not conn:
        return
    try:
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO user_searches (user_id, search_query, category_filter, matched_count, timestamp)
            VALUES (%s, %s, %s, %s, NOW());
            """,
            (user_id, query.strip(), category, matched_count)
        )
    except Exception as e:
        print(f"[DB ERROR in log_search]: {e}")
    finally:
        conn.close()

def log_interaction(user_id: int, product_id: int, event_type: str, rating_val: float = 0.0, als_weight: float = 1.0):
    """Records clickstream, views, cart additions, or ratings into PostgreSQL."""
    conn = get_connection()
    if not conn:
        return
    try:
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO user_interactions (user_id, product_id, event_type, rating_value, als_weight, timestamp)
            VALUES (%s, %s, %s, %s, %s, NOW());
            """,
            (user_id, product_id, event_type, rating_val, als_weight)
        )
    except Exception as e:
        print(f"[DB ERROR in log_interaction]: {e}")
    finally:
        conn.close()

def log_recommendation_logic(user_id: int, product_id: int, match_pct: int, als_score: float, explanation: str, breakdown: Optional[dict] = None):
    """Stores the explainable logic calculation behind why this product was recommended."""
    conn = get_connection()
    if not conn:
        return
    try:
        import json
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO recommendation_logic_logs (user_id, product_id, match_percentage, als_score, logic_explanation, algorithm_breakdown, timestamp)
            VALUES (%s, %s, %s, %s, %s, %s, NOW());
            """,
            (user_id, product_id, match_pct, als_score, explanation, json.dumps(breakdown or {}))
        )
    except Exception as e:
        print(f"[DB ERROR in log_recommendation_logic]: {e}")
    finally:
        conn.close()

def get_user_data_panel_analytics(user_id: int) -> Dict[str, Any]:
    """
    Retrieves full personal Data Panel telemetry for the user:
    - Recent parallel search queries
    - Interaction stream history
    - Detailed mathematical recommendation logic calculations
    """
    conn = get_connection()
    if not conn:
        return {
            "searches": [],
            "interactions": [],
            "recommendation_logics": [],
            "source": "unreachable"
        }
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)

        # 1. Searches
        cur.execute(
            """
            SELECT search_id, search_query, category_filter, matched_count,
                   to_char(timestamp, 'HH24:MI:SS') as time_str
            FROM user_searches
            WHERE user_id = %s
            ORDER BY timestamp DESC
            LIMIT 15;
            """,
            (user_id,)
        )
        searches = [dict(r) for r in cur.fetchall()]

        # 2. Interactions
        cur.execute(
            """
            SELECT i.interaction_id, i.event_type, i.rating_value, i.als_weight,
                   to_char(i.timestamp, 'HH24:MI:SS') as time_str,
                   p.title, p.category, p.brand, p.price
            FROM user_interactions i
            JOIN products p ON i.product_id = p.product_id
            WHERE i.user_id = %s
            ORDER BY i.timestamp DESC
            LIMIT 20;
            """,
            (user_id,)
        )
        interactions = [dict(r) for r in cur.fetchall()]

        # 3. Recommendation logic calculations
        cur.execute(
            """
            SELECT l.log_id, l.match_percentage, l.als_score, l.logic_explanation,
                   to_char(l.timestamp, 'HH24:MI:SS') as time_str,
                   p.title, p.category, p.brand, p.price
            FROM recommendation_logic_logs l
            JOIN products p ON l.product_id = p.product_id
            WHERE l.user_id = %s
            ORDER BY l.timestamp DESC
            LIMIT 10;
            """,
            (user_id,)
        )
        logics = [dict(r) for r in cur.fetchall()]

        return {
            "searches": searches,
            "interactions": interactions,
            "recommendation_logics": logics,
            "source": "postgres"
        }

    except Exception as e:
        print(f"[DB ERROR in get_user_data_panel_analytics]: {e}")
        return {"searches": [], "interactions": [], "recommendation_logics": [], "error": str(e)}
    finally:
        conn.close()
