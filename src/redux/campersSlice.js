import { createSlice } from '@reduxjs/toolkit';
import { fetchCampers, fetchCamperById } from '../api/campers';

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    list: [],
    filteredList: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    setCampers(state, action) {
      state.list = action.payload;
      state.filteredList = action.payload;
    },
    setFilteredCampers(state, action) {
      state.filteredList = action.payload;
    },
    resetFilteredList(state) {
      state.filteredList = []; // Reset filteredList to empty array when filters are reset state.list;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCampers loading state
      .addCase(fetchCampers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Handle fetchCampers success state
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.filteredList = action.payload;
        state.status = 'succeeded';
      })
      // Handle fetchCampers error state
      .addCase(fetchCampers.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      })
      // Handle fetchCamperById loading state
      .addCase(fetchCamperById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Handle fetchCamperById success state
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      // Handle fetchCamperById error state
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      });
  },
});

export const { setFilteredCampers, resetFilteredList } = campersSlice.actions;

export default campersSlice.reducer;
