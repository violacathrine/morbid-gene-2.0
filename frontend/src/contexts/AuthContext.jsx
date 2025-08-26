import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Check if user is authenticated on app load
  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        fetchFavorites();
      } else {
        // Token is invalid
        logout();
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    if (!token) return;
    
    try {
      const response = await fetch('/auth/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
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
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('token');
    
    // Redirect to merch shop if on protected pages
    const currentPath = window.location.pathname;
    if (currentPath === '/settings' || currentPath === '/favorites') {
      window.location.href = '/merch';
    }
  };

  const addToFavorites = async (product) => {
    if (!token) return { success: false, error: 'Please login to add favorites' };

    try {
      const response = await fetch('/auth/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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
    if (!token) return { success: false, error: 'Please login first' };

    try {
      const response = await fetch(`/auth/favorites/${sellableId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
    token,
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