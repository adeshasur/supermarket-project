import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import API_BASE from "../api";

export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/products/${id}`);
        setP(data);
      } catch (err) {
        console.error("Error loading product", err);
        setP(undefined);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="text-muted">Loading product…</div>;
  if (p === undefined) return <div className="alert alert-danger">Product not found.</div>;

  return (
    <div className="card p-3">

      {/* 🔥 BIG PRODUCT IMAGE */}
      {p.imageUrl && (
        <div className="mb-3 text-center">
          <img
            src={p.imageUrl}
            alt={p.name}
            style={{
              maxWidth: "260px",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      <h4 className="mb-3">Product #{p.id}</h4>

      <p><strong>Name:</strong> {p.name}</p>
      <p><strong>Description:</strong> {p.description}</p>
      <p><strong>Price:</strong> Rs. {p.price}</p>

      <div className="d-flex gap-2 mt-3">
        <Link to={`/edit/${p.id}`} className="btn btn-primary">Edit</Link>
        <Link to="/" className="btn btn-secondary">Back</Link>
      </div>
    </div>
  );
}
