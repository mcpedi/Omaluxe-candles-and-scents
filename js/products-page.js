// Products page JavaScript
let currentProducts = products;
let currentCategory = 'all';
let currentPriceRange = 'all';
let currentSort = 'featured';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', function() {
    // Load all products initially
    loadProducts();
    
    // Category filters
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', function() {
            currentCategory = this.value;
            applyFilters();
        });
    });
    
    // Price filters
    document.querySelectorAll('input[name="price"]').forEach(radio => {
        radio.addEventListener('change', function() {
            currentPriceRange = this.value;
            applyFilters();
        });
    });
    
    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            applyFilters();
        });
    }
    
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchQuery = this.value;
            applyFilters();
        });
    }
    
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });
    
    // Check for category from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        currentCategory = categoryParam;
        const categoryRadio = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
        if (categoryRadio) {
            categoryRadio.checked = true;
        }
        applyFilters();
    }
});

function loadProducts() {
    const container = document.getElementById('products-grid');
    if (!container) return;
    
    if (currentProducts.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 3rem;">No products found.</p>';
    } else {
        container.innerHTML = currentProducts.map(product => createProductCard(product)).join('');
    }
    
    updateProductCount();
}

function applyFilters() {
    let filtered = products;
    
    // Apply category filter
    if (currentCategory !== 'all') {
        filtered = getProductsByCategory(currentCategory);
    }
    
    // Apply price filter
    filtered = filterByPrice(filtered, currentPriceRange);
    
    // Apply search
    if (searchQuery.trim() !== '') {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // Apply sort
    filtered = sortProducts(filtered, currentSort);
    
    currentProducts = filtered;
    loadProducts();
}

function updateProductCount() {
    const countElement = document.getElementById('product-count');
    if (countElement) {
        countElement.textContent = currentProducts.length;
    }
}
