import axios from 'axios';

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

const portsToTry = [5008, 5006, 5005, 5003, 5001, 5000];

// Axios response interceptor for automatic port failover fallback
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest._retry && (error.message.includes('Network Error') || error.code === 'ECONNREFUSED')) {
      originalRequest._retry = true;
      for (const port of portsToTry) {
        try {
          const directUrl = `http://127.0.0.1:${port}/api${originalRequest.url.replace('/api', '')}`;
          console.log(`[API Retry]: Trying direct backend http://127.0.0.1:${port}...`);
          const res = await axios.get(directUrl, { params: originalRequest.params });
          return res;
        } catch (e) {
          // continue checking next port
        }
      }
    }
    return Promise.reject(error);
  }
);

// Foods API
export const getFoods = async (params = {}) => {
  try {
    const response = await api.get('/foods', { params });
    return response.data;
  } catch (err) {
    for (const port of portsToTry) {
      try {
        const directRes = await axios.get(`http://127.0.0.1:${port}/api/foods`, { params });
        if (directRes.data && directRes.data.success) {
          return directRes.data;
        }
      } catch (e) {}
    }
    throw err;
  }
};

export const getFoodById = async (id) => {
  const response = await api.get(`/foods/${id}`);
  return response.data;
};

export const createFood = async (foodData) => {
  try {
    const response = await api.post('/foods', foodData);
    return response.data;
  } catch (err) {
    for (const port of portsToTry) {
      try {
        const directRes = await axios.post(`http://127.0.0.1:${port}/api/foods`, foodData);
        if (directRes.data && directRes.data.success) return directRes.data;
      } catch (e) {}
    }
    throw err;
  }
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
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (err) {
    for (const port of portsToTry) {
      try {
        const directRes = await axios.get(`http://127.0.0.1:${port}/api/categories`);
        if (directRes.data && directRes.data.success) return directRes.data;
      } catch (e) {}
    }
    throw err;
  }
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
