import json
from pathlib import Path

products = [
    # ==========================================
    # 👕 1. CLOTHING (13 Products)
    # ==========================================
    {
        "item_id": 101,
        "title": "Women's Cropped Fluffy Knit Button-Front Cardigan (Coral Red)",
        "category": "Clothing",
        "gender": "Women",
        "brand": "Zara",
        "price": 2999.0,
        "description": "Ultra-soft fuzzy mohair-blend cropped knit cardigan featuring front tonal buttons and ribbed crewneck in warm coral hue.",
        "tags": "zara clothing womens cardigan sweater knitwear cropped coral red buttons",
        "avg_rating": 4.65,
        "image_url": "/Product-photos/Clothing/AdobeStock_1010776573.jpeg"
    },
    {
        "item_id": 102,
        "title": "Women's High-Rise Cropped Flare Black Denim Jeans",
        "category": "Clothing",
        "gender": "Women",
        "brand": "Levi's",
        "price": 4299.0,
        "description": "Premium stretch denim cropped flare jeans featuring a classic exposed button fly and raw distressed hems.",
        "tags": "levis clothing womens jeans flare cropped black denim stretch",
        "avg_rating": 4.72,
        "image_url": "/Product-photos/Clothing/AdobeStock_1718003916.jpeg"
    },
    {
        "item_id": 103,
        "title": "Women's 70s Retro High-Waist Bell-Bottom Flare Jeans",
        "category": "Clothing",
        "gender": "Women",
        "brand": "H&M",
        "price": 3499.0,
        "description": "Retro-chic 70s inspired high-waist flared blue jeans with front patch pockets and figure-sculpting wash denim.",
        "tags": "hm clothing womens jeans flare bell bottom blue denim retro 70s",
        "avg_rating": 4.58,
        "image_url": "/Product-photos/Clothing/AdobeStock_1954039984.jpeg"
    },
    {
        "item_id": 104,
        "title": "Men's Smart Casual Linen Polo & Chino Set",
        "category": "Clothing",
        "gender": "Men",
        "brand": "Raymond",
        "price": 4999.0,
        "description": "Crisp white pique cotton polo shirt paired with tailored slim-fit stretch chinos for relaxed smart-casual refinement.",
        "tags": "raymond clothing mens polo smart casual chinos white grey set",
        "avg_rating": 4.81,
        "image_url": "/Product-photos/Clothing/AdobeStock_251163151.jpeg"
    },
    {
        "item_id": 105,
        "title": "Men's Supima Combed Cotton Crewneck T-Shirt (Heather Grey)",
        "category": "Clothing",
        "gender": "Men",
        "brand": "Uniqlo",
        "price": 1299.0,
        "description": "Supima long-staple combed cotton minimalist crewneck tee in heather grey with silky-smooth texture and anti-shrink collar.",
        "tags": "uniqlo clothing mens t-shirt tee cotton grey essential minimal",
        "avg_rating": 4.60,
        "image_url": "/Product-photos/Clothing/AdobeStock_311883555.jpeg"
    },
    {
        "item_id": 106,
        "title": "Classic Australian Merino Wool Ribbed Sweater Vest (Camel)",
        "category": "Clothing",
        "gender": "Unisex",
        "brand": "Marks & Spencer",
        "price": 2799.0,
        "description": "Vintage ribbed knit v-neck sweater vest in rich camel brown, crafted from soft Australian merino wool.",
        "tags": "marks spencer clothing vest sweater knit merino wool brown unisex",
        "avg_rating": 4.45,
        "image_url": "/Product-photos/Clothing/AdobeStock_452633006.jpeg"
    },
    {
        "item_id": 107,
        "title": "Men's Executive Tailored Pure Wool Business Suit",
        "category": "Clothing",
        "gender": "Men",
        "brand": "Louis Philippe",
        "price": 14999.0,
        "description": "Sharp tailored two-piece executive business suit handcrafted from pure wool with structured shoulders and satin lining.",
        "tags": "louis philippe clothing mens suit business formal executive wool blazer",
        "avg_rating": 4.88,
        "image_url": "/Product-photos/Clothing/AdobeStock_452702727.jpeg"
    },
    {
        "item_id": 108,
        "title": "Men's Heavyweight 280 GSM Boxy Streetwear T-Shirt (Pitch Black)",
        "category": "Clothing",
        "gender": "Men",
        "brand": "Zara",
        "price": 1699.0,
        "description": "280 GSM heavyweight drop-shoulder boxy silhouette streetwear tee in pitch black with thick reinforced ribbed crew collar.",
        "tags": "zara clothing mens streetwear oversized black t-shirt tee drop shoulder",
        "avg_rating": 4.67,
        "image_url": "/Product-photos/Clothing/AdobeStock_522652073.jpeg"
    },
    {
        "item_id": 109,
        "title": "Men's HeatGear Long-Sleeve Compression Training Shirt (Black)",
        "category": "Clothing",
        "gender": "Men",
        "brand": "Under Armour",
        "price": 2499.0,
        "description": "Ergonomic 4-way stretch moisture-wicking athletic compression long-sleeve top designed for peak training mobility and muscle support.",
        "tags": "under armour clothing mens compression shirt athletic gym training black",
        "avg_rating": 4.54,
        "image_url": "/Product-photos/Clothing/AdobeStock_530794121.jpeg"
    },
    {
        "item_id": 110,
        "title": "Heritage Nordic Bear Jacquard Wool Turtleneck Sweater (Red)",
        "category": "Clothing",
        "gender": "Unisex",
        "brand": "Tommy Hilfiger",
        "price": 5499.0,
        "description": "Festive traditional Nordic knit turtleneck sweater crafted from insulating lambswool with polar bear jacquard motif.",
        "tags": "tommy hilfiger clothing sweater turtleneck red nordic winter jacquard",
        "avg_rating": 4.73,
        "image_url": "/Product-photos/Clothing/AdobeStock_544561999.jpeg"
    },
    {
        "item_id": 111,
        "title": "Men's Textured Chunky Cable Knit Wool Pullover",
        "category": "Clothing",
        "gender": "Men",
        "brand": "Allen Solly",
        "price": 3899.0,
        "description": "Chunky textured cable knit sweater designed with an ergonomic tailored fit, ribbed crewneck, and cozy insulating yarn.",
        "tags": "allen solly clothing mens sweater knit wool pullover winter cream",
        "avg_rating": 4.62,
        "image_url": "/Product-photos/Clothing/AdobeStock_557538440.jpeg"
    },
    {
        "item_id": 112,
        "title": "Women's High-Rise Relaxed Straight Leg Denim Jeans",
        "category": "Clothing",
        "gender": "Women",
        "brand": "Zara",
        "price": 3699.0,
        "description": "Contemporary relaxed-fit straight leg denim jeans woven from eco-conscious organic cotton with a comfortable high rise.",
        "tags": "zara clothing womens jeans boyfriend denim high rise relaxed straight",
        "avg_rating": 4.68,
        "image_url": "/Product-photos/Clothing/AdobeStock_683987502.jpeg"
    },
    {
        "item_id": 113,
        "title": "Nike Sportswear Club Fleece Kangaroo Hoodie (Olive Green)",
        "category": "Clothing",
        "gender": "Men",
        "brand": "Nike",
        "price": 3795.0,
        "description": "Heavyweight 360 GSM brushed-back fleece pullover hoodie in army olive green with jersey-lined hood and kangaroo pouch pocket.",
        "tags": "nike clothing mens hoodie olive green fleece pullover streetwear",
        "avg_rating": 4.79,
        "image_url": "/Product-photos/Clothing/AdobeStock_837907035.jpeg"
    },

    # ==========================================
    # 💻 2. ELECTRONICS (24 Products)
    # ==========================================
    {
        "item_id": 114,
        "title": "Beats Solo3 Wireless On-Ear Headphones (Gloss White)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Beats",
        "price": 19900.0,
        "description": "Apple W1 headphone chip, Class 1 Bluetooth, 40 hours of battery life, and award-winning Beats acoustic sound tuning.",
        "tags": "beats electronics audio headphones wireless solo on-ear white bluetooth",
        "avg_rating": 4.71,
        "image_url": "/Product-photos/Electronics/adam-birkett-vISNAATFXlE-unsplash.jpg"
    },
    {
        "item_id": 115,
        "title": "JBL Flip 5 Portable Waterproof Bluetooth Speaker (Fiesta Red)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "JBL",
        "price": 6999.0,
        "description": "Racetrack-shaped driver delivering booming bass, IPX7 waterproof durable fabric housing, and 12-hour continuous playtime.",
        "tags": "jbl electronics audio speaker bluetooth waterproof red portable wireless",
        "avg_rating": 4.80,
        "image_url": "/Product-photos/Electronics/adison-ferreira-mS95of4-oV0-unsplash.jpg"
    },
    {
        "item_id": 116,
        "title": "Bose SoundLink Mini II Special Edition Bluetooth Speaker",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Bose",
        "price": 15900.0,
        "description": "Full, natural sound with dramatically deeper bass than you'd expect from an ultra-compact anodized aluminum unibody enclosure.",
        "tags": "bose electronics audio speaker bluetooth portable wireless soundlink mini",
        "avg_rating": 4.88,
        "image_url": "/Product-photos/Electronics/alex-ghizila-_bWH-4OjrYA-unsplash.jpg"
    },
    {
        "item_id": 117,
        "title": "Philips Series 3000 Cordless Beard & Hair Trimmer",
        "category": "Electronics",
        "gender": "Men",
        "brand": "Philips",
        "price": 2195.0,
        "description": "Lift & Trim system with self-sharpening titanium blades, 20 lock-in length settings, and 60 minutes cordless runtime.",
        "tags": "philips electronics grooming trimmer shaver mens cordless titanium",
        "avg_rating": 4.69,
        "image_url": "/Product-photos/Electronics/alexander-andrews-c_MODeV_7ig-unsplash.jpg"
    },
    {
        "item_id": 118,
        "title": "HP Spectre x360 2-in-1 Touchscreen Laptop (Silver Aluminum)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "HP",
        "price": 89990.0,
        "description": "Gem-cut precision aluminum chassis, Intel Core i7 processor, 16GB RAM, 512GB SSD, and 360-degree convertible hinge.",
        "tags": "hp electronics laptop spectre touchscreen convertible windows notebook ultrabook",
        "avg_rating": 4.82,
        "image_url": "/Product-photos/Electronics/andrey-matveev-qmcTZZ7XhqY-unsplash.jpg"
    },
    {
        "item_id": 119,
        "title": "boAt Airdopes 441 Pro True Wireless Earbuds (Active Black)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "boAt",
        "price": 2999.0,
        "description": "IWP instant pairing technology, IPX7 water resistance, immersive bass drivers, and up to 150 hours total battery case backup.",
        "tags": "boat electronics audio earbuds wireless bluetooth airdopes black bass",
        "avg_rating": 4.64,
        "image_url": "/Product-photos/Electronics/arjun-anil-ymfiokQznTo-unsplash.jpg"
    },
    {
        "item_id": 120,
        "title": "Sony SRS-XB13 Extra Bass Portable Wireless Speaker (Taupe)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Sony",
        "price": 3990.0,
        "description": "Compact cylinder speaker with Extra Bass sound diffusion processor, IP67 waterproof/dustproof rating, and multiway strap.",
        "tags": "sony electronics audio speaker bluetooth extra bass portable wireless compact",
        "avg_rating": 4.75,
        "image_url": "/Product-photos/Electronics/berke-can-EXiDx2JcFdE-unsplash.jpg"
    },
    {
        "item_id": 121,
        "title": "JBL Go 3 Ultra-Portable Waterproof Bluetooth Speaker (Teal)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "JBL",
        "price": 3499.0,
        "description": "Bold street-style design with rich JBL Pro Sound in an IP67 waterproof and dustproof rugged housing with integrated loop.",
        "tags": "jbl electronics audio speaker bluetooth portable waterproof wireless go3",
        "avg_rating": 4.64,
        "image_url": "/Product-photos/Electronics/eliott-van-buggenhout-ALf_DGUsgro-unsplash.jpg"
    },
    {
        "item_id": 122,
        "title": "Dell Inspiron 15 3000 Series Windows Laptop (Carbon Black)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Dell",
        "price": 48990.0,
        "description": "15.6-inch FHD anti-glare display with narrow borders, Intel Core i5 processor, 16GB RAM, and 512GB NVMe SSD.",
        "tags": "dell electronics laptop inspiron windows notebook intel office student",
        "avg_rating": 4.73,
        "image_url": "/Product-photos/Electronics/erick-cerritos-i5UV2HpITYA-unsplash.jpg"
    },
    {
        "item_id": 123,
        "title": "Apple iPhone 15 Pro (128GB, Natural Titanium)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Apple",
        "price": 129900.0,
        "description": "Forged in aerospace-grade titanium, powered by the A17 Pro silicon, customizable Action button, and 48MP Pro camera system.",
        "tags": "apple electronics smartphone iphone 15 pro titanium mobile camera ios 5g",
        "avg_rating": 4.90,
        "image_url": "/Product-photos/Electronics/igor-omilaev-lDWTfYhZ85w-unsplash.jpg"
    },
    {
        "item_id": 124,
        "title": "Apple iPhone 15 (128GB, Vibrant Coral Pink)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Apple",
        "price": 74900.0,
        "description": "Dynamic Island, color-infused back glass with contoured edges, 48MP main camera with 2x telephoto, and USB-C connectivity.",
        "tags": "apple electronics smartphone iphone 15 coral pink dynamic island mobile 5g",
        "avg_rating": 4.85,
        "image_url": "/Product-photos/Electronics/igor-omilaev-X4S-G_Q9U9g-unsplash.jpg"
    },
    {
        "item_id": 125,
        "title": "SoundPEATS Air3 Deluxe True Wireless Earbuds with Stem",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "SoundPEATS",
        "price": 3999.0,
        "description": "Qualcomm QCC3040 chip with aptX-Adaptive audio, 4-mic cVc noise cancellation, LED battery indicator case, and ultra-low latency game mode.",
        "tags": "soundpeats electronics audio earbuds wireless bluetooth stem charging case aptx",
        "avg_rating": 4.68,
        "image_url": "/Product-photos/Electronics/james-gibson-dQiqWGj847c-unsplash.jpg"
    },
    {
        "item_id": 126,
        "title": "Apple AirPods Pro (2nd Generation) with MagSafe Case",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Apple",
        "price": 24900.0,
        "description": "Apple-designed H2 chip delivering up to 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, and USB-C MagSafe case.",
        "tags": "apple electronics audio airpods pro earbuds wireless noise cancelling spatial sound",
        "avg_rating": 4.89,
        "image_url": "/Product-photos/Electronics/john-m-smit-Mc5EwlPC3zA-unsplash.jpg"
    },
    {
        "item_id": 127,
        "title": "Apple MagSafe Wireless Battery Pack for iPhone",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Apple",
        "price": 10900.0,
        "description": "Perfectly aligned magnetic snap-on wireless power bank providing safe, reliable on-the-go wireless charging for iPhone models.",
        "tags": "apple electronics magsafe battery pack wireless charger portable power",
        "avg_rating": 4.74,
        "image_url": "/Product-photos/Electronics/kamil-switalski-rMsGEodX9bg-unsplash.jpg"
    },
    {
        "item_id": 128,
        "title": "JBL Live 660NC Wireless Over-Ear Noise Cancelling Headphones",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "JBL",
        "price": 7999.0,
        "description": "40mm drivers delivering signature JBL Signature Sound with Adaptive Noise Cancelling, Ambient Aware, and 50 hours battery life.",
        "tags": "jbl electronics audio headphones over-ear noise cancelling wireless black",
        "avg_rating": 4.77,
        "image_url": "/Product-photos/Electronics/kiran-ck-cDrIiiptFqE-unsplash.jpg"
    },
    {
        "item_id": 129,
        "title": "Aëdle VK-1 Classic Edition Handcrafted Leather Headphones",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Aëdle",
        "price": 27990.0,
        "description": "Handcrafted in Paris with aircraft-grade aluminum cups, lambskin leather headband, and custom 40mm titanium transducers.",
        "tags": "aedle electronics audio headphones luxury leather aluminum audiophile premium",
        "avg_rating": 4.84,
        "image_url": "/Product-photos/Electronics/lee-campbell-GI6L2pkiZgQ-unsplash.jpg"
    },
    {
        "item_id": 130,
        "title": "Sony WH-1000XM4 Wireless Noise Cancelling Headphones (Black)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Sony",
        "price": 22990.0,
        "description": "Industry-leading noise cancellation with Dual Noise Sensor technology, LDAC Hi-Res Audio, Speak-to-Chat, and 30-hour battery life.",
        "tags": "sony electronics audio headphones noise cancelling wireless black hi-res",
        "avg_rating": 4.92,
        "image_url": "/Product-photos/Electronics/luke-peterson-lUMj2Zv5HUE-unsplash.jpg"
    },
    {
        "item_id": 131,
        "title": "Apple MacBook Pro 13-inch Retina Display (Silver Aluminum)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Apple",
        "price": 119900.0,
        "description": "Iconic silver precision unibody laptop with brilliant Retina display, Force Touch trackpad, MagSafe charging, and all-day battery life.",
        "tags": "apple electronics laptop macbook pro silver macos computer retina",
        "avg_rating": 4.91,
        "image_url": "/Product-photos/Electronics/maxim-hopman-Hin-rzhOdWs-unsplash.jpg"
    },
    {
        "item_id": 132,
        "title": "Soundcore by Anker Life Q30 Hybrid Active Noise Cancelling Headphones",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Soundcore",
        "price": 7999.0,
        "description": "Hi-Res certified audio with custom 40mm silk diaphragm drivers, Multi-Mode hybrid ANC, and ultra-soft protein leather earcups.",
        "tags": "soundcore anker electronics audio headphones active noise cancelling wireless black",
        "avg_rating": 4.78,
        "image_url": "/Product-photos/Electronics/mayra-moretti-por3FNwFCbs-unsplash.jpg"
    },
    {
        "item_id": 133,
        "title": "OnePlus 8 Pro 5G Flagship Smartphone (Glacial Green / Swarm)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "OnePlus",
        "price": 42999.0,
        "description": "Fluid 120Hz QHD+ display, Snapdragon 865 5G processor, 48MP Quad camera array, Warp Charge 30 Wireless, and custom matte textured skin.",
        "tags": "oneplus electronics smartphone mobile 5g flagship android camera",
        "avg_rating": 4.79,
        "image_url": "/Product-photos/Electronics/nafis-al-sadnan-QCTJuRaKk4U-unsplash.jpg"
    },
    {
        "item_id": 134,
        "title": "Samsung Galaxy S24 Ultra AI Flagship (256GB, Titanium Black)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Samsung",
        "price": 129999.0,
        "description": "Galaxy AI suite with Live Translate and Circle to Search, Titanium armor frame, 200MP camera system, integrated S Pen, and Snapdragon 8 Gen 3.",
        "tags": "samsung electronics smartphone galaxy s24 ultra ai android s-pen camera",
        "avg_rating": 4.93,
        "image_url": "/Product-photos/Electronics/ph-c-sang-_VmhMw5cEwU-unsplash.jpg"
    },
    {
        "item_id": 135,
        "title": "Reconnect 10000mAh Ultra-Slim Textured Power Bank (Crimson Red)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Reconnect",
        "price": 1499.0,
        "description": "Pocket-sized 10000mAh lithium-polymer power bank with textured non-slip crimson red casing, dual USB outputs, and LED power indicators.",
        "tags": "reconnect electronics power bank portable charger battery red slim",
        "avg_rating": 4.52,
        "image_url": "/Product-photos/Electronics/sai-balaji-varma-gadhiraju-QsVafcI4ouo-unsplash.jpg"
    },
    {
        "item_id": 136,
        "title": "Apple iPhone 11 (128GB, Crisp White)",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Apple",
        "price": 38999.0,
        "description": "6.1-inch Liquid Retina HD display, A13 Bionic chip, dual 12MP Ultra Wide and Wide cameras with Night mode, and aerospace-grade aluminum band.",
        "tags": "apple electronics smartphone iphone 11 dual camera white ios mobile",
        "avg_rating": 4.76,
        "image_url": "/Product-photos/Electronics/v-a-tao-OxvlDO8RwKg-unsplash.jpg"
    },
    {
        "item_id": 137,
        "title": "Xiaomi Mi 20800mAh Fast Charging Heavy-Duty Power Bank",
        "category": "Electronics",
        "gender": "Unisex",
        "brand": "Xiaomi",
        "price": 2499.0,
        "description": "High-capacity 20800mAh aluminum alloy enclosure power bank with 9 layers of circuit chip protection and high-speed bidirectional charging.",
        "tags": "xiaomi electronics power bank portable charger battery fast charging aluminum",
        "avg_rating": 4.65,
        "image_url": "/Product-photos/Electronics/zain-ali-3AOcW3ev8UE-unsplash.jpg"
    },

    # ==========================================
    # 👜 3. FASHION-ACCESSORIES (13 Products)
    # ==========================================
    {
        "item_id": 138,
        "title": "Emporio Armani Classic Chronograph Gold-Tone Leather Watch",
        "category": "Fashion-Accessories",
        "gender": "Men",
        "brand": "Emporio Armani",
        "price": 21995.0,
        "description": "Polished yellow gold-tone stainless steel case with clean white dial, chronograph sub-dials, date aperture, and rich dark brown leather strap.",
        "tags": "armani accessories watch chronograph gold leather mens luxury analog",
        "avg_rating": 4.81,
        "image_url": "/Product-photos/Fashion-Accessories/alexandre-daoust-MW2PqPz7vCw-unsplash.jpg"
    },
    {
        "item_id": 139,
        "title": "Giorgio Armani Acqua Di Giò Pour Homme Eau de Toilette (100ml)",
        "category": "Fashion-Accessories",
        "gender": "Men",
        "brand": "Giorgio Armani",
        "price": 8900.0,
        "description": "Legendary aquatic fragrance capturing the fresh sea breeze, Calabrian bergamot, rosemary, and patchouli in an iconic frosted glass bottle.",
        "tags": "armani fragrance perfume cologne acqua di gio mens luxury scent",
        "avg_rating": 4.89,
        "image_url": "/Product-photos/Fashion-Accessories/isaac-wolff-Sdg64dvfRk0-unsplash.jpg"
    },
    {
        "item_id": 140,
        "title": "Bleu De Chanel Eau De Parfum Pour Homme (100ml)",
        "category": "Fashion-Accessories",
        "gender": "Men",
        "brand": "Chanel",
        "price": 14200.0,
        "description": "An aromatic woody fragrance with an ambery cedar and New Caledonian sandalwood trail, encapsulating masculine liberty in deep midnight blue glass.",
        "tags": "chanel accessories perfume cologne bleu mens luxury fragrance parfum",
        "avg_rating": 4.94,
        "image_url": "/Product-photos/Fashion-Accessories/jeroen-den-otter-2b0JeJTEclQ-unsplash.jpg"
    },
    {
        "item_id": 141,
        "title": "Versace Eros Eau De Toilette Luxury Cologne (100ml)",
        "category": "Fashion-Accessories",
        "gender": "Men",
        "brand": "Versace",
        "price": 8900.0,
        "description": "Vibrant blend of mint leaves, Italian lemon zest, tonka beans, and cedarwood encased in turquoise Greek key sculpted glass.",
        "tags": "versace accessories cologne perfume eros mens luxury scent fragrance",
        "avg_rating": 4.78,
        "image_url": "/Product-photos/Fashion-Accessories/laura-chouette-gbT2KAq1V5c-unsplash.jpg"
    },
    {
        "item_id": 142,
        "title": "Marc Jacobs Daisy Eau De Toilette Spray (100ml)",
        "category": "Fashion-Accessories",
        "gender": "Women",
        "brand": "Marc Jacobs",
        "price": 8400.0,
        "description": "Sparkling floral fragrance infused with luscious wild berries, delicate white violet, and velvety jasmine under a blooming daisy cap.",
        "tags": "marc jacobs accessories perfume daisy floral womens fragrance scent",
        "avg_rating": 4.75,
        "image_url": "/Product-photos/Fashion-Accessories/majed-swan-SYB0KQmt2aY-unsplash.jpg"
    },
    {
        "item_id": 143,
        "title": "Rolex Submariner Date 41mm Oystersteel Luxury Watch",
        "category": "Fashion-Accessories",
        "gender": "Men",
        "brand": "Rolex",
        "price": 895000.0,
        "description": "Archetype of the diver's watch featuring a unidirectional Cerachrom ceramic bezel, black dial with luminescent Chromalight display, and Oyster bracelet.",
        "tags": "rolex accessories luxury watch submariner oystersteel automatic swiss date diver",
        "avg_rating": 4.98,
        "image_url": "/Product-photos/Fashion-Accessories/patrick-langwallner-GaHmbqNh5q8-unsplash.jpg"
    },
    {
        "item_id": 144,
        "title": "Rolex Datejust 36 Everose Rolesor Chocolate Diamond Dial Watch",
        "category": "Fashion-Accessories",
        "gender": "Unisex",
        "brand": "Rolex",
        "price": 1250000.0,
        "description": "Everose Rolesor combination of Oystersteel and 18ct Everose gold, fluted bezel, chocolate dial set with sparkling diamonds, and Jubilee bracelet.",
        "tags": "rolex accessories luxury watch diamond datejust jubilee automatic swiss",
        "avg_rating": 4.97,
        "image_url": "/Product-photos/Fashion-Accessories/ph-c-sang-8PzBx71aecg-unsplash.jpg"
    },
    {
        "item_id": 145,
        "title": "Emporio Armani Classic Rectangular Stainless Steel Watch",
        "category": "Fashion-Accessories",
        "gender": "Men",
        "brand": "Emporio Armani",
        "price": 18995.0,
        "description": "Tank-style rectangular curved stainless steel case with textured black dial, oversized Roman numerals, eagle emblem, and linked bracelet.",
        "tags": "armani accessories watch rectangular steel roman mens classic luxury",
        "avg_rating": 4.80,
        "image_url": "/Product-photos/Fashion-Accessories/ph-c-sang-c6uZeoDCHZk-unsplash.jpg"
    },
    {
        "item_id": 146,
        "title": "Timex Classic Minimalist Black Dial Stainless Steel Watch",
        "category": "Fashion-Accessories",
        "gender": "Men",
        "brand": "Timex",
        "price": 4995.0,
        "description": "Timeless everyday dress timepiece featuring a clean sunray black dial, silver baton indices, mineral glass, and linked steel bracelet.",
        "tags": "timex accessories watch analog black steel minimal mens classic",
        "avg_rating": 4.65,
        "image_url": "/Product-photos/Fashion-Accessories/puru-raj-B6z8FAfi7zY-unsplash.jpg"
    },
    {
        "item_id": 147,
        "title": "Helix by Timex Casual Analog Black Dial Leather Watch",
        "category": "Fashion-Accessories",
        "gender": "Men",
        "brand": "Helix",
        "price": 2495.0,
        "description": "Youthful minimalist wristwatch featuring matte black case, clean numeral layout with vibrant red second hand, and stitched black leather strap.",
        "tags": "helix timex accessories watch analog black leather casual mens",
        "avg_rating": 4.56,
        "image_url": "/Product-photos/Fashion-Accessories/solees-time-oiZFMB5HDIw-unsplash.jpg"
    },
    {
        "item_id": 148,
        "title": "Rolex Datejust 36 Two-Tone Yellow Rolesor White Dial Luxury Watch",
        "category": "Fashion-Accessories",
        "gender": "Unisex",
        "brand": "Rolex",
        "price": 1050000.0,
        "description": "Combination of Oystersteel and 18ct yellow gold with fluted bezel, crisp white dial with gold baton markers, Cyclops lens, and Oyster bracelet.",
        "tags": "rolex accessories luxury watch datejust gold steel automatic swiss oyster",
        "avg_rating": 4.96,
        "image_url": "/Product-photos/Fashion-Accessories/yash-parashar-VfozQD-IgdA-unsplash.jpg"
    },
    {
        "item_id": 149,
        "title": "Timex Expedition Field Chronograph All-Black Mesh Strap Watch",
        "category": "Fashion-Accessories",
        "gender": "Men",
        "brand": "Timex",
        "price": 7995.0,
        "description": "Rugged military-inspired outdoor chronograph featuring INDIGLO night-light, 100m water resistance, black IP casing, and breathable mesh strap.",
        "tags": "timex accessories watch chronograph tactical black indiglo expedition military",
        "avg_rating": 4.79,
        "image_url": "/Product-photos/Fashion-Accessories/yearone-mFqLyKaiG3I-unsplash.jpg"
    },
    {
        "item_id": 150,
        "title": "Emporio Armani Chronograph Sunburst Blue Dial Men's Watch",
        "category": "Fashion-Accessories",
        "gender": "Men",
        "brand": "Emporio Armani",
        "price": 22995.0,
        "description": "Deep sunburst blue textured dial with triple sub-dials, date display, iconic eagle emblem at 12 o'clock, and gunmetal stainless steel bracelet.",
        "tags": "armani accessories watch chronograph blue stainless steel mens luxury",
        "avg_rating": 4.87,
        "image_url": "/Product-photos/Fashion-Accessories/yu-jinyang-sE0OQABWl7I-unsplash.jpg"
    },

    # ==========================================
    # 👟 4. FOOTWARE (21 Products)
    # ==========================================
    {
        "item_id": 151,
        "title": "Tommy Hilfiger Sport Slip-On Elastic Strap Runners (Navy/Red)",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Tommy Hilfiger",
        "price": 5499.0,
        "description": "Lightweight breathable knit slip-on runners featuring signature Tommy Hilfiger elastic cross-straps and cushioned white athletic sole.",
        "tags": "tommy hilfiger footware sneakers slip-on navy red knit athletic unisex",
        "avg_rating": 4.68,
        "image_url": "/Product-photos/Footware/Tommy-Shoes.jpg"
    },
    {
        "item_id": 152,
        "title": "Nike Air Force 1 '07 LV8 Utility Black Leather Sneakers",
        "category": "Footware",
        "gender": "Men",
        "brand": "Nike",
        "price": 9695.0,
        "description": "Premium tumbled black leather low-top with contrasting white Swoosh, exterior care-label patch, heel pull tab, and Air-encapsulated sole.",
        "tags": "nike footware air force 1 utility black white leather sneakers streetwear mens",
        "avg_rating": 4.88,
        "image_url": "/Product-photos/Footware/andres-jasso-PqbL_mxmaUE-unsplash.jpg"
    },
    {
        "item_id": 153,
        "title": "Puma RS-X Reinvention Pastel Chunky Sneakers (Peach/Sand)",
        "category": "Footware",
        "gender": "Women",
        "brand": "Puma",
        "price": 7999.0,
        "description": "Reimagined retro running silhouette with Running System cushioning, mixed suede/mesh pastel overlays, and sculpted chunky midsole.",
        "tags": "puma footware sneakers rs-x chunky pastel peach sand retro womens",
        "avg_rating": 4.82,
        "image_url": "/Product-photos/Footware/artem-bondarchuk-XPBYi4K8vFI-unsplash.jpg"
    },
    {
        "item_id": 154,
        "title": "Clarks Tilden Cap Toe Leather Formal Derby Shoes",
        "category": "Footware",
        "gender": "Men",
        "brand": "Clarks",
        "price": 5999.0,
        "description": "Refined black genuine leather formal dress shoes featuring a cap toe, micro-textured quarter panel, Cushion Soft technology, and stacked heel.",
        "tags": "clarks footware formal shoes leather derby oxford black mens business",
        "avg_rating": 4.74,
        "image_url": "/Product-photos/Footware/davinder-singh-2nST4hbvTkc-unsplash.jpg"
    },
    {
        "item_id": 155,
        "title": "New Balance 247 REVlite Lifestyle Running Shoes (Olive Green)",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "New Balance",
        "price": 7999.0,
        "description": "Sleek sock-like bootie construction in army olive green mesh and synthetic suede, supported by an ultra-lightweight REVlite foam midsole.",
        "tags": "new balance footware sneakers 247 revlite olive green athletic running unisex",
        "avg_rating": 4.79,
        "image_url": "/Product-photos/Footware/felirbe-6zO5VKogoZE-unsplash.jpg"
    },
    {
        "item_id": 156,
        "title": "Puma Ralph Sampson Low Leather Retro Court Sneakers",
        "category": "Footware",
        "gender": "Men",
        "brand": "Puma",
        "price": 6499.0,
        "description": "Archive NBA low-cut court sneakers crafted from smooth leather and suede in grey and black with gold foil Puma branding and Shock Wedge sole.",
        "tags": "puma footware sneakers ralph sampson grey black leather court retro mens",
        "avg_rating": 4.70,
        "image_url": "/Product-photos/Footware/hipkicks-HcqA34-uWo4-unsplash.jpg"
    },
    {
        "item_id": 157,
        "title": "Gucci Screener GG Monogram Suede Luxury Sneakers",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Gucci",
        "price": 78000.0,
        "description": "Vintage 1970s sports trainer crafted in GG Supreme canvas and brown suede, highlighted by the classic green and red Web stripe.",
        "tags": "gucci footware sneakers luxury gg monogram suede web stripe unisex",
        "avg_rating": 4.95,
        "image_url": "/Product-photos/Footware/husien-bisky-q5fAPvaDkdU-unsplash.jpg"
    },
    {
        "item_id": 158,
        "title": "Nike Joyride Dual Run Stealth Black Running Shoes",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Nike",
        "price": 9995.0,
        "description": "Innovative tiny foam bead pods conforming to your foot for personalized cushioning in an all-black breathable mesh silhouette with neon accents.",
        "tags": "nike footware joyride stealth black running shoes athletic gym sneakers",
        "avg_rating": 4.81,
        "image_url": "/Product-photos/Footware/imani-bahati-LxVxPA1LOVM-unsplash.jpg"
    },
    {
        "item_id": 159,
        "title": "Steve Madden Platform Leather Cross-Strap Wedge Sandals",
        "category": "Footware",
        "gender": "Women",
        "brand": "Steve Madden",
        "price": 6499.0,
        "description": "Chic open-toe platform sandals crafted with supple burgundy wine leather cross-straps, silver buckle slingback, and carved wooden platform sole.",
        "tags": "steve madden footware sandals platform wedge leather maroon womens wooden",
        "avg_rating": 4.76,
        "image_url": "/Product-photos/Footware/irene-kredenets-DDqxX0-7vKE-unsplash.jpg"
    },
    {
        "item_id": 160,
        "title": "Nike Air Max 1 Ultra Moire Running Shoes (White/Orange)",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Nike",
        "price": 11995.0,
        "description": "Perforated lightweight one-piece upper in crisp white with vibrant infrared orange mudguard and visible heel Air-Sole unit.",
        "tags": "nike footware air max 1 ultra moire white orange running sneakers unisex",
        "avg_rating": 4.84,
        "image_url": "/Product-photos/Footware/luis-felipe-lins-J2-wAQDckus-unsplash.jpg"
    },
    {
        "item_id": 161,
        "title": "New Balance X-90 Reconstructed Sneakers (Pink/Grey)",
        "category": "Footware",
        "gender": "Women",
        "brand": "New Balance",
        "price": 8999.0,
        "description": "Heritage 99X series DNA infused with 90s boldness in pastel pink suede and breathable grey mesh with REVlite midsole comfort.",
        "tags": "new balance footware sneakers x90 pink suede womens running lifestyle",
        "avg_rating": 4.87,
        "image_url": "/Product-photos/Footware/maksim-larin-ezdrvzA1hZw-unsplash.jpg"
    },
    {
        "item_id": 162,
        "title": "Oliver Cabell Low 1 Handcrafted Leather Sneakers (Beige/Orange)",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Oliver Cabell",
        "price": 16500.0,
        "description": "Artisan low-top luxury sneakers handcrafted in Italy from buttery full-grain leather and suede in warm beige with burnt orange heel tab.",
        "tags": "oliver cabell footware sneakers luxury leather beige minimal low top unisex",
        "avg_rating": 4.90,
        "image_url": "/Product-photos/Footware/mojtaba-fahiminia-t4g1gctAaKk-unsplash.jpg"
    },
    {
        "item_id": 163,
        "title": "Nike Air Max 2X Black and White Athletic Sneakers",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Nike",
        "price": 7495.0,
        "description": "Open window double-stacked Air cushioning in the heel, breathable mesh upper with no-sew black overlays, and plush padded collar.",
        "tags": "nike footware air max sneakers black white athletic running unisex",
        "avg_rating": 4.77,
        "image_url": "/Product-photos/Footware/mojtaba-mosayebzadeh-WtHNuoYQLgs-unsplash.jpg"
    },
    {
        "item_id": 164,
        "title": "Vans Old Skool Canvas & Suede Skate Shoes (Burgundy)",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Vans",
        "price": 4999.0,
        "description": "Timeless low-top skate shoe with durable burgundy canvas and suede uppers, iconic white side stripe, and signature rubber waffle outsole.",
        "tags": "vans footware skate shoes old skool burgundy maroon canvas unisex",
        "avg_rating": 4.79,
        "image_url": "/Product-photos/Footware/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg"
    },
    {
        "item_id": 165,
        "title": "Nike Free RN Flyknit Flexible Running Shoes (Crimson Red)",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Nike",
        "price": 10995.0,
        "description": "Barefoot-like natural mobility with revolutionary Flyknit upper, white side Swoosh, and tri-star auxetic Nike Free expanding outsole in vibrant crimson.",
        "tags": "nike footware running shoes free flyknit crimson red flexible athletic",
        "avg_rating": 4.85,
        "image_url": "/Product-photos/Footware/ryan-waring-164_6wVEHfI-unsplash.jpg"
    },
    {
        "item_id": 166,
        "title": "Asics GEL-Kayano 14 Silver/Grey Metallic Mesh Runners",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Asics",
        "price": 13999.0,
        "description": "Late 2000s retro running aesthetic reinterpreted with metallic silver synthetic overlays, breathable open mesh, and GEL technology cushioning.",
        "tags": "asics footware running shoes gel kayano metallic silver marathon",
        "avg_rating": 4.89,
        "image_url": "/Product-photos/Footware/tanaphong-toochinda-WWDMEVcGPbU-unsplash.jpg"
    },
    {
        "item_id": 167,
        "title": "Puma Smash v2 Leather Low-Top Court Sneakers (Triple White)",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Puma",
        "price": 3999.0,
        "description": "Tennis-inspired clean low-profile trainer featuring soft white leather, perforated formstrip details, and durable rubber cupsole.",
        "tags": "puma footware sneakers smash white leather court tennis casual unisex",
        "avg_rating": 4.72,
        "image_url": "/Product-photos/Footware/the-dk-photography-NUoPWImmjCU-unsplash.jpg"
    },
    {
        "item_id": 168,
        "title": "Fila Disruptor II Premium Chunky White Sneakers",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Fila",
        "price": 5499.0,
        "description": "The iconic 90s chunky silhouette in crisp white leather with embroidered navy/red logos and aggressive sawtooth rubber sole.",
        "tags": "fila footware disruptor chunky sneakers white retro 90s streetwear unisex",
        "avg_rating": 4.78,
        "image_url": "/Product-photos/Footware/tom-radetzki-SzVXG6FFh0Q-unsplash.jpg"
    },
    {
        "item_id": 169,
        "title": "Streetwear Atelier Custom High-Top Court Sneakers (Forest Green)",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Streetwear Atelier",
        "price": 8999.0,
        "description": "Handcrafted high-top basketball sneaker in premium white leather featuring forest green padded ankle collar and signature lightning bolt motif.",
        "tags": "streetwear footware sneakers high top court forest green leather unisex",
        "avg_rating": 4.85,
        "image_url": "/Product-photos/Footware/tony-saiko-01fAXimchhY-unsplash.jpg"
    },
    {
        "item_id": 170,
        "title": "Nike Air Zoom SuperRep HIIT Training Shoes (Volt Lime)",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Nike",
        "price": 10295.0,
        "description": "Engineered for circuit training and HIIT, featuring dual Zoom Air pods in the forefoot, containment arc, and high-visibility volt lime colorway.",
        "tags": "nike footware training shoes superrep volt lime green athletic gym",
        "avg_rating": 4.83,
        "image_url": "/Product-photos/Footware/usama-akram-kP6knT7tjn4-unsplash.jpg"
    },
    {
        "item_id": 171,
        "title": "Asics GEL-Kayano 14 Metallic Silver Running Shoes",
        "category": "Footware",
        "gender": "Unisex",
        "brand": "Asics",
        "price": 13999.0,
        "description": "Iconic Y2K running silhouette with mirror-finish silver overlays, segmented GEL cushioning units, and TRUSSTIC support system.",
        "tags": "asics footware gel-kayano running shoes metallic silver retro marathon",
        "avg_rating": 4.90,
        "image_url": "/Product-photos/Footware/vlad-ciutacu-tR2ZoPR4OPc-unsplash.jpg"
    },

    # ==========================================
    # 🏸 5. SPORTS EQUIPMENTS (7 Products)
    # ==========================================
    {
        "item_id": 172,
        "title": "Custom Aztec Heritage Pattern Match Football",
        "category": "Sports Equipments",
        "gender": "Unisex",
        "brand": "Heritage Sports",
        "price": 2499.0,
        "description": "Hand-stitched PU match football featuring intricate black-and-white pre-Columbian Aztec tribal artwork with reinforced butyl bladder.",
        "tags": "sports equipment football soccer ball aztec heritage match training",
        "avg_rating": 4.75,
        "image_url": "/Product-photos/Sports Equipments/joshua-hoehne-XBzs2WBqOLk-unsplash.jpg"
    },
    {
        "item_id": 173,
        "title": "Select Brillant Super FIFA Quality Pro Official Match Football",
        "category": "Sports Equipments",
        "gender": "Unisex",
        "brand": "Select",
        "price": 7999.0,
        "description": "FIFA Quality Pro certified thermally bonded match ball with 3D diamond texture structure and zero water absorption for supreme flight stability.",
        "tags": "select sports equipment football soccer ball fifa match pro turf",
        "avg_rating": 4.92,
        "image_url": "/Product-photos/Sports Equipments/leo_visions-RV5I1lGcspU-unsplash.jpg"
    },
    {
        "item_id": 174,
        "title": "Wilson Roland Garros Official Clay Court Tennis Balls (Can of 3)",
        "category": "Sports Equipments",
        "gender": "Unisex",
        "brand": "Wilson",
        "price": 1299.0,
        "description": "The official ball of the French Open at Roland Garros, engineered with Clay Guard woven felt to resist clay moisture and maintain high visibility.",
        "tags": "wilson sports equipment tennis ball roland garros clay court match",
        "avg_rating": 4.86,
        "image_url": "/Product-photos/Sports Equipments/nenyasha-manzvera-COwezdtQ0Ws-unsplash.jpg"
    },
    {
        "item_id": 175,
        "title": "Sugar Golf Tour-Grade Urethane Precision Golf Balls (1 Dozen)",
        "category": "Sports Equipments",
        "gender": "Unisex",
        "brand": "Sugar Golf",
        "price": 3999.0,
        "description": "Tour-grade 3-piece cast urethane golf balls engineered for extreme distance off the tee with ultra-soft greenside spin and control.",
        "tags": "sugar golf sports equipment golf balls tour urethane precision greens",
        "avg_rating": 4.88,
        "image_url": "/Product-photos/Sports Equipments/sugar-golf-GGV0KhniwRU-unsplash.jpg"
    },
    {
        "item_id": 176,
        "title": "The Village Cricket Co. Handcrafted English Willow Cricket Bat",
        "category": "Sports Equipments",
        "gender": "Unisex",
        "brand": "The Village Cricket Co.",
        "price": 14999.0,
        "description": "Individually shaped and pressed Grade 1 English Willow cricket bat with massive mid-to-low sweet spot, green cane handle, and featherlight pickup.",
        "tags": "cricket bat english willow sports equipment leather ball village cricket pro",
        "avg_rating": 4.96,
        "image_url": "/Product-photos/Sports Equipments/village-cricket-co-KGrQ_DNABik-unsplash.jpg"
    },
    {
        "item_id": 177,
        "title": "Yonex Voltric Z-Force II Pro Tour Badminton Racket",
        "category": "Sports Equipments",
        "gender": "Unisex",
        "brand": "Yonex",
        "price": 15990.0,
        "description": "Extra slim shaft with Tri-Voltage system and aerodynamic head frame for explosive smash power and lightning-fast racquet handling.",
        "tags": "yonex sports equipment badminton racket voltric smash tour pro",
        "avg_rating": 4.90,
        "image_url": "/Product-photos/Sports Equipments/wengang-zhai-F40MzrTHij0-unsplash.jpg"
    },
    {
        "item_id": 178,
        "title": "Ram Rugby Squad Match Ball with Grip-Tech",
        "category": "Sports Equipments",
        "gender": "Unisex",
        "brand": "Ram Rugby",
        "price": 2999.0,
        "description": "Top-tier club and school match rugby ball featuring multi-matrix 3D pimple grip, balanced latex bladder, and high-visibility chevron trim.",
        "tags": "ram rugby sports equipment ball match grip training grass",
        "avg_rating": 4.79,
        "image_url": "/Product-photos/Sports Equipments/xander-sauviller-OIukS3TlVD8-unsplash.jpg"
    }
]

