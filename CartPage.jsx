import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <section className="cart-page empty-cart">
        <div className="empty-cart-content">
          <svg
            className="empty-cart-icon large"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2>Your Cart is Empty</h2>
          <p className="muted">
            Discover our luxury collection and add your favorite items.
          </p>
          <Link to="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button onClick={clearCart} className="btn-ghost clear-cart-btn">
          Clear All Items
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items-list">
          {items.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="item-image">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="item-info">
                <h3 className="item-title">
                  <Link to={`/products/${item.id}`}>{item.title}</Link>
                </h3>
                <p className="item-category muted">{item.category}</p>
                <p className="item-price">
                  ${Number(item.price).toFixed(2)} each
                </p>
              </div>

              <div className="item-quantity">
                <label className="quantity-label">Quantity</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="quantity-input"
                    min="1"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="item-total">
                <p className="total-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                  aria-label="Remove item from cart"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal ({items.length} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">Free</span>
            </div>

            <div className="summary-row">
              <span>Tax</span>
              <span>${(totalPrice * 0.08).toFixed(2)}</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row total">
              <strong>
                <span>Total</span>
                <span>${(totalPrice * 1.08).toFixed(2)}</span>
              </strong>
            </div>

            <div className="checkout-actions">
              <Link to="/checkout" className="btn-primary checkout-btn">
                Proceed to Checkout
              </Link>
              <Link to="/products" className="btn-outline continue-shopping">
                Continue Shopping
              </Link>
            </div>

            <div className="security-badges">
              <div className="security-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>Secure Checkout</span>
              </div>
              <div className="security-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path>
                  <path d="M8 15v-4a4 4 0 0 1 8 0v4"></path>
                </svg>
                <span>SSL Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
