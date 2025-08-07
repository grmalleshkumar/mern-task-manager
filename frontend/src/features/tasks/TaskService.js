import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const getAuthConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getTasks = async (token) => {
  const res = await axios.get(API_URL, getAuthConfig(token));
  return res.data;
};

const addTask = async (data, token) => {
  const res = await axios.post(API_URL, data, getAuthConfig(token));
  return res.data;
};

const updateTask = async (id, data, token) => {
  const res = await axios.put(`${API_URL}/${id}`, data, getAuthConfig(token));
  return res.data;
};

const deleteTask = async (id, token) => {
  await axios.delete(`${API_URL}/${id}`, getAuthConfig(token));
};

const taskService = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};

export default taskService;
