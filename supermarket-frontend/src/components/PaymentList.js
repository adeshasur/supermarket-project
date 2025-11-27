import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import '../styles/TableStyles.css'; 

function PaymentList({ refreshKey, searchTerm = '' }) { 
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            
            // --- 🔴 MOCK DATA ---
            const mockPayments = [
                { id: 501, orderId: 101, amount: 4500.00, paymentMethod: 'Card', paymentStatus: 'COMPLETED' },
                { id: 502, orderId: 102, amount: 1250.50, paymentMethod: 'Cash', paymentStatus: 'PENDING' },
                { id: 503, orderId: 103, amount: 8500.00, paymentMethod: 'Card', paymentStatus: 'FAILED' },
            ];

            setTimeout(() => {
                setPayments(mockPayments);
                setLoading(false);
            }, 500);
        };
        fetchPayments();
    }, [refreshKey]); 

    const filteredPayments = payments.filter(item => 
        item.orderId.toString().includes(searchTerm)
    );

    if (loading) return <div className="inventory-table-container"><h3 style={{textAlign:'center'}}>Loading Payments...</h3></div>;

    return (
        <div className="inventory-table-container">
            <h3>Transaction History</h3>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Pay ID</th>
                        <th>Order ID</th>
                        <th>Amount (LKR)</th>
                        <th>Method</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPayments.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center' }}>No payments found.</td></tr>
                    ) : (
                        filteredPayments.map((pay) => (
                            <tr key={pay.id}>
                                <td>#{pay.id}</td>
                                <td>{pay.orderId}</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                    {pay.amount.toFixed(2)}
                                </td>
                                <td style={{textAlign: 'center'}}>{pay.paymentMethod}</td>
                                <td>
                                    <div className="status-cell">
                                        <span 
                                            className="status-dot" 
                                            style={{ backgroundColor: pay.paymentStatus === 'COMPLETED' ? '#28a745' : pay.paymentStatus === 'PENDING' ? '#ffc107' : '#dc3545' }}
                                        ></span>
                                        <span style={{ color: pay.paymentStatus === 'COMPLETED' ? '#28a745' : pay.paymentStatus === 'PENDING' ? '#ffc107' : '#dc3545', fontWeight: 'bold' }}>
                                            {pay.paymentStatus}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentList;