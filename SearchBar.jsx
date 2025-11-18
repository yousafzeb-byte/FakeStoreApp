import React, { useState, useEffect } from "react";

export default function SearchBar({
  onSearch,
  onCategoryChange,
  categories = [],
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="clear-search"
              aria-label="Clear search"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {categories.length > 0 && (
          <div className="category-selector">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`category-btn ${isOpen ? "open" : ""}`}
            >
              <span className="category-text">
                {selectedCategory === "all"
                  ? "All Categories"
                  : selectedCategory}
              </span>
              <svg
                className="dropdown-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>

            {isOpen && (
              <div className="category-dropdown">
                <button
                  onClick={() => handleCategorySelect("all")}
                  className={`category-option ${
                    selectedCategory === "all" ? "active" : ""
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`category-option ${
                      selectedCategory === category ? "active" : ""
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search suggestions or recent searches could go here */}
      {searchTerm && (
        <div className="search-suggestions">
          <p className="search-hint">
            Press Enter to search for "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}
