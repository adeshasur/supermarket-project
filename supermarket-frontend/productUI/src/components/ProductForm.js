import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_BASE from "../api";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  imageUrl: ""
};

export default function ProductForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyProduct);
  const editing = mode === "edit";

  useEffect(() => {
    if (editing) {
      axios.get(`${API_BASE}/products/${id}`).then((res) => {
        setForm({
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          imageUrl: res.data.imageUrl || ""
        });
      });
    }
  }, [editing, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      imageUrl: form.imageUrl
    };

    try {
      if (editing) {
        await axios.put(`${API_BASE}/products/${id}`, payload);
      } else {
        await axios.post(`${API_BASE}/products`, payload);
      }
      navigate("/");
    } catch (err) {
      console.error("Save failed", err);
      alert("Could not save product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4" style={{ maxWidth: 600, margin: "0 auto" }}>
      <h3 className="mb-3">{editing ? "Edit Product" : "Add Product"}</h3>

      {/* Name */}
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          rows="3"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Price */}
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          name="price"
          type="number"
          step="0.01"
          className="form-control"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>

      {/* Image URL */}
      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          name="imageUrl"
          className="form-control"
          value={form.imageUrl}
          onChange={handleChange}
        />
      </div>

      {/* Preview */}
      {form.imageUrl && (
        <div className="mb-3 text-center">
          <img src={form.imageUrl} alt="Preview" style={{ width: "150px", borderRadius: "8px" }} />
        </div>
      )}

      <div className="mt-3">
  <button className="btn btn-success w-100 mb-3" type="submit">
    {editing ? "Update" : "Create"}
  </button>

  <button
    type="button"
    className="btn btn-secondary w-100"
    onClick={() => navigate("/")}
  >
    Cancel
  </button>
</div>

    </form>
  );
}
