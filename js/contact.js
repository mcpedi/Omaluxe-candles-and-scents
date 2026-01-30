// Contact form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Validate message length
    if (formData.message.length < 10) {
        showFormMessage('Please enter a message with at least 10 characters', 'error');
        return;
    }
    
    // Simulate form submission
    showFormMessage('Thank you for contacting us! We will get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('form-message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.className = 'form-message';
            messageDiv.textContent = '';
        }, 5000);
    }
}
