import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";

export function UserMenu() {
  const { isAuthenticated, user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="user-menu">
        <LoginButton />
      </div>
    );
  }

  return (
    <div className="user-menu authenticated">
      <button
        className="user-avatar"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        <img src={user.avatar} alt={user.name} />
        <span className="user-name">{user.name.split(" ")[0]}</span>
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
        <>
          <div className="menu-overlay" onClick={() => setIsOpen(false)} />
          <div className="user-dropdown">
            <div className="user-info">
              <img src={user.avatar} alt={user.name} />
              <div>
                <h4>{user.name}</h4>
                <p className="muted">{user.email}</p>
              </div>
            </div>

            <nav className="user-nav">
              <a href="/profile" className="nav-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profile
              </a>
              <a href="/orders" className="nav-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                Orders
              </a>
              <a href="/wishlist" className="nav-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Wishlist
              </a>
              <a href="/settings" className="nav-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15-4a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM7 21a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                </svg>
                Settings
              </a>
            </nav>

            <hr className="dropdown-divider" />

            <button onClick={logout} className="nav-item logout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16,17 21,12 16,7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function LoginButton() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowLogin(true)}
        className="btn-outline login-btn"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
          <polyline points="10,17 15,12 10,7"></polyline>
          <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
        Sign In
      </button>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

export function LoginModal({ onClose }) {
  const [email, setEmail] = useState("demo@luxury.com");
  const [password, setPassword] = useState("demo123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(email, password);

    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal login-modal">
        <div className="modal-header">
          <h2>Welcome Back</h2>
          <button onClick={onClose} className="close-btn" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="demo-notice">
            <p className="muted">Demo credentials:</p>
            <p>
              <strong>Email:</strong> demo@luxury.com
            </p>
            <p>
              <strong>Password:</strong> demo123
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary login-submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
