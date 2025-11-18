import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../api/product";
import SearchBar from "../components/SearchBar";
import {
  ProductRating,
  WishlistButton,
  AddToCartButton,
} from "../components/ProductFeatures";

export default function ProductList() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setAllProducts(data);
      setFilteredProducts(data);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(data.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = allProducts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [allProducts, searchTerm, selectedCategory]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  async function handleDelete(id) {
    if (!window.confirm("Delete this product? (API won't persist)")) return;
    try {
      await deleteProduct(id);
      const updatedProducts = allProducts.filter((p) => p.id !== id);
      setAllProducts(updatedProducts);
      alert("Delete reported successful (mock API).");
    } catch (e) {
      alert("Delete failed: " + e.message);
    }
  }

  if (loading)
    return (
      <div className="container">
        <div className="loading-grid">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="product-card skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container">
        <p className="error">Error: {error}</p>
      </div>
    );

  return (
    <div className="container">
      <section className="products-page">
        <div className="page-header">
          <div className="page-title-section">
            <h2 className="page-title">Our Collection</h2>
            <p className="page-subtitle">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </p>
          </div>

          <SearchBar
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            categories={categories}
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <div className="no-products-content">
              <svg
                className="no-products-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
              <h3>No products found</h3>
              <p className="muted">
                Try adjusting your search terms or browse all categories
              </p>
              {(searchTerm || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="btn-outline"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
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
                    <div className="quick-actions">
                      <Link
                        to={`/products/${product.id}/edit`}
                        className="edit-btn"
                        title="Edit"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="delete-btn"
                        title="Delete"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <polyline points="3,6 5,6 21,6"></polyline>
                          <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product-info">
                  <p className="product-category">{product.category}</p>
                  <h3 className="product-title">
                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                  </h3>
                  <ProductRating
                    rating={4.0 + Math.random()}
                    reviews={Math.floor(Math.random() * 500)}
                  />
                  <div className="product-footer">
                    <p className="product-price">
                      ${Number(product.price).toFixed(2)}
                    </p>
                    <AddToCartButton product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
