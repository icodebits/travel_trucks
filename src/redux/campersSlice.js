import { createSlice } from '@reduxjs/toolkit';
import { getCampers } from '../api/campers';

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
    resetFilters(state) {
      state.filteredList = state.list;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCampers, setFilteredCampers, resetFilters, setStatus, setError } = campersSlice.actions;

export const fetchCampers = () => async (dispatch) => {
  dispatch(setStatus('loading'));
  try {
    const response = await getCampers();
    dispatch(setCampers(response.data.items));
    dispatch(setStatus('succeeded'));
  } catch (error) {
    dispatch(setError(error.toString()));
    dispatch(setStatus('failed'));
  }
};

export default campersSlice.reducer;
