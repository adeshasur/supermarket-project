import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryList.css'; // Reusing the table styles

function ProductList({ refreshKey, searchTerm = '' }) { 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); 
                setError(null);
                
                // Fetch from Product Service (Port 8081)
                const response = await axios.get('http://localhost:8081/products');
                setProducts(response.data);
            } catch (err) {
                setError('Could not fetch products. Is Product Service (8081) running?');
                console.error(err);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [refreshKey]); 

    // Filter logic
    const filteredProducts = products.filter(item => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return (
            <div className="inventory-table-container" style={{ textAlign: 'center', padding: '50px' }}>
                <h3>Loading Products...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="inventory-table-container" style={{ borderColor: '#dc3545' }}>
                <h3 style={{ color: '#dc3545' }}>Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="inventory-table-container">
            <h3>Product Catalog</h3>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price (LKR)</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                No products found.
                            </td>
                        </tr>
                    ) : (
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryList.css'; // Reusing the table styles

function ProductList({ refreshKey, searchTerm = '' }) { 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); 
                setError(null);
                
                // Fetch from Product Service (Port 8081)
                const response = await axios.get('http://localhost:8081/products');
                setProducts(response.data);
            } catch (err) {
                setError('Could not fetch products. Is Product Service (8081) running?');
                console.error(err);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [refreshKey]); 

    // Filter logic
    const filteredProducts = products.filter(item => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return (
            <div className="inventory-table-container" style={{ textAlign: 'center', padding: '50px' }}>
                <h3>Loading Products...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="inventory-table-container" style={{ borderColor: '#dc3545' }}>
                <h3 style={{ color: '#dc3545' }}>Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="inventory-table-container">
            <h3>Product Catalog</h3>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price (LKR)</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                No products found.
                            </td>
                        </tr>
                    ) : (
                        filteredInventory.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#007aff' }}>
                                    {item.price.toFixed(2)}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;

export default ProductList;