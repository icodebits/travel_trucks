import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCampers, getCamperById } from '../api/campers';

// Async action to fetch truck details by ID
export const fetchCamperById = createAsyncThunk(
  'campers/fetchCamperById',
  async (id) => {
    const response = await getCamperById(id);
    return response.data;
  }
);

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
      // Handle loading state
      .addCase(fetchCamperById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Handle success state
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      // Handle error state
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      });
  },
});

export const { setCampers, setFilteredCampers, resetFilteredList, setStatus, setError } = campersSlice.actions;

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
