# 🛍️ FakeStore Luxe — Premium E-Commerce React App

A sophisticated luxury e-commerce frontend built with **React 18**, **React Router v6**, **Vite**, and the **FakeStore API**. This project showcases a premium dark theme with gold accents, delivering an elegant shopping experience while demonstrating modern React development patterns including Context API, shopping cart functionality, and user management.

## ✨ Features

### 🛒 Core Functionality

- **Product Catalog**: Browse products with elegant card layouts
- **Product Details**: Immersive hero-style product pages
- **Shopping Cart**: Add, remove, and manage cart items with persistent state
- **Checkout Process**: Complete purchase flow with order summary
- **User Management**: User authentication and profile management
- **Search & Filter**: Advanced product search and filtering capabilities
- **Product Management**: Create, edit, and delete products (admin functionality)
- **Responsive Design**: Optimized for all device sizes
- **Luxury UI**: Dark theme with gold accents and premium typography

### 🎨 Design & UX

- Premium dark color scheme with gold highlights
- Google Fonts integration (Playfair Display + Inter)
- Smooth transitions and hover effects
- Luxury-focused typography hierarchy
- Mobile-first responsive design

### 🔧 Technical Features

- Modern React 18 with functional components and hooks
- React Router v6 for client-side navigation
- Context API for state management (Cart & User contexts)
- Local storage persistence for cart and user data
- Vite for lightning-fast development and builds
- ESLint configuration for code quality
- Mock API integration with error handling
- Component-based architecture with reusable UI elements

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd luxury-ecommerce

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build locally
```

## 📁 Project Structure

```
luxury-ecommerce/
├── public/                 # Static assets
├── src/
│   ├── index.jsx          # Application entry point
│   ├── app.jsx            # Main App component with routing
│   ├── styles.css         # Global styles and luxury theme
│   ├── api/
│   │   └── product.js     # FakeStore API integration
│   ├── assets/            # Static assets and images
│   ├── components/
│   │   ├── CartComponents.jsx    # Cart-related UI components
│   │   ├── Navbar.jsx           # Navigation header
│   │   ├── ProductFeatures.jsx  # Product feature displays
│   │   ├── SearchBar.jsx        # Search functionality
│   │   └── UserComponents.jsx   # User authentication components
│   ├── contexts/
│   │   ├── CartContext.jsx      # Shopping cart state management
│   │   └── UserContext.jsx      # User authentication state
│   └── pages/
│       ├── CartPage.jsx         # Shopping cart page
│       ├── CheckoutPage.jsx     # Checkout and payment flow
│       ├── LandingPage.jsx      # Home/landing page
│       ├── ProductDetail.jsx    # Individual product page
│       ├── ProductForm.jsx      # Create/Edit product form
│       └── ProductList.jsx      # Product catalog page
├── package.json           # Project dependencies and scripts
├── vite.config.js        # Vite configuration
└── eslint.config.js      # ESLint rules
```

## 🌐 API Integration

This project integrates with the [FakeStore API](https://fakestoreapi.com/) for:

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `POST /products` - Create new product (mock response)
- `PUT /products/:id` - Update product (mock response)
- `DELETE /products/:id` - Delete product (mock response)

> ⚠️ **Important**: The FakeStore API returns success responses for POST/PUT/DELETE operations but **does not persist changes**. All modifications are simulated for demonstration purposes.

## 🎯 Key Components

### Pages

#### LandingPage

- Elegant home page with featured products and categories
- Hero section with luxury branding
- Call-to-action sections for enhanced user engagement

#### ProductList

- Displays products in a responsive grid layout
- Includes product images, titles, categories, and prices
- Edit and delete actions for each product
- Elegant card hover effects
- Integrated search and filtering capabilities

#### ProductDetail

- Hero-style product showcase with large images
- Detailed product information display
- Add to cart functionality with quantity selection
- Action buttons for editing and deletion
- Breadcrumb navigation back to catalog

#### CartPage

- Comprehensive shopping cart management
- Item quantity adjustment and removal
- Real-time price calculations
- Seamless checkout navigation

#### CheckoutPage

- Complete purchase flow with order summary
- User information collection
- Order confirmation and processing

#### ProductForm

- Unified form for creating and editing products
- Form validation for required fields
- Image URL preview capability
- Responsive form layout with luxury styling

### Components

#### Navbar

- Brand identity with logo and tagline
- Navigation links with active states
- Shopping cart indicator with item count
- User authentication status display
- Responsive mobile-friendly design

#### SearchBar

- Real-time product search functionality
- Category filtering options
- Elegant search interface with autocomplete

#### CartComponents

- Reusable cart-related UI elements
- Cart item display components
- Quantity controls and price calculations

#### UserComponents

- User authentication forms (login/register)
- User profile management
- Session handling components

#### ProductFeatures

- Showcase product highlights and specifications
- Feature comparison displays
- Enhanced product presentation

### Context Providers

#### CartContext

- Global shopping cart state management
- Add, remove, and update cart items
- Persistent cart storage using localStorage
- Cart total calculations and item count

#### UserContext

- User authentication state management
- Login/logout functionality
- User session persistence
- Protected route handling

## 🎨 Design System

### Color Palette

- **Primary Dark**: Deep navy backgrounds
- **Gold Accents**: Luxury highlighting
- **Text**: High contrast white and muted grays
- **Interactive**: Subtle hover states and transitions

### Typography

- **Headlines**: Playfair Display (elegant serif)
- **Body Text**: Inter (clean sans-serif)
- **Hierarchy**: Consistent spacing and sizing

## 🔧 Development Notes

### Recent Fixes Applied

- ✅ Corrected API import paths across components
- ✅ Resolved JSX file extension configuration
- ✅ Fixed entry point setup for Vite
- ✅ Added missing Vite React plugin dependency
- ✅ Eliminated ESLint warnings and unused variables
- ✅ Removed duplicate entry point files
- ✅ Implemented shopping cart functionality with Context API
- ✅ Added user authentication and session management
- ✅ Created comprehensive checkout process
- ✅ Integrated search and filtering capabilities
- ✅ Enhanced component architecture with reusable elements

### Browser Support

- Modern browsers with ES6+ support
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## 📄 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

This is a learning project demonstrating modern React development patterns. Feel free to fork and experiment with additional features like:

- Payment gateway integration
- Advanced user profiles and order history
- Product reviews and ratings system
- Wishlist management
- Enhanced product image galleries
- Real-time inventory management
- Social sharing capabilities
- Email notifications
- Multi-currency support
- Advanced analytics and reporting
