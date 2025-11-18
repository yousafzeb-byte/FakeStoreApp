import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export function CartIcon() {
  const { totalItems } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="cart-icon-container">
      <button
        className="cart-icon-btn"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-label={`Cart with ${totalItems} items`}
      >
        <svg
          className="cart-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {totalItems > 0 && (
          <span className="cart-badge">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="cart-overlay"
            onClick={() => setIsDropdownOpen(false)}
          />
          <CartDropdown onClose={() => setIsDropdownOpen(false)} />
        </>
      )}
    </div>
  );
}

export function CartDropdown({ onClose }) {
  const { items, totalPrice, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-dropdown empty">
        <div className="cart-empty">
          <svg
            className="empty-cart-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h3>Your cart is empty</h3>
          <p>Add some luxury items to get started</p>
          <Link to="/products" className="btn-primary" onClick={onClose}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-dropdown">
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        <button onClick={onClose} className="close-btn" aria-label="Close cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h4 className="cart-item-title">{item.title}</h4>
              <p className="cart-item-price">
                ${Number(item.price).toFixed(2)}
              </p>
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="remove-item"
              aria-label="Remove item"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="3,6 5,6 21,6"></polyline>
                <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <strong>Total: ${totalPrice.toFixed(2)}</strong>
        </div>
        <div className="cart-actions">
          <Link to="/cart" className="btn-outline" onClick={onClose}>
            View Cart
          </Link>
          <Link to="/checkout" className="btn-primary" onClick={onClose}>
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
