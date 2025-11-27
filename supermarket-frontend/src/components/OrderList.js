import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TableStyles.css';

function OrderList({ refreshKey, searchTerm }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            // Backend URL (Port 8084)
            // වැදගත්: ඔයාගේ Backend Controller එකේ @RequestMapping("/api/orders") තියෙන්න ඕනේ
            const res = await axios.get("http://localhost:8084/api/orders");
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
            // Backend එක නැති උනාම වැටෙන්න ඕන නම් විතරක් මේ Mock Data තියාගන්න
            // setOrders([]); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [refreshKey]);

    // Search Logic (Client Side)
    const filteredOrders = orders.filter(order =>
        order.customerId?.toString().includes(searchTerm) ||
        order.id?.toString().includes(searchTerm)
    );

    const handleDeleteOrder = async (id) => {
        if (window.confirm("Delete Order ID: " + id + "?")) {
            try {
                await axios.delete(`http://localhost:8084/api/orders/${id}`);
                fetchOrders(); // Refresh List
            } catch (error) {
                alert("Failed to delete. Check backend.");
            }
        }
    };

    if (loading) return <div className="inventory-table-container" style={{ textAlign: 'center', padding: '50px' }}><h3>Loading Orders...</h3></div>;

    return (
        <div className="inventory-table-container">
            <h3>Recent Orders</h3>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center' }}>No orders found.</td></tr>
                    ) : (
                        filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.customerId}</td>
                                <td>
                                    {order.orderDate
                                        ? new Date(order.orderDate).toLocaleDateString()
                                        : "N/A"}
                                </td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#28a745' }}>
                                    Rs. {order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleDeleteOrder(order.id)}
                                        style={{
                                            background: 'transparent', border: '1px solid #dc3545',
                                            color: '#dc3545', padding: '5px 10px', borderRadius: '5px',
                                            cursor: 'pointer', fontWeight: '600'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;