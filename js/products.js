// Product Data
const products = [
    {
        id: 1,
        name: "Lavender Dreams",
        category: "scented",
        price: 24.99,
        description: "Calming lavender scent perfect for relaxation",
        image: "🕯️"
    },
    {
        id: 2,
        name: "Vanilla Bean",
        category: "scented",
        price: 22.99,
        description: "Warm and sweet vanilla fragrance",
        image: "🕯️"
    },
    {
        id: 3,
        name: "Ocean Breeze",
        category: "scented",
        price: 26.99,
        description: "Fresh and clean ocean-inspired scent",
        image: "🕯️"
    },
    {
        id: 4,
        name: "Cinnamon Spice",
        category: "scented",
        price: 23.99,
        description: "Warm cinnamon and spice blend",
        image: "🕯️"
    },
    {
        id: 5,
        name: "Rose Garden",
        category: "luxury",
        price: 34.99,
        description: "Elegant rose fragrance with hints of jasmine",
        image: "🌹"
    },
    {
        id: 6,
        name: "Sandalwood Luxury",
        category: "luxury",
        price: 39.99,
        description: "Rich sandalwood with amber notes",
        image: "✨"
    },
    {
        id: 7,
        name: "Bergamot & Sage",
        category: "luxury",
        price: 36.99,
        description: "Sophisticated blend of bergamot and sage",
        image: "🌿"
    },
    {
        id: 8,
        name: "Champagne Noir",
        category: "luxury",
        price: 44.99,
        description: "Luxurious champagne and black currant",
        image: "🥂"
    },
    {
        id: 9,
        name: "Relaxation Gift Set",
        category: "gifts",
        price: 59.99,
        description: "Set of 3 calming candles with matches",
        image: "🎁"
    },
    {
        id: 10,
        name: "Luxury Collection",
        category: "gifts",
        price: 89.99,
        description: "Premium set of 4 signature candles",
        image: "🎁"
    },
    {
        id: 11,
        name: "Seasonal Favorites",
        category: "gifts",
        price: 49.99,
        description: "Curated set of seasonal scents",
        image: "🎁"
    },
    {
        id: 12,
        name: "Eucalyptus Mint",
        category: "scented",
        price: 25.99,
        description: "Refreshing eucalyptus and mint blend",
        image: "🌿"
    }
];

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Get products by category
function getProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

// Get featured products (first 6)
function getFeaturedProducts() {
    return products.slice(0, 6);
}

// Filter products by price range
function filterByPrice(products, priceRange) {
    if (priceRange === 'all') {
        return products;
    }
    
    if (priceRange === '0-20') {
        return products.filter(p => p.price < 20);
    } else if (priceRange === '20-40') {
        return products.filter(p => p.price >= 20 && p.price < 40);
    } else if (priceRange === '40+') {
        return products.filter(p => p.price >= 40);
    }
    
    return products;
}

// Search products
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
    );
}

// Sort products
function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted;
    }
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${formatCategory(product.category)}</p>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Format category name
function formatCategory(category) {
    const categories = {
        'scented': 'Scented Candles',
        'luxury': 'Luxury Candles',
        'gifts': 'Gift Sets'
    };
    return categories[category] || category;
}
