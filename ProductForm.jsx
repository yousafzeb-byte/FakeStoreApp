import React, { useEffect, useState } from "react";
import { createProduct, fetchProduct, updateProduct } from "../api/product";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm({ editMode = false }) {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const [loading, setLoading] = useState(editMode);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!editMode) return;
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const p = await fetchProduct(id);
        if (!cancelled)
          setForm({
            title: p.title || "",
            price: String(p.price || ""),
            description: p.description || "",
            image: p.image || "",
            category: p.category || "",
          });
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
  }, [editMode, id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.price) {
      alert("Please fill out title and price.");
      return;
    }
    const payload = {
      title: form.title,
      price: parseFloat(form.price),
      description: form.description,
      image: form.image || "https://via.placeholder.com/600x600?text=Product",
      category: form.category || "other",
    };

    try {
      setSaving(true);
      if (editMode) {
        await updateProduct(id, payload);
        alert("Update reported successful (mock).");
        nav(`/products/${id}`);
      } else {
        const result = await createProduct(payload);
        alert("Create reported successful (mock).");
        if (result.id) nav(`/products/${result.id}`);
        else nav("/products");
      }
    } catch (e) {
      alert("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="muted">Loading product…</p>;
  if (err) return <p className="error">{err}</p>;

  return (
    <section className="form-wrap">
      <div className="form-card">
        <h2 className="form-title">
          {editMode ? "Edit Product" : "Create New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <label className="field">
            <span className="label">Title</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Midnight Watch"
            />
          </label>

          <label className="field">
            <span className="label">Price (USD)</span>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 249.00"
            />
          </label>

          <label className="field">
            <span className="label">Category</span>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. accessories"
            />
          </label>

          <label className="field field-wide">
            <span className="label">Image URL</span>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </label>

          <label className="field field-wide">
            <span className="label">Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="6"
              placeholder="A short, elegant description."
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => history.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
