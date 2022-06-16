import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  values: [2, 5, 1, 3, 1, 2, 1, 7, 7, 6, 7],
};

export const wallsSlice = createSlice({
  name: 'walls',
  initialState,
  reducers: {
    defineWalls: (state, { payload }) => {
      state.values = payload;
    },
  },
});

export const { defineWalls } = wallsSlice.actions;

export const selectWalls = (state) => state.walls.values;

export default wallsSlice.reducer;
