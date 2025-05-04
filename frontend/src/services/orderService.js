import api from './api';

// Using individual functions as exports for components that import them by name
export const getOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};

export const getOrderById = async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
};

export const createOrder = async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

export const updateOrder = async (id, orderData) => {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
};

export const deleteOrder = async (id) => {
    await api.delete(`/orders/${id}`);
};

// Also export as a default object for components that import the whole service
const orderService = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};

export default orderService;