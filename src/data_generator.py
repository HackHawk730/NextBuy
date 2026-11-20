"""
E-Commerce Big Data Generator
Generates realistic, large-scale synthetic Amazon-style interaction datasets.
Includes realistic power-law user behavior, category affinity, timestamps, and product catalogs.
"""

import os
import sys
import json
import random
import argparse
from datetime import datetime, timedelta
from pathlib import Path
import pandas as pd
import numpy as np

# Ensure UTF-8 output on Windows terminals
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if sys.stderr and hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# Set random seed for reproducibility
random.seed(42)
np.random.seed(42)

CATEGORIES = {
    "Audio & Headphones": [
        ("Sony WH-1000XM5 Wireless Noise-Canceling Headphones", 398.00, "Sony", "Industry leading noise canceling with 30-hour battery life and crystal clear calling."),
        ("Bose QuietComfort 45 Bluetooth Headphones", 329.00, "Bose", "Iconic quiet comfort and acoustic noise cancelling technology."),
        ("Apple AirPods Pro (2nd Gen) with MagSafe", 249.00, "Apple", "Active Noise Cancellation up to 2x more with Adaptive Transparency and Personalized Spatial Audio."),
        ("Sennheiser Momentum 4 Wireless", 349.95, "Sennheiser", "Audiophile-inspired sound with 60 hours playback and lightweight design."),
        ("JBL Flip 6 Portable Bluetooth Speaker", 129.95, "JBL", "Bold sound for every adventure, IP67 waterproof and dustproof."),
        ("Anker Soundcore Space Q45 ANC Headphones", 149.99, "Anker", "Adaptive noise cancelling reducing noise by up to 98% with ultra long 50H playtime."),
        ("Sony WF-1000XM5 Truly Wireless Earbuds", 299.99, "Sony", "The best noise canceling earbuds with high resolution audio and dual processor chips."),
        ("Marshall Stanmore III Bluetooth Speaker", 379.99, "Marshall", "Legendary home speaker with wide stereo soundstage and dynamic loudness."),
        ("Audio-Technica ATH-M50x Professional Studio Headphones", 149.00, "Audio-Technica", "Critically acclaimed sonic performance praised by top audio engineers."),
        ("Shure SM7B Vocal Dynamic Microphone", 399.00, "Shure", "Broadcast dynamic microphone with smooth, flat wide-range frequency response.")
    ],
    "Laptops & Computers": [
        ("Apple MacBook Air 15-inch M3 Chip (16GB RAM, 512GB SSD)", 1499.00, "Apple", "Strikely thin design with phenomenal battery life and liquid retina display."),
        ("Dell XPS 15 9530 OLED Touchscreen Laptop", 1899.00, "Dell", "Intel Core i7 13th Gen, 32GB RAM, RTX 4060 graphics with stunning 3.5K OLED."),
        ("ASUS ROG Zephyrus G14 Gaming Laptop", 1599.99, "ASUS", "AMD Ryzen 9, 16GB DDR5, GeForce RTX 4060 with ROG Nebula display."),
        ("Lenovo ThinkPad X1 Carbon Gen 11", 1729.00, "Lenovo", "Ultra-light business laptop with Intel Evo platform and legendary keyboard."),
        ("HP Spectre x360 2-in-1 14-inch Touch Laptop", 1399.99, "HP", "Intel Core Ultra 7 with AI boost and flexible 360 hinge."),
        ("LG Gram 17 Super-Lightweight Laptop", 1299.00, "LG", "Massive 17-inch IPS display weighing under 3 lbs with 80Wh battery."),
        ("Acer Predator Helios 16 Gaming Laptop", 1649.99, "Acer", "13th Gen Intel Core i7 with NVIDIA GeForce RTX 4070 and dual Aeroblade fans."),
        ("Apple Mac Mini M2 Pro Desktop", 1299.00, "Apple", "Pro performance in a compact desktop with up to 12-core CPU and 19-core GPU."),
        ("Microsoft Surface Laptop 5 13.5-inch", 999.99, "Microsoft", "Sleek and portable touchscreen laptop with fast multitasking and Thunderbolt 4."),
        ("Samsung Galaxy Book4 Ultra 16-inch", 2399.99, "Samsung", "Dynamic AMOLED 2X touchscreen with Intel Core Ultra 9 and RTX 4070.")
    ],
    "Smartphones & Tablets": [
        ("Apple iPhone 15 Pro Max (256GB)", 1199.00, "Apple", "Titanium design, A17 Pro gaming chip, Action button, and 5x Telephoto camera."),
        ("Samsung Galaxy S24 Ultra (512GB)", 1299.99, "Samsung", "Galaxy AI suite, integrated S-Pen, Titanium armor, and 200MP camera sensor."),
        ("Google Pixel 8 Pro with Gemini AI", 999.00, "Google", "Google Tensor G3 chip, best-in-class computational photography, and 7 years of OS updates."),
        ("Apple iPad Pro 11-inch M4 Ultra Retina OLED", 999.00, "Apple", "Breakthrough thin design with ultra-fast M4 silicon and tandem OLED display."),
        ("Samsung Galaxy Tab S9 Ultra 14.6-inch", 1199.99, "Samsung", "Dynamic AMOLED 2X with S-Pen included and IP68 water resistance."),
        ("OnePlus 12 5G (16GB RAM, 512GB)", 799.99, "OnePlus", "Snapdragon 8 Gen 3 with Hasselblad 4th Gen camera and 80W SuperVOOC charge."),
        ("Apple iPad Air 13-inch M2", 799.00, "Apple", "Supercharged by M2 with all-day battery life and Liquid Retina display."),
        ("Google Pixel Tablet with Speaker Dock", 499.00, "Google", "Hub mode speaker dock transforms your tablet into a smart home command station."),
        ("Sony Xperia 1 VI Professional Smartphone", 1399.00, "Sony", "Exmor T for mobile sensor with continuous optical zoom telephoto lens."),
        ("Motorola Razr Plus Foldable Smartphone", 999.99, "Motorola", "Largest external display on a flip phone with Snapdragon 8+ Gen 1.")
    ],
    "Wearables & Fitness": [
        ("Apple Watch Ultra 2 (GPS + Cellular)", 799.00, "Apple", "Rugged 49mm titanium case, precision dual-frequency GPS, and up to 72 hours battery."),
        ("Garmin Fenix 7X Pro Solar Multisport GPS Watch", 899.99, "Garmin", "Solar powered sapphire lens with built-in LED flashlight and endurance tracking."),
        ("Samsung Galaxy Watch 6 Classic", 399.99, "Samsung", "Iconic rotating bezel with sleep coaching and ECG heart rate monitoring."),
        ("Whoop 4.0 Fitness and Recovery Tracker", 239.00, "Whoop", "Continuous physiological monitoring tracking strain, recovery, and sleep stages."),
        ("Oura Ring Gen 3 Horizon Smart Ring", 349.00, "Oura", "Sleek biometric titanium ring tracking readiness, sleep, and heart rate variability."),
        ("Fitbit Charge 6 Advanced Fitness Tracker", 159.95, "Fitbit", "Google apps built-in, EDA stress management, and daily readiness score."),
        ("Apple Watch Series 9 45mm", 429.00, "Apple", "S9 SiP chip with Double Tap gesture and on-device Siri processing."),
        ("Coros Pace 3 Lightweight GPS Running Watch", 229.00, "Coros", "Featherlight 30g running watch with accurate dual-frequency satellite tracking."),
        ("Garmin Forerunner 965 AMOLED Running Watch", 599.99, "Garmin", "Brilliant AMOLED touchscreen with premium training metrics and recovery insights."),
        ("Polar Vantage V3 Premium Multisport Watch", 599.95, "Polar", "Elixir biosensing technology with offline topo maps and dual-frequency GPS.")
    ],
    "Smart Home & IoT": [
        ("Amazon Echo Show 10 (3rd Gen) Smart Display", 249.99, "Amazon", "10.1-inch HD smart screen that automatically moves to stay in your line of sight."),
        ("Philips Hue White & Color Ambiance Starter Kit", 199.99, "Philips", "Smart lighting ecosystem with millions of vibrant colors and bridge hub."),
        ("Nest Learning Thermostat (3rd Generation)", 249.00, "Google", "Learns your favorite temperatures and programs itself to save energy."),
        ("Ring Video Doorbell Pro 2", 249.99, "Ring", "Head-to-Toe 1536p HD video with 3D Motion Detection and Bird's Eye View."),
        ("Roborock S8 Pro Ultra Robot Vacuum and Mop", 1599.99, "Roborock", "RockDock Ultra all-in-one dock with 6000Pa suction and VibraRise 2.0 mopping."),
        ("Sonos Era 300 Spatial Audio Smart Speaker", 449.00, "Sonos", "Revolutionary acoustic design featuring six drivers delivering Dolby Atmos sound."),
        ("Nanoleaf Shapes Hexagon RGB Smart Lights (7-Pack)", 199.99, "Nanoleaf", "Modular LED light panels with rhythm music visualizer and screen mirror."),
        ("August Wi-Fi Smart Deadbolt Lock (4th Gen)", 229.99, "August", "Keyless entry smart lock upgrading your existing deadbolt with remote access."),
        ("Ecobee SmartThermostat with Voice Control", 249.99, "Ecobee", "Smart sensor included with built-in Alexa and energy star certified savings."),
        ("Blink Outdoor 4 Wireless Smart Security Camera (3-Cam)", 269.99, "Blink", "Wire-free weather resistant camera with two-year battery life and night vision.")
    ],
    "Gaming & Accessories": [
        ("Sony PlayStation 5 Slim Console", 499.99, "Sony", "Ultra-high speed SSD, ray tracing, Tempest 3D AudioTech, and DualSense haptics."),
        ("Microsoft Xbox Series X 1TB Console", 499.99, "Microsoft", "12 teraflops of raw graphic processing power with 4K gaming at up to 120 FPS."),
        ("Nintendo Switch OLED Model Console", 349.99, "Nintendo", "7-inch OLED screen with wide adjustable stand, wired LAN port, and 64GB storage."),
        ("Logitech G Pro X Superlight 2 Wireless Mouse", 159.99, "Logitech", "Under 60 grams lightweight tournament-grade gaming mouse with Hero 2 sensor."),
        ("SteelSeries Apex Pro TKL Mechanical Gaming Keyboard", 189.99, "SteelSeries", "World's fastest OmniPoint 2.0 adjustable hypermagnetic switches with OLED display."),
        ("Elgato Stream Deck MK.2 15 LCD Keys", 149.99, "Elgato", "Studio controller with 15 customizable LCD keys for streaming, editing, and workflow."),
        ("Razer BlackShark V2 Pro Wireless Gaming Headset", 199.99, "Razer", "HyperClear super wideband mic with TriForce titanium 50mm sound drivers."),
        ("LG UltraGear 27-inch OLED Gaming Monitor 240Hz", 999.99, "LG", "QHD 0.03ms response time with NVIDIA G-Sync compatibility and HDR10."),
        ("ASUS ROG Swift 32-inch 4K OLED Gaming Monitor", 1299.00, "ASUS", "Stunning 4K resolution at 240Hz with custom heatsink and graphene film."),
        ("Corsair RM850x Fully Modular Power Supply 850W", 149.99, "Corsair", "80 PLUS Gold certified high efficiency with magnetic levitation fan.")
    ]
}

