import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/taskSlice.js';
import authReducer from '../features/auth/authSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});
