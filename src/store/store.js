import { configureStore } from '@reduxjs/toolkit';
import ProfileReducer from './ProfileListSlice';

const store = configureStore({
  reducer: {
    profile: ProfileReducer,
  },
});

export default store;
