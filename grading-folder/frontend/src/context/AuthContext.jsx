import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    const res = await axios.post(`${API_URL}/api/auth/register`, userData);
    localStorage.setItem('user', JSON.stringify(res.data));
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
    return res.data;
  };

  const login = async (credentials) => {
    const res = await axios.post(`${API_URL}/api/auth/login`, credentials);
    localStorage.setItem('user', JSON.stringify(res.data));
    localStorage.setItem('token', res.data.token);
    setUser(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
