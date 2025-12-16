import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const shopApi = {
  // Products
  async getProducts() {
    const response = await api.get('/api/products/');
    return response.data;
  },

  async getProduct(productId) {
    const response = await api.get(`/api/products/${productId}`);
    return response.data;
  },

  async getProductsByCategory(categoryId) {
    const response = await api.get(`/api/products/category/${categoryId}`);
    return response.data;
  },

  // Categories
  async getCategories() {
    const response = await api.get('/api/categories/');
    return response.data;
  },

  async getCategory(categoryId) {
    const response = await api.get(`/api/categories/${categoryId}`);
    return response.data;
  },

  // Cart
  async getCart(cartData) {
    const response = await api.post('/api/cart', cartData);
    return response.data;
  },

  async addToCart(data) {
    const response = await api.post('/api/cart/add', data);
    return response.data;
  },

  async updateCart(data) {
    const response = await api.put('/api/cart/update', data);
    return response.data;
  },

  async removeFromCart(productId, cartData) {
    const response = await api.delete(`/api/cart/remove/${productId}`, {
      data: cartData,
    });
    return response.data;
  },
};