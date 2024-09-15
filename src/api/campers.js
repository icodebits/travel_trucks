import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';


// Async action to fetch campers
export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async () => {
    const response = await axios.get(API_URL);
    return response.data.items;
  }
);

// Async action to fetch camper details by ID
export const fetchCamperById = createAsyncThunk(
  'campers/fetchCamperById',
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);
