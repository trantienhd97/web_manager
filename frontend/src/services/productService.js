import { api } from './api';

// No need for separate API_URL since we're using the centralized api service

export const getProducts = async () => {
    // Fetch all products from the API
    // fixbug get data all product in database
    const response = await api.get('/products');
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await api.post('/products', product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};

export const searchProducts = async (query) => {
    const response = await api.get(`/products/search`, { params: query });
    return response.data;
};

// Collect all functions into a default export object
const productService = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts
};

export default productService;