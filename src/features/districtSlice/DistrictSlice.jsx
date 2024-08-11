import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  district: [],
  loading: false,
  error: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getDistrict = createAsyncThunk(
  "district/getDistrict",
  async (idProvince, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/huyen/getByTinh?idTinh=${idProvince}`
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const districtSlice = createSlice({
  name: "district",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.district = action.payload;
      })
      .addCase(getDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default districtSlice.reducer;
