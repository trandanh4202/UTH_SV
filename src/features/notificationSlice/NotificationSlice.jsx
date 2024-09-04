import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  category: [],
  loading: false,
  error: null,
  newfeeds: {
    totalPages: 0,
    totalElements: 0,
    size: 10,
    content: [],
  },
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
      return rejectWithValue(error.message);
    }
  }
);

export const getNewfeeds = createAsyncThunk(
  "noti/getNewfeeds",
  async ({ id, page = 1, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/notification`, {
        params: {
          categoryId: id,
          page: page,
          size: size,
        },
      });
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getNewfeedsById = createAsyncThunk(
  "noti/getNewfeedsById",
  async ({ articleId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/notification/${articleId}`
      );
      return response.data.body;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // localStorage.clear();
        window.location.href = "/"; // Chuyển hướng người dùng về trang login nếu không được phép truy cập
      }
      return rejectWithValue(error.message);
    }
  }
);

const notificationSlice = createSlice({
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
        state.newfeeds = action.payload;
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

export default notificationSlice.reducer;
