const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://morbid-gene-2-0.onrender.com';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get JWT token from localStorage
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const defaultOptions = {
    headers,
    credentials: 'include', // Still include cookies as fallback
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  return response;
};

export default API_BASE_URL;