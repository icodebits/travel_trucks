import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    location: '',
    type: '',
    hasAC: false,
    hasKitchen: false,
    hasBathroom: false,
    hasTV: false,
    transmission: '',
  },
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setHasAC(state, action) {
      state.hasAC = action.payload;
    },
    setHasKitchen(state, action) {
      state.hasKitchen = action.payload;
    },
    setHasBathroom(state, action) {
      state.hasBathroom = action.payload;
    },
    setHasTV(state, action) {
      state.hasTV = action.payload;
    },
    setTransmission(state, action) {
      state.transmission = action.payload;
    },
  },
});

export const { setLocation, setType, setHasAC, setHasKitchen, setHasBathroom, setHasTV, setTransmission } = filtersSlice.actions;

export default filtersSlice.reducer;
