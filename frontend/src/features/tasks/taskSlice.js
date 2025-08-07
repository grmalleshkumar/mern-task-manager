import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from './taskService';

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// Get all tasks
export const fetchTasks = createAsyncThunk('tasks/fetchAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await taskService.getTasks(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Add task
export const addTask = createAsyncThunk('tasks/add', async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await taskService.addTask(data, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Update task
export const updateTask = createAsyncThunk('tasks/update', async ({ id, data }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await taskService.updateTask(id, data, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Delete task
export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    await taskService.deleteTask(id, token);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
