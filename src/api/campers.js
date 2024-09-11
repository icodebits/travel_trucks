import axios from 'axios';

const API_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const getCampers = (filters) => {
  return axios.get(API_URL, { params: filters });
};

export const getCamperById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};
