import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TableStyles.css';

function PaymentList({ refreshKey, searchTerm }) {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPayments = async () => {
        // Search Term එකක් නැත්නම් මුකුත් නොකර ඉමු (Backend එකේ getAll නැති නිසා)
        if (!searchTerm) {
            setPayments([]);
            return;
        }

        try {
            setLoading(true);
            // Endpoint: /api/payments/order/{orderId}
            const res = await axios.get(`http://localhost:8085/api/payments/order/${searchTerm}`);
            setPayments(res.data);
        } catch (err) {
            console.error(err);
            setPayments([]); // Error නම් ලිස්ට් එක හිස් කරමු
        } finally {
            setLoading(false);
        }
    };

    // searchTerm වෙනස් වෙනකොට හෝ refreshKey වෙනස් වෙනකොට Call එක යන්න
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchPayments();
        }, 500); // Type කරලා ඉවර වෙනකම් තත්පර 0.5ක් ඉන්නවා

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, refreshKey]);

    const handleDelete = async (id) => {
        if (window.confirm("Delete Payment ID: " + id + "?")) {
            try {
                await axios.delete(`http://localhost:8085/api/payments/${id}`);
                fetchPayments(); // Refresh
            } catch (error) {
                alert("Failed to delete payment.");
            }
        }
    };

    return (
        <div className="inventory-table-container">
            <h3>Payment History</h3>

            {/* පොඩි උපදෙසක් */}
            {!searchTerm && <p style={{ color: '#666', marginBottom: '15px', fontStyle: 'italic' }}>Type an Order ID in the search bar to view payments.</p>}

            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading...</p>
            ) : (
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Pay ID</th>
                            <th>Order ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center' }}>No payments found for this Order ID.</td></tr>
                        ) : (
                            payments.map((pay) => (
                                <tr key={pay.id}>
                                    <td>#{pay.id}</td>
                                    <td>{pay.orderId}</td>
                                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                        {pay.amount.toFixed(2)}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span style={{
                                            background: '#d1fae5', color: '#059669',
                                            padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'
                                        }}>
                                            {pay.paymentStatus}
                                        </span>
                                    </td>
                                    <td>
                                        {pay.paymentDate ? new Date(pay.paymentDate).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button
                                            onClick={() => handleDelete(pay.id)}
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
            )}
        </div>
    );
}

export default PaymentList;