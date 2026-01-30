// Main JavaScript for homepage
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products
    loadFeaturedProducts();
    
    // Add event delegation for add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });
});

// Load featured products on homepage
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featured = getFeaturedProducts();
    container.innerHTML = featured.map(product => createProductCard(product)).join('');
}
