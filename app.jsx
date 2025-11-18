import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ProductForm from "./pages/ProductForm";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="app-root">
          <Navbar />
          <main className="main-content page-fade">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route
                path="/products/:id/edit"
                element={<ProductForm editMode />}
              />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="/wishlist"
                element={<Navigate to="/profile/wishlist" replace />}
              />
              <Route
                path="/orders"
                element={<Navigate to="/profile/orders" replace />}
              />
              <Route
                path="/profile/*"
                element={
                  <div className="container">
                    <h2>Profile features coming soon!</h2>
                  </div>
                }
              />
              <Route
                path="*"
                element={
                  <div className="container">
                    <h2 className="muted">Page not found</h2>
                  </div>
                }
              />
            </Routes>
          </main>
          <footer className="app-footer">
            <div className="container">
              <p className="footer-text">Made with ❤️ by Yousaf</p>
            </div>
          </footer>
        </div>
      </CartProvider>
    </UserProvider>
  );
}
