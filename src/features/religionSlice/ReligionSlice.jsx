import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  religions: [],
  loading: false,
  error: null,
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getReligion = createAsyncThunk(
  "religion/getReligion",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tongiao/getAll`);
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const religionSlice = createSlice({
  name: "religion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReligion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReligion.fulfilled, (state, action) => {
        state.loading = false;
        state.religions = action.payload;
      })
      .addCase(getReligion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default religionSlice.reducer;
