import {configureStore} from '@reduxjs/toolkit';
import tasksReducer from './slices/taskSlice';
import projectsReducer from './slices/projectSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
