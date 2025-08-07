import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const addTask = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

const updateTask = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

const taskService = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};

export default taskService;
