// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://morbid-gene-2-0.onrender.com';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Always include cookies for authentication
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  return response;
};

export default API_BASE_URL;