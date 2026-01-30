// Product data for Omaluxe Candles and Scents
const products = [
    {
        id: 1,
        name: "Lavender Dreams",
        category: "candles",
        price: 24.99,
        description: "Relax and unwind with our soothing lavender scented candle. Perfect for bedtime.",
        size: "8 oz",
        burnTime: "50 hours",
        featured: true,
        emoji: "💜"
    },
    {
        id: 2,
        name: "Vanilla Bliss",
        category: "candles",
        price: 22.99,
        description: "A sweet and creamy vanilla scent that creates a warm, inviting atmosphere.",
        size: "8 oz",
        burnTime: "50 hours",
        featured: true,
        emoji: "🤍"
    },
    {
        id: 3,
        name: "Ocean Breeze",
        category: "candles",
        price: 26.99,
        description: "Fresh and invigorating ocean scent brings the sea to your home.",
        size: "10 oz",
        burnTime: "60 hours",
        featured: true,
        emoji: "🌊"
    },
    {
        id: 4,
        name: "Cinnamon Spice",
        category: "candles",
        price: 23.99,
        description: "Warm and spicy cinnamon creates a cozy ambiance perfect for autumn.",
        size: "8 oz",
        burnTime: "50 hours",
        featured: false,
        emoji: "🍂"
    },
    {
        id: 5,
        name: "Rose Garden",
        category: "candles",
        price: 27.99,
        description: "Elegant rose scent that brings romance and sophistication to any space.",
        size: "10 oz",
        burnTime: "60 hours",
        featured: true,
        emoji: "🌹"
    },
    {
        id: 6,
        name: "Fresh Linen",
        category: "candles",
        price: 21.99,
        description: "Clean and crisp scent reminiscent of freshly washed linens.",
        size: "8 oz",
        burnTime: "50 hours",
        featured: false,
        emoji: "✨"
    },
    {
        id: 7,
        name: "Citrus Burst",
        category: "scents",
        price: 19.99,
        description: "Energizing citrus blend that refreshes and revitalizes your space.",
        size: "4 oz oil",
        burnTime: "N/A",
        featured: false,
        emoji: "🍊"
    },
    {
        id: 8,
        name: "Sandalwood & Cedar",
        category: "candles",
        price: 29.99,
        description: "Earthy and woody scent perfect for meditation and relaxation.",
        size: "12 oz",
        burnTime: "70 hours",
        featured: false,
        emoji: "🌲"
    },
    {
        id: 9,
        name: "Jasmine Night",
        category: "scents",
        price: 18.99,
        description: "Exotic jasmine fragrance oil for a luxurious aromatic experience.",
        size: "4 oz oil",
        burnTime: "N/A",
        featured: false,
        emoji: "🌸"
    },
    {
        id: 10,
        name: "Peppermint Frost",
        category: "candles",
        price: 24.99,
        description: "Cool and refreshing peppermint scent, ideal for winter months.",
        size: "8 oz",
        burnTime: "50 hours",
        featured: false,
        emoji: "❄️"
    },
    {
        id: 11,
        name: "Amber & Musk",
        category: "scents",
        price: 22.99,
        description: "Rich and sensual fragrance oil with deep, warm notes.",
        size: "4 oz oil",
        burnTime: "N/A",
        featured: false,
        emoji: "🧡"
    },
    {
        id: 12,
        name: "Luxury Gift Set",
        category: "gift-sets",
        price: 69.99,
        description: "Premium gift set including 3 signature candles beautifully packaged.",
        size: "3x 8 oz candles",
        burnTime: "150 hours total",
        featured: true,
        emoji: "🎁"
    },
    {
        id: 13,
        name: "Eucalyptus Mint",
        category: "candles",
        price: 25.99,
        description: "Spa-like blend of eucalyptus and mint for ultimate relaxation.",
        size: "8 oz",
        burnTime: "50 hours",
        featured: false,
        emoji: "🌿"
    },
    {
        id: 14,
        name: "Coffee House",
        category: "candles",
        price: 23.99,
        description: "Rich coffee aroma that energizes and awakens your senses.",
        size: "8 oz",
        burnTime: "50 hours",
        featured: false,
        emoji: "☕"
    },
    {
        id: 15,
        name: "Moonlight Meditation",
        category: "scents",
        price: 20.99,
        description: "Calming blend of essential oils perfect for yoga and meditation.",
        size: "4 oz oil",
        burnTime: "N/A",
        featured: false,
        emoji: "🌙"
    },
    {
        id: 16,
        name: "Seasonal Collection",
        category: "gift-sets",
        price: 89.99,
        description: "Complete seasonal collection with 4 themed candles and matching scents.",
        size: "4x 8 oz candles + 2 oils",
        burnTime: "200 hours total",
        featured: true,
        emoji: "🎀"
    }
];

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Function to get featured products
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Function to filter products by category
function filterProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}
