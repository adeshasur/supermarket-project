import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import '../styles/TableStyles.css'; 

function CustomerList({ refreshKey, searchTerm = '' }) { 
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            setLoading(true);
            
            // --- 🔴 MOCK DATA ---
            const mockCustomers = [
                { id: 1, name: "Saman Perera", email: "saman@gmail.com", address: "123, Galle Rd, Colombo" },
                { id: 2, name: "Nimali Silva", email: "nimali@yahoo.com", address: "45, Kandy Rd, Gampaha" },
                { id: 3, name: "Kamal Dias", email: "kamal@gmail.com", address: "89, Negombo Rd, Wattala" },
            ];

            setTimeout(() => {
                setCustomers(mockCustomers);
                setLoading(false);
            }, 500);
        };
        fetchCustomers();
    }, [refreshKey]); 

    const filteredCustomers = customers.filter(item => {
        const term = searchTerm.toLowerCase();
        return item.name.toLowerCase().includes(term) || 
               item.email.toLowerCase().includes(term);
    });

    if (loading) return <div className="inventory-table-container"><h3 style={{textAlign:'center'}}>Loading Customers...</h3></div>;

    return (
        <div className="inventory-table-container">
            <h3>Customer Directory</h3>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.length === 0 ? (
                        <tr><td colSpan="4" style={{ textAlign: 'center' }}>No customers found.</td></tr>
                    ) : (
                        filteredCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td style={{ fontWeight: '600', color: '#343a40' }}>{customer.name}</td>
                                <td style={{ color: '#007aff' }}>{customer.email}</td>
                                <td>{customer.address}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerList;