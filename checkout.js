// Checkout page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutItems();
    updateCheckoutSummary();
    setupCheckoutForm();
    
    // Redirect to cart if cart is empty
    if (cart.length === 0) {
        window.location.href = 'cart.html';
    }
});

function loadCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    if (!checkoutItemsContainer) return;
    
    checkoutItemsContainer.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div>
                <strong>${item.name}</strong><br>
                <small>Qty: ${item.quantity}</small>
            </div>
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
}

function updateCheckoutSummary() {
    const subtotal = getCartTotal();
    const shipping = subtotal >= 50 ? 0 : 5.99;
    const total = subtotal + shipping;
    
    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
}

function setupCheckoutForm() {
    const form = document.getElementById('checkout-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        processOrder();
    });
    
    // Format card number input
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date input
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Format CVV input
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
        });
    }
}

function processOrder() {
    // Get form data
    const formData = new FormData(document.getElementById('checkout-form'));
    const orderData = {
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip')
        },
        items: cart,
        subtotal: getCartTotal(),
        shipping: getCartTotal() >= 50 ? 0 : 5.99,
        total: getCartTotal() + (getCartTotal() >= 50 ? 0 : 5.99),
        orderDate: new Date().toISOString()
    };
    
    // In a real application, this would send the order to a server
    console.log('Order placed:', orderData);
    
    // Show success modal
    showSuccessModal();
    
    // Clear cart
    clearCart();
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Prevent navigation away from success modal
window.addEventListener('beforeunload', (e) => {
    const modal = document.getElementById('success-modal');
    if (modal && modal.style.display === 'block') {
        e.preventDefault();
        e.returnValue = '';
    }
});
