// Cart page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadCartPage();
    
    // Event delegation for cart actions
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
            loadCartPage();
        }
        
        if (e.target.classList.contains('qty-decrease')) {
            const productId = parseInt(e.target.dataset.id);
            const item = cart.find(i => i.id === productId);
            if (item) {
                updateQuantity(productId, item.quantity - 1);
                loadCartPage();
            }
        }
        
        if (e.target.classList.contains('qty-increase')) {
            const productId = parseInt(e.target.dataset.id);
            const item = cart.find(i => i.id === productId);
            if (item) {
                updateQuantity(productId, item.quantity + 1);
                loadCartPage();
            }
        }
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }
});

function loadCartPage() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add some products to get started!</p>
                <a href="products.html" class="btn btn-primary">Shop Now</a>
            </div>
        `;
    } else {
        container.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
    }
    
    updateCartSummary();
}

function createCartItemHTML(item) {
    return `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="qty-decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <p style="font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        </div>
    `;
}

function updateCartSummary() {
    const subtotal = getCartTotal();
    const shipping = calculateShipping(subtotal);
    const tax = calculateTax(subtotal);
    const total = subtotal + shipping + tax;
    
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const taxElement = document.getElementById('cart-tax');
    const totalElement = document.getElementById('cart-total');
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingElement) {
        shippingElement.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    }
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}
