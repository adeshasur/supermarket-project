import React, { useEffect, useState } from 'react';
import axios from 'axios';
// We are reusing the InventoryList CSS for consistent styling
// Ensure InventoryList.css or App.css contains the necessary table styles
// If you moved table styles to App.css, you can remove this import if it causes issues, 
// but keeping it is fine if the file exists.
// import './InventoryList.css'; 

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
                // Ensure your backend Controller matches this URL (/products or /api/products)
                // Based on your previous setup, we'll stick to /products or update based on your backend
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

    // Filter logic based on product name
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
                        filteredProducts.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td style={{ fontWeight: '600', color: '#343a40' }}>{item.name}</td>
                                <td style={{ color: '#666' }}>{item.description}</td>
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