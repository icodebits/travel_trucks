import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campersSlice';
import filtersReducer from './filtersSlice';
import favoritesReducer from './favoritesSlice';

const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});

// Middleware to sync with localStorage
store.subscribe(() => {
  const favorites = store.getState().favorites.list;
  localStorage.setItem('favorites', JSON.stringify(favorites));
});

export default store;
