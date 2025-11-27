import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderList({ refreshKey, searchTerm, setOrdersForForm }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            let url = "http://localhost:8084/api/orders";
            
            const res = await axios.get(url);
            let data = res.data;

            if (searchTerm) {
                data = data.filter(order => 
                    order.customerId.toString().includes(searchTerm) || 
                    order.id.toString().includes(searchTerm)
                );
            }

            setOrders(data);
            if(setOrdersForForm) {
                setOrdersForForm(data); // Pass data up for the dropdown
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [refreshKey, searchTerm]);

    const handleDeleteOrder = async (id) => {
        if (window.confirm("Are you sure you want to delete Order #" + id + "?")) {
            await axios.delete(`http://localhost:8084/api/orders/${id}`);
            fetchOrders();
        }
    };

    if (loading) return <div className="inventory-table-container" style={{textAlign:'center', padding:'50px'}}><h3>Loading...</h3></div>;

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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr><td colSpan="5" style={{textAlign:'center'}}>No orders found.</td></tr>
                    ) : (
                        orders.map((order) => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.customerId}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td style={{textAlign:'right', fontWeight:'bold', color:'#28a745'}}>
                                    Rs. {order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                                </td>
                                <td style={{textAlign:'center'}}>
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

// 🔴 IMPORTANT: Ensure this default export exists!
export default OrderList;