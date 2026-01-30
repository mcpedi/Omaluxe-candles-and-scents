// Products page JavaScript
let currentCategory = 'all';
let selectedProduct = null;

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupFilters();
    setupModal();
    
    // Check if there's a product ID in the hash
    const hash = window.location.hash;
    if (hash.startsWith('#product-')) {
        const productId = parseInt(hash.replace('#product-', ''));
        openProductModal(productId);
    }
});

function loadProducts(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    currentCategory = category;
    const filteredProducts = filterProductsByCategory(category);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
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

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Load products for selected category
            const category = button.dataset.category;
            loadProducts(category);
        });
    });
}

function setupModal() {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeProductModal();
        }
    });
    
    // Quantity controls
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const qtyInput = document.getElementById('modal-quantity');
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            const currentQty = parseInt(qtyInput.value);
            if (currentQty > 1) {
                qtyInput.value = currentQty - 1;
            }
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            const currentQty = parseInt(qtyInput.value);
            qtyInput.value = currentQty + 1;
        });
    }
    
    // Add to cart from modal
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart');
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', () => {
            if (selectedProduct) {
                const quantity = parseInt(qtyInput.value);
                addToCart(selectedProduct.id, quantity);
                closeProductModal();
            }
        });
    }
}

function openProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    selectedProduct = product;
    
    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-product-image');
    const modalName = document.getElementById('modal-product-name');
    const modalPrice = document.getElementById('modal-product-price');
    const modalDescription = document.getElementById('modal-product-description');
    const modalSize = document.getElementById('modal-product-size');
    const modalBurn = document.getElementById('modal-product-burn');
    const modalQuantity = document.getElementById('modal-quantity');
    
    // Set modal image as emoji background
    modalImage.parentElement.innerHTML = `<div class="modal-image">${product.emoji}</div>`;
    modalName.textContent = product.name;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;
    modalDescription.textContent = product.description;
    modalSize.textContent = product.size;
    modalBurn.textContent = product.burnTime;
    modalQuantity.value = 1;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedProduct = null;
    
    // Clear hash
    if (window.location.hash.startsWith('#product-')) {
        history.replaceState(null, null, ' ');
    }
}

function getCategoryName(category) {
    const categoryNames = {
        'candles': 'Candle',
        'scents': 'Fragrance Oil',
        'gift-sets': 'Gift Set'
    };
    return categoryNames[category] || category;
}
