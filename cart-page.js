// Cart page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateCartSummary();
});

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some beautiful candles to your cart!</p>
                <a href="products.html" class="btn-primary">Shop Now</a>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="btn-remove" onclick="removeItem(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

function updateCartSummary() {
    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? (subtotal >= 50 ? 0 : 5.99) : 0;
    const total = subtotal + shipping;
    
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-shipping').textContent = shipping === 0 && subtotal > 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    
    // Disable checkout button if cart is empty
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        if (cart.length === 0) {
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.pointerEvents = 'none';
        } else {
            checkoutBtn.style.opacity = '1';
            checkoutBtn.style.pointerEvents = 'auto';
        }
    }
}

function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        saveCart();
        loadCartItems();
        updateCartSummary();
    }
}

function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        saveCart();
        loadCartItems();
        updateCartSummary();
    }
}

function removeItem(productId) {
    if (confirm('Are you sure you want to remove this item?')) {
        removeFromCart(productId);
        loadCartItems();
        updateCartSummary();
        showNotification('Item removed from cart');
    }
}
