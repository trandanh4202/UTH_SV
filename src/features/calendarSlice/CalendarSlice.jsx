import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  calendar: [],
  loading: false,
  error: null,
  total: 0,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCalendar = createAsyncThunk(
  "calendar/getCalendar",
  async ({ date }, { rejectWithValue }) => {
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
        `${API_BASE_URL}/lichhoc/tuan?date=${date}`,
        config
      );

      return response.data.body;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // localStorage.clear();
        window.location.href = "/"; // Chuyển hướng người dùng về trang login
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getTotalofWeek = createAsyncThunk(
  "calendar/getTotalofWeek",
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
        `${API_BASE_URL}/lichhoc/songayhoc`,
        config
      );

      return response.data.body;
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

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCalendar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCalendar.fulfilled, (state, action) => {
        state.loading = false;
        state.calendar = action.payload;
      })
      .addCase(getCalendar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getTotalofWeek.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalofWeek.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload;
      })
      .addCase(getTotalofWeek.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default calendarSlice.reducer;
