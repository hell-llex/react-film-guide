import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  items: [];
} = {
  items: [],
};

const filmGuideSlice = createSlice({
  name: 'filmGuide',
  initialState,
  reducers: {},
});

export const filmGuideReducer = filmGuideSlice.reducer;
export const { } = filmGuideSlice.actions;
