import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Forms / state
  const [newOrderCustomerId, setNewOrderCustomerId] = useState("");
  const [searchCustomerId, setSearchCustomerId] = useState("");
  const [itemForm, setItemForm] = useState({
    orderId: "",
    productId: "",
    quantity: "",
    price: ""
  });

  // Edit order modal
  const [editingOrder, setEditingOrder] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const API = "http://localhost:8084/api/orders";

  // -------------------------
  // Fetch orders
  // -------------------------
  const fetchOrders = async () => {
    try {
      setLoading(true);
      let url = API;
      if (searchCustomerId) url = `${API}/search?customerId=${searchCustomerId}`;
      const res = await axios.get(url);
      const safe = res.data.map(o => ({ ...o, orderItems: o.orderItems || [] }));
      setOrders(safe);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchCustomerId]);

  // -------------------------
  // Create order
  // -------------------------
  const handleCreateOrder = async () => {
    if (!newOrderCustomerId) return alert("Enter Customer ID");
    try {
      await axios.post(API, { customerId: Number(newOrderCustomerId) });
      setNewOrderCustomerId("");
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to create order.");
    }
  };

  // -------------------------
  // Update order
  // -------------------------
  const handleUpdateOrder = async () => {
    if (!editingOrder || !editingOrder.customerId) return alert("Customer ID required");
    try {
      await axios.put(`${API}/${editingOrder.id}`, { customerId: Number(editingOrder.customerId) });
      setShowEdit(false);
      setEditingOrder(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update order.");
    }
  };

  // -------------------------
  // Delete order
  // -------------------------
  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to delete order.");
    }
  };

  // -------------------------
  // Add item
  // -------------------------
  const handleAddItem = async () => {
    const { orderId, productId, quantity, price } = itemForm;
    if (!orderId || !productId || !quantity || !price) return alert("Fill all item fields");
    try {
      await axios.post(`${API}/${orderId}/items`, {
        productId: Number(productId),
        quantity: Number(quantity),
        price: Number(price)
      });
      setItemForm({ orderId: "", productId: "", quantity: "", price: "" });
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to add item.");
    }
  };

  // -------------------------
  // Delete item
  // -------------------------
  const handleDeleteItem = async (orderId, itemId) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`${API}/${orderId}/items/${itemId}`);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to delete item.");
    }
  };

  // -------------------------
  // Format date
  // -------------------------
  const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "";

  return (
    <div className="container my-4">

      {/* HEADER */}
      <header className="d-flex align-items-center justify-content-between mb-4 p-3 bg-light rounded">
        <div className="d-flex align-items-center">
          <div style={{
            width: 60, height: 60, background: "#ddd", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12
          }}>
            <strong>LOGO</strong>
          </div>
          <div>
            <h4 className="mb-0">Supermarket Admin Panel</h4>
            <small className="text-muted">Order Management</small>
          </div>
        </div>
        <button className="btn btn-outline-secondary" onClick={() => fetchOrders()}>Refresh</button>
      </header>

      {/* SEARCH */}
      <div className="card p-3 mb-3">
        <div className="d-flex gap-2">
          <input
            type="number"
            className="form-control"
            placeholder="Search by Customer ID"
            value={searchCustomerId}
            onChange={e => setSearchCustomerId(e.target.value)}
          />
          <button className="btn btn-secondary" onClick={fetchOrders}>Search</button>
        </div>
      </div>

      <div className="row">
        {/* LEFT PANEL: Create order + Add item */}
        <div className="col-lg-4">

          <div className="card p-3 mb-3">
            <h5>Create Order</h5>
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Customer ID"
              value={newOrderCustomerId}
              onChange={e => setNewOrderCustomerId(e.target.value)}
            />
            <button className="btn btn-success w-100" onClick={handleCreateOrder}>Create Order</button>
          </div>

          <div className="card p-3 mb-3">
            <h5>Add Item to Order</h5>
            <select
              className="form-select mb-2"
              value={itemForm.orderId}
              onChange={e => setItemForm({ ...itemForm, orderId: e.target.value })}
            >
              <option value="">Select Order</option>
              {orders.map(o => <option key={o.id} value={o.id}>Order #{o.id} (Cust {o.customerId})</option>)}
            </select>
            <input type="number" className="form-control mb-2" placeholder="Product ID" value={itemForm.productId} onChange={e => setItemForm({ ...itemForm, productId: e.target.value })} />
            <input type="number" className="form-control mb-2" placeholder="Quantity" value={itemForm.quantity} onChange={e => setItemForm({ ...itemForm, quantity: e.target.value })} />
            <input type="number" className="form-control mb-2" placeholder="Price" value={itemForm.price} onChange={e => setItemForm({ ...itemForm, price: e.target.value })} />
            <button className="btn btn-primary w-100" onClick={handleAddItem}>Add Item</button>
          </div>

        </div>

        {/* RIGHT PANEL: Orders list */}
        <div className="col-lg-8">
          <div className="card p-3">
            <h5>Orders</h5>
            {loading ? <p>Loading...</p> : (
              orders.length === 0 ? <p className="text-muted">No orders found.</p> : (
                <div>
                  {orders.map(order => (
                    <div key={order.id} className="border rounded p-2 mb-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Order #{order.id}</strong> (Cust {order.customerId})<br />
                          <small className="text-muted">Date: {formatDate(order.orderDate)}</small>
                        </div>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-primary" onClick={() => { setEditingOrder({ ...order }); setShowEdit(true); }}>Edit</button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                        </div>
                      </div>

                      <div className="mt-2">
                        <strong>Items:</strong>
                        {order.orderItems.length === 0 ? <p className="text-muted mb-0">No items</p> : (
                          <table className="table table-sm mt-1">
                            <thead>
                              <tr>
                                <th>Product ID</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.orderItems.map(it => (
                                <tr key={it.id}>
                                  <td>{it.productId}</td>
                                  <td>{it.quantity}</td>
                                  <td>{it.price}</td>
                                  <td>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteItem(order.id, it.id)}>Delete</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showEdit && editingOrder && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Order #{editingOrder.id}</h5>
                <button type="button" className="btn-close" onClick={() => { setShowEdit(false); setEditingOrder(null); }}></button>
              </div>
              <div className="modal-body">
                <label>Customer ID</label>
                <input type="number" className="form-control" value={editingOrder.customerId} onChange={e => setEditingOrder({ ...editingOrder, customerId: e.target.value })} />
                <small className="text-muted">Only Customer ID can be edited. Total is calculated from items.</small>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => { setShowEdit(false); setEditingOrder(null); }}>Cancel</button>
                <button className="btn btn-primary" onClick={handleUpdateOrder}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-4 text-center text-muted">
        <hr />
        <small>Supermarket System • Order Service • 2025</small>
      </footer>
    </div>
  );
}

export default OrderPage;
