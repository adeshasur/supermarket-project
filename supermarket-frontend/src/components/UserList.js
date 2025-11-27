import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TableStyles.css';

function UserList({ refreshKey, searchTerm }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            // CustomerController Endpoint: /api/customers
            const res = await axios.get("http://localhost:8083/api/customers");
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [refreshKey]);

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm("Delete User ID: " + id + "?")) {
            try {
                // Delete Endpoint: /api/customers/{id}
                await axios.delete(`http://localhost:8083/api/customers/${id}`);
                fetchUsers();
            } catch (error) {
                alert("Failed to delete user.");
            }
        }
    };

    if (loading) return <div className="inventory-table-container" style={{ textAlign: 'center', padding: '50px' }}><h3>Loading Users...</h3></div>;

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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr><td colSpan="5" style={{ textAlign: 'center' }}>No users found.</td></tr>
                    ) : (
                        filteredUsers.map((user) => (
                            <tr key={user.cid}> {/* Backend uses 'cid' not 'id' */}
                                <td>{user.cid}</td>
                                <td style={{ fontWeight: 'bold' }}>{user.name}</td>
                                <td style={{ color: '#007aff' }}>{user.email}</td>
                                <td>{user.address}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleDelete(user.cid)}
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

export default UserList;