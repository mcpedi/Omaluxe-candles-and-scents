# Omaluxe - Candles & Scents E-commerce Website

A beautiful, fully functional e-commerce website for Omaluxe premium candles and scents.

## Features

- 🏠 **Homepage** - Beautiful landing page with featured products and categories
- 🛍️ **Products Page** - Browse all products with filtering, sorting, and search capabilities
- 🛒 **Shopping Cart** - Add, remove, and manage items in your cart
- 💳 **Checkout** - Complete checkout process with form validation
- 📖 **About Page** - Learn about Omaluxe's story and values
- 📧 **Contact Page** - Get in touch with the team
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- LocalStorage for cart persistence

## How to Run

1. Simply open `index.html` in your web browser
2. Or use a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```
3. Navigate to `http://localhost:8000` in your browser

## Website Structure

```
├── index.html          # Homepage
├── products.html       # Product listing page
├── cart.html          # Shopping cart
├── checkout.html      # Checkout page
├── about.html         # About us page
├── contact.html       # Contact page
├── css/
│   └── style.css      # All styles
└── js/
    ├── products.js    # Product data and functions
    ├── cart.js        # Cart management
    ├── main.js        # Homepage functionality
    ├── products-page.js  # Products page functionality
    ├── cart-page.js   # Cart page functionality
    ├── checkout.js    # Checkout functionality
    └── contact.js     # Contact form functionality
```

## Features in Detail

### Product Catalog
- 12 unique products across 3 categories (Scented Candles, Luxury Candles, Gift Sets)
- Product filtering by category and price range
- Search functionality
- Sort by price, name, or featured

### Shopping Cart
- Add/remove products
- Update quantities
- Automatic cart total calculation
- Tax calculation (10%)
- Free shipping over $50
- Cart persistence using LocalStorage

### Checkout Process
- Customer information form
- Shipping address
- Payment information (simulated)
- Form validation
- Order confirmation

## Customization

### Adding Products
Edit `js/products.js` and add new products to the `products` array:

```javascript
{
    id: 13,
    name: "Product Name",
    category: "scented", // or "luxury" or "gifts"
    price: 29.99,
    description: "Product description",
    image: "🕯️" // Emoji as placeholder
}
```

### Changing Colors
Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #8b6f47;
    --secondary-color: #d4a574;
    --accent-color: #f4e8d8;
    /* ... */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for use.

## Contact

For questions or support, visit the contact page on the website.