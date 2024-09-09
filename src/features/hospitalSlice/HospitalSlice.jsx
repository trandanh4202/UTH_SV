import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  hospital: [],
  // : [],
  loading: false,
  error: null,
  message: {},
  success: {},
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getHospital = createAsyncThunk(
  "hospital/getHospital",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("account");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${API_BASE_URL}/hospital/getAll`,
        config
      );

      return response.data;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // localStorage.clear();
        // window.location.href = "/"; // Chuyển hướng người dùng về trang login
      }
      return rejectWithValue(error.message);
    }
  }
);

const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHospital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHospital.fulfilled, (state, action) => {
        state.loading = false;
        state.getHospital = action.payload;
      })
      .addCase(getHospital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default hospitalSlice.reducer;
