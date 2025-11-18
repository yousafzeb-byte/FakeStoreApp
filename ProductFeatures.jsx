import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useCart } from "../contexts/CartContext";

export function WishlistButton({ product, className = "" }) {
  const { isAuthenticated, isInWishlist, addToWishlist, removeFromWishlist } =
    useUser();

  if (!isAuthenticated) {
    return null;
  }

  const inWishlist = isInWishlist(product.id);

  const handleToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`wishlist-btn ${inWishlist ? "active" : ""} ${className}`}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg
        viewBox="0 0 24 24"
        fill={inWishlist ? "currentColor" : "none"}
        stroke="currentColor"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  );
}

export function ProductRating({
  rating = 4.2,
  reviews = 0,
  showReviews = true,
}) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="product-rating">
      <div className="stars">
        {Array.from({ length: fullStars }, (_, i) => (
          <svg
            key={`full-${i}`}
            className="star filled"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            className="star half-filled"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <defs>
              <linearGradient id="half-fill">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill="url(#half-fill)"
            />
          </svg>
        )}
        {Array.from({ length: emptyStars }, (_, i) => (
          <svg
            key={`empty-${i}`}
            className="star empty"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
          </svg>
        ))}
      </div>
      {showReviews && (
        <span className="rating-text">
          {rating.toFixed(1)} {reviews > 0 && `(${reviews} reviews)`}
        </span>
      )}
    </div>
  );
}

export function ProductBadge({ type, children }) {
  return <span className={`product-badge ${type}`}>{children}</span>;
}

export function AddToCartButton({ product, className = "", size = "medium" }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);

    // Visual feedback
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsAdding(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`add-to-cart-btn ${size} ${className}`}
      disabled={isAdding}
    >
      {isAdding ? (
        <>
          <svg className="spinner" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="15.708 7.854"
              strokeDashoffset="0"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="1s"
                repeatCount="indefinite"
                values="0 12 12;360 12 12"
              />
            </circle>
          </svg>
          Adding...
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
}

export function RelatedProducts({ currentProductId, category }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        setLoading(true);
        // Fetch products from the same category
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        const products = await response.json();

        // Filter out current product and limit to 4
        const filtered = products
          .filter((p) => p.id !== parseInt(currentProductId))
          .slice(0, 4);

        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    }

    if (category && currentProductId) {
      fetchRelated();
    }
  }, [currentProductId, category]);

  if (loading) {
    return (
      <section className="related-products">
        <h3>You might also like</h3>
        <div className="related-grid loading">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="related-item skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="related-products">
      <h3>You might also like</h3>
      <div className="related-grid">
        {relatedProducts.map((product) => (
          <div key={product.id} className="related-item">
            <Link to={`/products/${product.id}`} className="related-link">
              <img src={product.image} alt={product.title} loading="lazy" />
              <h4>{product.title}</h4>
              <ProductRating
                rating={4.1 + Math.random()}
                reviews={Math.floor(Math.random() * 200)}
              />
              <p className="price">${Number(product.price).toFixed(2)}</p>
            </Link>
            <AddToCartButton product={product} size="small" />
          </div>
        ))}
      </div>
    </section>
  );
}
