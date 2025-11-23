import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import ProductForm from "./components/ProductForm";

export default function App() {
  return (
    <div className="container py-3">
      <nav className="navbar navbar-light bg-light rounded mb-3 px-3">
        <Link className="navbar-brand fw-semibold" to="/">
          Supermarket - Products
        </Link>
    
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/add" element={<ProductForm mode="add" />} />
        <Route path="/edit/:id" element={<ProductForm mode="edit" />} />
      </Routes>
    </div>
  );
}
