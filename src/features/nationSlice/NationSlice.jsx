import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  nations: [],
  loading: false,
  error: null,
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getEthnicity = createAsyncThunk(
  "nation/getEthnicity",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dantoc/getAll`);
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getNation = createAsyncThunk(
  "nation/getNation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/quocGia/getAll`);
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const nationSlice = createSlice({
  name: "nation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEthnicity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEthnicity.fulfilled, (state, action) => {
        state.loading = false;
        state.ethnicity = action.payload;
      })
      .addCase(getEthnicity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getNation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNation.fulfilled, (state, action) => {
        state.loading = false;
        state.nations = action.payload;
      })
      .addCase(getNation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default nationSlice.reducer;
