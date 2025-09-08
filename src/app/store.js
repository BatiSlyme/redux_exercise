import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/Counter/counterSlice';
import postReducer from '../features/Posts/postsSlice';
import usersReducer from '../features/Users/usersSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    users: usersReducer,
  },
});
