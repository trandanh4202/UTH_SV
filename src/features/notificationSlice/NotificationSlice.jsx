import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  category: [],
  loading: false,
  error: null,
  newfeeds: [],
  content: {},
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCategoryNoti = createAsyncThunk(
  "noti/getCategoryNoti",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notification/category`);

      return response.data.body;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.clear();
        window.location.href = "/"; // Chuyển hướng người dùng về trang login
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getNewfeeds = createAsyncThunk(
  "noti/getNewfeeds",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/notification?categoryId=${id}&page=1&size=10`
      );
      console.log(response.data);
      return response.data.body;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.clear();
        window.location.href = "/"; // Chuyển hướng người dùng về trang login
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getNewfeedsById = createAsyncThunk(
  "noti/getNewfeedsById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://uth-api-boot.ut.edu.vn/api/v1/notification/${id}`
      );
      console.log(response.data);
      return response.data.body;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.clear();
        window.location.href = "/"; // Chuyển hướng người dùng về trang login
      }
      return rejectWithValue(error.message);
    }
  }
);

const notifitaionSlice = createSlice({
  name: "noti",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryNoti.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryNoti.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategoryNoti.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getNewfeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewfeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.newfeeds = action.payload.content;
      })
      .addCase(getNewfeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getNewfeedsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewfeedsById.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(getNewfeedsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default notifitaionSlice.reducer;
