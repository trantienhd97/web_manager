import React from 'react';

const ProductDetails = ({ product }) => {
    if (!product) {
        return <div>No product selected.</div>;
    }

    return (
        <div className="product-details">
            <h2>{product.name}</h2>
            <p><strong>Code:</strong> {product.code}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
        </div>
    );
};

export default ProductDetails;