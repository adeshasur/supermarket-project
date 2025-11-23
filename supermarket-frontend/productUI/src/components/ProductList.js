import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE from "../api";

export default function ProductList() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/products`);
      setItems(data);
    } catch (err) {
      console.error("Error loading products", err);
      alert("Failed to load products. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = items.filter((p) =>
    [p.name, p.description].join(" ").toLowerCase().includes(q.toLowerCase())
  );

  const remove = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      await load();
    } catch (err) {
      console.error("Error deleting", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <>
      {/* Top bar: search + add button */}
      <div className="d-flex gap-2 mb-4">
        <input
          className="form-control"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products…"
        />
        <Link className="btn btn-primary" to="/add">
          + Add Product
        </Link>
      </div>

      {loading ? (
        <div className="text-muted">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-muted mt-4">No products found.</div>
      ) : (
        <div className="row g-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card product-card h-100 shadow-sm border-0">
                {/* Image */}
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="card-img-top product-card-img"
                  />
                )}

                {/* Card body */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-1">
                    <Link to={`/products/${p.id}`} className="text-decoration-none">
                      {p.name}
                    </Link>
                  </h5>

                  <p className="card-text text-muted mb-2" style={{ fontSize: "0.9rem" }}>
                    {p.description?.length > 60
                      ? p.description.slice(0, 60) + "…"
                      : p.description}
                  </p>

                  <div className="fw-semibold mb-2">Rs. {p.price}</div>

                  {/* Buttons at bottom */}
                  <div className="mt-auto d-flex gap-2">
                    <Link
                      className="btn btn-outline-primary btn-sm flex-fill"
                      to={`/edit/${p.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm flex-fill"
                      onClick={() => remove(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
