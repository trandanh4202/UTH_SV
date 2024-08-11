import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  province: [],
  loading: false,
  error: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProvince = createAsyncThunk(
  "province/getProvince",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tinh/getAll`);
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const provinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getProvince.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProvince.fulfilled, (state, action) => {
        state.loading = false;
        state.province = action.payload;
      })
      .addCase(getProvince.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default provinceSlice.reducer;
