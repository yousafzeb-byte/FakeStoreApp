import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/product";
import {
  ProductRating,
  WishlistButton,
  AddToCartButton,
} from "../components/ProductFeatures";

export default function LandingPage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        setLoading(true);
        const products = await fetchProducts();
        // Get random featured products
        const shuffled = products.sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 8));
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Curated Luxury
              <span className="hero-accent">Redefined</span>
            </h1>
            <p className="hero-description">
              Discover our exclusive collection of premium products, carefully
              selected for the discerning individual who values elegance,
              quality, and timeless design.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn-primary hero-cta">
                Explore Collection
              </Link>
              <Link to="/products/new" className="btn-outline">
                Add Product
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-grid">
              <div className="hero-image primary">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                  alt="Luxury products showcase"
                />
              </div>
              <div className="hero-image secondary">
                <img
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop"
                  alt="Premium accessories"
                />
              </div>
              <div className="hero-image tertiary">
                <img
                  src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop"
                  alt="Elegant design"
                />
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Premium Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">50k+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.9</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Explore our carefully curated categories
            </p>
          </div>

          <div className="categories-grid">
            <Link to="/products" className="category-card electronics">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop"
                  alt="Electronics"
                />
              </div>
              <div className="category-content">
                <h3>Electronics</h3>
                <p>Latest tech and gadgets</p>
                <span className="category-arrow">→</span>
              </div>
            </Link>

            <Link to="/products" className="category-card jewelry">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop"
                  alt="Jewelry"
                />
              </div>
              <div className="category-content">
                <h3>Jewelry</h3>
                <p>Elegant accessories</p>
                <span className="category-arrow">→</span>
              </div>
            </Link>

            <Link to="/products" className="category-card clothing">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop"
                  alt="Clothing"
                />
              </div>
              <div className="category-content">
                <h3>Fashion</h3>
                <p>Premium apparel</p>
                <span className="category-arrow">→</span>
              </div>
            </Link>

            <Link to="/products" className="category-card lifestyle">
              <div className="category-image">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
                  alt="Lifestyle"
                />
              </div>
              <div className="category-content">
                <h3>Lifestyle</h3>
                <p>Home & living</p>
                <span className="category-arrow">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Handpicked favorites from our collection
            </p>
            <Link to="/products" className="view-all-link">
              View All Products →
            </Link>
          </div>

          {loading ? (
            <div className="featured-grid loading">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="product-card skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text short"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="featured-grid">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`product-card ${index < 2 ? "featured" : ""}`}
                >
                  <div className="product-image">
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                      />
                    </Link>
                    <div className="product-overlay">
                      <WishlistButton product={product} />
                      {index < 2 && (
                        <span className="featured-badge">Featured</span>
                      )}
                    </div>
                  </div>

                  <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3 className="product-title">
                      <Link to={`/products/${product.id}`}>
                        {product.title}
                      </Link>
                    </h3>
                    <ProductRating
                      rating={4.1 + Math.random()}
                      reviews={Math.floor(Math.random() * 300)}
                    />
                    <div className="product-footer">
                      <p className="product-price">
                        ${Number(product.price).toFixed(2)}
                      </p>
                      <AddToCartButton product={product} size="small" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3>Free Worldwide Shipping</h3>
              <p>Complimentary shipping on all orders over $100</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Secure Payment</h3>
              <p>
                Your payment information is protected with industry-standard
                encryption
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
              </div>
              <h3>24/7 Support</h3>
              <p>Our customer service team is available around the clock</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
              </div>
              <h3>Easy Returns</h3>
              <p>30-day return policy for your peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Be the first to know about new arrivals and exclusive offers</p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button type="submit" className="btn-primary newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
