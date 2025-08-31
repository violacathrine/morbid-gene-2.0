import { createContext, useState, useContext, useEffect } from 'react';
import { apiCall } from '../config/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Helper function for common auth API call patterns
  const makeAuthCall = async (endpoint, options = {}) => {
    try {
      const response = await apiCall(endpoint, {
        credentials: 'include',
        ...options
      });
      const data = await response.json();
      return { success: response.ok, data, response };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // Check if user is authenticated on app load
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    const result = await makeAuthCall('/auth/me');
    
    if (result.success) {
      setUser(result.data);
      await fetchFavorites(result.data);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const fetchFavorites = async (userData = user) => {
    if (!userData) return;
    
    const result = await makeAuthCall('/auth/favorites');
    if (result.success) {
      setFavorites(result.data);
    }
  };

  const login = async (email, password) => {
    const result = await makeAuthCall('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (result.success) {
      setUser(result.data.user);
      await fetchFavorites(result.data.user);
      return { success: true };
    }
    return { success: false, error: result.data?.message || result.error };
  };

  const register = async (name, email, password) => {
    const result = await makeAuthCall('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    if (result.success) {
      setUser(result.data.user);
      return { success: true };
    }
    return { success: false, error: result.data?.message || result.error };
  };

  const logout = async () => {
    await makeAuthCall('/auth/logout', { method: 'POST' });
    
    // Clear local state regardless of backend response
    setUser(null);
    setFavorites([]);
    
    // Redirect to merch shop if on protected pages
    const currentPath = window.location.pathname;
    if (currentPath === '/settings' || currentPath === '/favorites') {
      window.location.href = '/merch';
    }
  };

  const addToFavorites = async (product) => {
    if (!user) return { success: false, error: 'Please login to add favorites' };

    const result = await makeAuthCall('/auth/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sellableId: product.sellableId,
        name: product.name,
        productTypeName: product.productTypeName,
        price: product.price,
        previewImage: product.previewImage
      })
    });

    if (result.success) {
      fetchFavorites();
      return { success: true, message: result.data.message };
    }
    return { success: false, error: result.data?.message || result.error };
  };

  const removeFromFavorites = async (sellableId) => {
    if (!user) return { success: false, error: 'Please login first' };

    const result = await makeAuthCall(`/auth/favorites/${sellableId}`, {
      method: 'DELETE'
    });

    if (result.success) {
      fetchFavorites();
      return { success: true, message: result.data.message };
    }
    return { success: false, error: result.data?.message || result.error };
  };

  const isFavorite = (sellableId) => {
    return favorites.some(fav => fav.sellableId === sellableId);
  };

  const value = {
    user,
    loading,
    favorites,
    login,
    register,
    logout,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};