code = '''import json
import random
from pathlib import Path
from datetime import datetime
import pandas as pd
import numpy as np

# Ensure root in sys.path
import sys
root_dir = Path(__file__).resolve().parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if sys.stderr and hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# 78 Curated Product Definitions exactly matched to user-provided photos in frontend/public/Product-photos/
PRODUCTS = ''' + json.dumps(products, indent=4) + '''

def main():
    print("🚀 Building and Seeding 78-Item Curated NextBuy Product Catalog...")
    raw_dir = Path("data/raw")
    processed_dir = Path("data/processed")
    models_dir = Path("models")
    raw_dir.mkdir(parents=True, exist_ok=True)
    processed_dir.mkdir(parents=True, exist_ok=True)
    models_dir.mkdir(parents=True, exist_ok=True)

    df_products = pd.DataFrame(PRODUCTS)
    products_csv = raw_dir / "products.csv"
    df_products.to_csv(products_csv, index=False)
    print(f"✅ Saved {len(df_products)} products to {products_csv}")

    # Generate 10,000 user interactions across all 78 products
    print("🔄 Generating 10,000 user interaction profiles across 5 categories...")
    num_users = 10000
    categories = sorted(df_products["category"].unique())
    items_by_cat = {cat: df_products[df_products["category"] == cat]["item_id"].tolist() for cat in categories}
    all_item_ids = df_products["item_id"].tolist()

    interactions = []
    random.seed(42)
    np.random.seed(42)

    persona_affinities = [
        {"fav": ["Clothing", "Fashion-Accessories"]},
        {"fav": ["Footware", "Sports Equipments"]},
        {"fav": ["Electronics", "Fashion-Accessories"]},
        {"fav": ["Clothing", "Footware"]},
        {"fav": categories}
    ]

    for user_id in range(1, num_users + 1):
        num_ratings = random.randint(3, 10)
        affinity = random.choice(persona_affinities)["fav"]
        rated_items = set()

        for _ in range(num_ratings):
            if random.random() < 0.7 and affinity:
                c = random.choice(affinity)
                item_id = random.choice(items_by_cat[c])
            else:
                item_id = random.choice(all_item_ids)

            if item_id in rated_items:
                continue
            rated_items.add(item_id)

            rating = np.random.choice([1, 2, 3, 4, 5], p=[0.04, 0.06, 0.15, 0.38, 0.37])
            ts = 1704067200000 + random.randint(0, 31536000000)
            interactions.append({
                "user_id": user_id,
                "item_id": item_id,
                "rating": float(rating),
                "timestamp": ts
            })

    df_ratings = pd.DataFrame(interactions)
    ratings_csv = raw_dir / "ratings.csv"
    df_ratings.to_csv(ratings_csv, index=False)
    print(f"✅ Generated {len(df_ratings)} ratings across {df_ratings['item_id'].nunique()} products -> {ratings_csv}")

    # Compute enriched product ratings and save to processed parquet & csv
    stats = df_ratings.groupby("item_id")["rating"].agg(["count", "mean"]).reset_index()
    stats.columns = ["item_id", "total_ratings", "computed_avg_rating"]
    stats["computed_avg_rating"] = stats["computed_avg_rating"].round(2)

    df_enriched = pd.merge(df_products, stats, on="item_id", how="left")
    df_enriched["computed_avg_rating"] = df_enriched["computed_avg_rating"].fillna(df_enriched["avg_rating"])
    df_enriched["total_ratings"] = df_enriched["total_ratings"].fillna(100).astype(int)

    df_enriched.to_parquet(processed_dir / "products_clean.parquet", index=False)
    df_enriched.to_csv(processed_dir / "products_clean.csv", index=False)
    df_ratings.to_parquet(processed_dir / "ratings_clean.parquet", index=False)
    df_ratings.to_csv(processed_dir / "ratings_clean.csv", index=False)
    print("✅ Parquet & CSV processed datasets updated.")

    # Fit TF-IDF Recommender
    print("🧠 Fitting Content-Based Recommender (TF-IDF & Cosine Similarity)...")
    from src.content_recommender import ContentBasedRecommender
    cr = ContentBasedRecommender(data_dir=processed_dir)
    cr.fit()

    # Fit Vectorized ALS & Save Precomputed Recommendations
    print("⚡ Fitting ALS Matrix Factorization Model...")
    from src.als_recommender import PythonVectorizedALS
    als = PythonVectorizedALS(rank=12, max_iter=8, reg_param=0.08)
    als.train(data_path=processed_dir / "ratings_clean.parquet")
    print("✅ ALS models and recommendations dumped to models/")

    print("\\n🎉 Product Catalog Pipeline Completed Successfully with 78 items and 5 categories!")

if __name__ == "__main__":
    main()
'''

Path("build_and_seed_catalog.py").write_text(code, encoding="utf-8")
print(f"Successfully generated build_and_seed_catalog.py with {len(products)} products!")

