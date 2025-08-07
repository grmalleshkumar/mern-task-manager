import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/auth/';

// Register user
const register = async (userData) => {
  const res = await axios.post(API_URL + 'register', userData);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

// Login user
const login = async (userData) => {
  const res = await axios.post(API_URL + 'login', userData);
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }
  return res.data;
};

// Logout
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
