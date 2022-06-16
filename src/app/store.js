import { configureStore } from '@reduxjs/toolkit';
import wallsReducer from '../features/walls/wallsSlice';

const store = configureStore({
  reducer: {
    walls: wallsReducer,
  },
});

export default store;
