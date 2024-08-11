import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ward: [],
  loading: false,
  error: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getWard = createAsyncThunk(
  "ward/getWard",
  async (idDistrict = 0, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/xa/getByHuyen?idHuyen=${idDistrict}`
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const wardSlice = createSlice({
  name: "ward",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWard.fulfilled, (state, action) => {
        state.loading = false;
        state.ward = action.payload;
      })
      .addCase(getWard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default wardSlice.reducer;
