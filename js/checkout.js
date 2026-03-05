// Checkout page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Redirect to cart if cart is empty
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    loadCheckoutItems();
    updateCheckoutSummary();
    
    // Form submission
    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', handleCheckout);
    }
    
    // Format card number
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
});

function loadCheckoutItems() {
    const container = document.getElementById('checkout-items');
    if (!container) return;
    
    container.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div>
                <strong>${item.name}</strong>
                <p>Qty: ${item.quantity} × $${item.price.toFixed(2)}</p>
            </div>
            <div>
                <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
        </div>
    `).join('');
}

function updateCheckoutSummary() {
    const subtotal = getCartTotal();
    const shipping = calculateShipping(subtotal);
    const tax = calculateTax(subtotal);
    const total = subtotal + shipping + tax;
    
    const subtotalElement = document.getElementById('checkout-subtotal');
    const shippingElement = document.getElementById('checkout-shipping');
    const taxElement = document.getElementById('checkout-tax');
    const totalElement = document.getElementById('checkout-total');
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingElement) {
        shippingElement.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    }
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

function handleCheckout(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        email: document.getElementById('email').value,
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        country: document.getElementById('country').value,
        phone: document.getElementById('phone').value,
        cardNumber: document.getElementById('card-number').value,
        expiry: document.getElementById('expiry').value,
        cvv: document.getElementById('cvv').value,
        cardName: document.getElementById('card-name').value
    };
    
    // Basic validation
    if (!validateCheckoutForm(formData)) {
        return;
    }
    
    // Simulate order processing
    const orderNumber = Math.floor(Math.random() * 1000000);
    
    // Show success message
    alert(`Order placed successfully!\n\nOrder Number: #${orderNumber}\n\nThank you for shopping with Omaluxe!\n\nA confirmation email will be sent to ${formData.email}`);
    
    // Clear cart
    clearCart();
    
    // Redirect to homepage
    window.location.href = 'index.html';
}

function validateCheckoutForm(formData) {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    // Card number validation (basic)
    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        alert('Please enter a valid card number');
        return false;
    }
    
    // Expiry validation
    const expiryRegex = /^\d{2}\/\d{2}$/;
    if (!expiryRegex.test(formData.expiry)) {
        alert('Please enter expiry date in MM/YY format');
        return false;
    }
    
    // CVV validation
    if (formData.cvv.length < 3 || formData.cvv.length > 4) {
        alert('Please enter a valid CVV');
        return false;
    }
    
    return true;
}
