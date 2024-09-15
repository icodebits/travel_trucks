import { createSlice } from '@reduxjs/toolkit';

const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    list: initialFavorites,
  },
  reducers: {
    addToFavorites(state, action) {
      state.list.push(action.payload);
    },
    removeFromFavorites(state, action) {
      state.list = state.list.filter(el => el !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
