import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartIcon } from "./CartComponents";
import { UserMenu } from "./UserComponents";

export default function Navbar() {
  const loc = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav-hero ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav container">
        <div className="brand-wrap">
          <Link to="/" className="brand">
            <span className="brand-mark">✦</span>
            <span className="brand-text">FAKESTORE</span>
          </Link>
          <p className="tagline">Curated • Refined • Timeless</p>
        </div>

        <nav className="nav-center">
          <Link
            className={loc.pathname === "/" ? "link active" : "link"}
            to="/"
          >
            Home
          </Link>
          <Link
            className={
              loc.pathname.startsWith("/products") ? "link active" : "link"
            }
            to="/products"
          >
            Shop
          </Link>
          <Link
            className={loc.pathname === "/wishlist" ? "link active" : "link"}
            to="/wishlist"
          >
            Wishlist
          </Link>
          <Link className="link" to="/products/new">
            Create
          </Link>
        </nav>

        <div className="nav-actions">
          <CartIcon />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
