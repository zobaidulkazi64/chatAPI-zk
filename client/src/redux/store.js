// store.js
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '@/redux/features/posts/todosSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
