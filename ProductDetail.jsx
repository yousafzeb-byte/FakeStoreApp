import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchProduct, deleteProduct } from "../api/product";

export default function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await fetchProduct(id);
        if (!cancelled) setProduct(data);
      } catch (e) {
        if (!cancelled) setErr(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleDelete() {
    if (
      !window.confirm(
        "Delete this product? (FakeStore API will respond success but won't persist)"
      )
    )
      return;
    try {
      await deleteProduct(id);
      alert("Delete reported successful (mock). Returning to products list.");
      nav("/products");
    } catch (e) {
      alert("Delete failed: " + e.message);
    }
  }

  if (loading) return <p className="muted">Loading product…</p>;
  if (err) return <p className="error">{err}</p>;
  if (!product) return <p className="muted">Product not found.</p>;

  return (
    <article className="product-hero">
      <div className="hero-media">
        <div className="media-frame">
          <img src={product.image} alt={product.title} />
        </div>
      </div>

      <div className="hero-info">
        <h1 className="hero-title">{product.title}</h1>
        <p className="hero-cat muted">{product.category}</p>
        <p className="hero-price">${Number(product.price).toFixed(2)}</p>
        <p className="hero-desc">{product.description}</p>

        <div className="hero-actions">
          <Link to={`/products/${id}/edit`} className="btn-primary">
            Edit Product
          </Link>
          <button onClick={handleDelete} className="btn-danger">
            Delete
          </button>
          <Link to="/products" className="link subtle">
            Back to collection
          </Link>
        </div>
      </div>
    </article>
  );
}