def generate_product_catalog(output_dir: Path) -> pd.DataFrame:
    """Generate structured product metadata table."""
    products = []
    item_id = 101

    for category, items in CATEGORIES.items():
        for title, price, brand, description in items:
            products.append({
                "item_id": item_id,
                "title": title,
                "category": category,
                "price": price,
                "brand": brand,
                "description": description,
                "tags": f"{brand.lower()} {category.lower()} {title.lower()}",
                "avg_rating": round(random.uniform(4.0, 4.9), 2),
                "created_at": "2024-01-01"
            })
            item_id += 1

    df_products = pd.DataFrame(products)
    output_dir.mkdir(parents=True, exist_ok=True)
    csv_path = output_dir / "products.csv"
    df_products.to_csv(csv_path, index=False)
    print(f"📦 Generated {len(df_products)} products catalog -> {csv_path}")
    return df_products

def generate_user_interactions(df_products: pd.DataFrame, num_users: int, min_ratings_per_user: int, max_ratings_per_user: int, output_dir: Path) -> pd.DataFrame:
    """
    Generate realistic user interaction ratings with Power-Law distribution and category affinities.
    Simulates real-world Big Data e-commerce behavior.
    """
    print(f"🔄 Simulating {num_users} users with category affinities and realistic ratings...")

    categories = list(CATEGORIES.keys())
    items_by_cat = {cat: df_products[df_products["category"] == cat]["item_id"].tolist() for cat in categories}
    all_item_ids = df_products["item_id"].tolist()

    interactions = []
    start_date = datetime(2025, 1, 1)

    # User persona affinities (e.g. Gamer likes Gaming & Audio, Techie likes Laptops & IoT)
    persona_types = [
        {"name": "Gamer", "fav_cats": ["Gaming & Accessories", "Audio & Headphones"]},
        {"name": "Tech Professional", "fav_cats": ["Laptops & Computers", "Smartphones & Tablets"]},
        {"name": "Fitness & Lifestyle", "fav_cats": ["Wearables & Fitness", "Audio & Headphones"]},
        {"name": "Smart Home Buff", "fav_cats": ["Smart Home & IoT", "Smartphones & Tablets"]},
        {"name": "General Techie", "fav_cats": categories}
    ]

    for user_id in range(1, num_users + 1):
        # Power-law: most users leave a few reviews, top 5% power-users leave many
        if random.random() < 0.05:
            num_ratings = random.randint(max_ratings_per_user // 2, max_ratings_per_user)
        else:
            num_ratings = random.randint(min_ratings_per_user, min_ratings_per_user + 5)

        persona = random.choice(persona_types)
        fav_cats = persona["fav_cats"]

        # 75% of purchases come from favored categories, 25% from random browsing
        rated_items = set()
        for _ in range(num_ratings):
            if random.random() < 0.75 and fav_cats:
                chosen_cat = random.choice(fav_cats)
                item_id = random.choice(items_by_cat[chosen_cat])
            else:
                item_id = random.choice(all_item_ids)

            if item_id in rated_items:
                continue
            rated_items.add(item_id)

            # Rating distribution biased positively as in Amazon reviews (4s and 5s are common)
            rating_weights = [0.05, 0.08, 0.15, 0.35, 0.37]  # for [1, 2, 3, 4, 5]
            rating = np.random.choice([1, 2, 3, 4, 5], p=rating_weights)

            # Timestamp within past 365 days
            days_offset = random.randint(0, 365)
            timestamp = int((start_date + timedelta(days=days_offset, hours=random.randint(0, 23))).timestamp())

            interactions.append({
                "user_id": user_id,
                "item_id": item_id,
                "rating": float(rating),
                "timestamp": timestamp
            })

    df_ratings = pd.DataFrame(interactions)

    # Save to CSV and Parquet
    csv_path = output_dir / "ratings.csv"
    parquet_path = output_dir / "ratings.parquet"
    
    df_ratings.to_csv(csv_path, index=False)
    df_ratings.to_parquet(parquet_path, index=False)

    sparsity = 1.0 - (len(df_ratings) / (num_users * len(df_products)))
    print(f"✅ Generated {len(df_ratings):,} user interaction ratings across {num_users:,} users.")
    print(f"📊 Matrix Sparsity: {sparsity * 100:.2f}% (Classic Big Data Sparse Matrix)")
    print(f"📁 Saved to:\n   - {csv_path}\n   - {parquet_path}")

    return df_ratings

def build_dataset(size="medium", base_dir=Path("data")):
    """Build datasets according to size presets."""
    raw_dir = base_dir / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)

    presets = {
        "small": {"users": 1000, "min_r": 3, "max_r": 15},
        "medium": {"users": 10000, "min_r": 4, "max_r": 30},
        "large": {"users": 50000, "min_r": 5, "max_r": 50}
    }

    config = presets.get(size.lower(), presets["medium"])
    print("=" * 60)
    print(f"🚀 GENERATING BIG DATASET [Size: {size.upper()}]")
    print(f"   Users: {config['users']:,}")
    print("=" * 60)

    df_products = generate_product_catalog(raw_dir)
    df_ratings = generate_user_interactions(
        df_products=df_products,
        num_users=config["users"],
        min_ratings_per_user=config["min_r"],
        max_ratings_per_user=config["max_r"],
        output_dir=raw_dir
    )
    return df_products, df_ratings

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate Big Data e-commerce interaction dataset.")
    parser.add_argument("--size", choices=["small", "medium", "large"], default="medium", help="Dataset size scale")
    args = parser.parse_args()
    build_dataset(size=args.size)
