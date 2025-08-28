import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

  // Check if user is authenticated on app load
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await apiCall('/auth/me', {
        credentials: 'include' // Include cookies
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        fetchFavorites();
      } else {
        // Token is invalid or user not logged in
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    if (!user) return;
    
    try {
      const response = await apiCall('/auth/favorites', {
        credentials: 'include'
      });

      if (response.ok) {
        const favoritesData = await response.json();
        setFavorites(favoritesData);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await apiCall('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        fetchFavorites();
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await apiCall('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const logout = async () => {
    try {
      // Call backend logout to clear httpOnly cookie
      await apiCall('/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of backend response
      setUser(null);
      setFavorites([]);
      
      // Redirect to merch shop if on protected pages
      const currentPath = window.location.pathname;
      if (currentPath === '/settings' || currentPath === '/favorites') {
        window.location.href = '/merch';
      }
    }
  };

  const addToFavorites = async (product) => {
    if (!user) return { success: false, error: 'Please login to add favorites' };

    try {
      const response = await apiCall('/auth/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          sellableId: product.sellableId,
          name: product.name,
          productTypeName: product.productTypeName,
          price: product.price,
          previewImage: product.previewImage
        })
      });

      const data = await response.json();

      if (response.ok) {
        fetchFavorites(); // Refresh favorites
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Add to favorites error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const removeFromFavorites = async (sellableId) => {
    if (!user) return { success: false, error: 'Please login first' };

    try {
      const response = await apiCall(`/auth/favorites/${sellableId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        fetchFavorites(); // Refresh favorites
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Remove from favorites error:', error);
      return { success: false, error: 'Network error' };
    }
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