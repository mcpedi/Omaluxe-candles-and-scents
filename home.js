// Home page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
});

function loadFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    if (!featuredProductsContainer) return;

    const featuredProducts = getFeaturedProducts().slice(0, 6); // Show first 6 featured products
    
    featuredProductsContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <p class="product-category">${getCategoryName(product.category)}</p>
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="btn-primary btn-add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const categoryNames = {
        'candles': 'Candle',
        'scents': 'Fragrance Oil',
        'gift-sets': 'Gift Set'
    };
    return categoryNames[category] || category;
}

function viewProduct(productId) {
    window.location.href = `products.html#product-${productId}`;
}
