import axios from 'axios';

// API Base URL:
// In Vercel production, calls to '/api/foods' are routed directly to Express serverless function
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return '/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Foods API
export const getFoods = async (params = {}) => {
  const response = await api.get('/foods', { params });
  return response.data;
};

export const getFoodById = async (id) => {
  const response = await api.get(`/foods/${id}`);
  return response.data;
};

export const createFood = async (foodData) => {
  const response = await api.post('/foods', foodData);
  return response.data;
};

export const updateFood = async (id, foodData) => {
  const response = await api.put(`/foods/${id}`, foodData);
  return response.data;
};

export const toggleAvailability = async (id) => {
  const response = await api.patch(`/foods/${id}/toggle-availability`);
  return response.data;
};

export const deleteFood = async (id) => {
  const response = await api.delete(`/foods/${id}`);
  return response.data;
};

// Categories API
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post('/categories', categoryData);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

export default api;
