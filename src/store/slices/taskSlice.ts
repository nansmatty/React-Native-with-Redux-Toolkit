import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

interface ITaskState {
  tasks: ITask[];
  status: 'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED';
  error: string | null;
}

const initialState: ITaskState = {
  tasks: [],
  status: 'IDLE',
  error: null,
};

export const fetchAllTasks = createAsyncThunk('tasks/getAllTasks', async () => {
  const storedTasks = await AsyncStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
});

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: Omit<ITask, 'id'>) => {
    console.log(task);
    const newTask = {...task, id: Date.now().toString()};

    const storedTasks = await AsyncStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    tasks.push(newTask);

    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

    return newTask;
  },
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, {getState}) => {
    const state = getState() as {tasks: ITaskState};

    const updatedTasks = state.tasks.tasks.filter(item => item.id !== taskId);

    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

    return taskId;
  },
);

export const toggleTask = createAsyncThunk(
  'tasks/toggleTask',
  async (taskId: string, {getState}) => {
    const state = getState() as {tasks: ITaskState};
    const task = state.tasks.tasks.find(taskItem => taskItem.id === taskId);

    if (task) {
      const updatedTask = {...task, completed: !task.completed};
      const updatedTasks = state.tasks.tasks.map(item =>
        item.id === taskId ? updatedTask : item,
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

      return updatedTask;
    }

    throw new Error('Task not found');
  },
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllTasks.pending, state => {
        state.status = 'LOADING';
      })
      .addCase(
        fetchAllTasks.fulfilled,
        (state, action: PayloadAction<ITask[]>) => {
          state.status = 'SUCCEEDED';
          state.tasks = action.payload;
        },
      )
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message || null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter(item => item.id !== action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        const index = state.tasks.findIndex(
          item => item.id === action.payload.id,
        );

        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
