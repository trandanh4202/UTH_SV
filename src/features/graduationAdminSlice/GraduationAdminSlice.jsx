import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  adminGraduation: [],
  // : [],
  loading: false,
  error: null,
  getAllToApprove: [],
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getXTN = createAsyncThunk(
  "adminGraduation/getXTN",
  async (formData, { rejectWithValue }) => {
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
      const response = await axios.post(
        `${API_BASE_URL}/xtn/getXTN`,
        formData,
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

export const getXTNStatus = createAsyncThunk(
  "adminGraduation/getXTNStatus",
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
        `${API_BASE_URL}/xtn/getXTNStatus`,
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

export const getXTNDetail = createAsyncThunk(
  "adminGraduation/getXTNDetail",
  async ({ id }, { rejectWithValue }) => {
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
        `${API_BASE_URL}/xtn/getXTNDetail/${id}`,
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

export const getFile = createAsyncThunk(
  "adminGraduation/getFile",
  async ({ id }, { rejectWithValue }) => {
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
        `${API_BASE_URL}/xtn/getFile/${id}`,
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

export const getAdminDotXTN = createAsyncThunk(
  "adminGraduation/getAdminDotXTN",
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
        `${API_BASE_URL}/xtn/getAdminDotXTN`,
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

const graduationAdminSlice = createSlice({
  name: "adminGraduation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getXTNStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getXTNStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
        state.getXTNStatus = action.payload;
      })
      .addCase(getXTNStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getXTNDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getXTNDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
        state.getXTNDetail = action.payload;
      })
      .addCase(getXTNDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getAdminDotXTN.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminDotXTN.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
        state.getAdminDotXTN = action.payload;
      })
      .addCase(getAdminDotXTN.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
        state.getFile = action.payload;
      })
      .addCase(getFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getXTN.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getXTN.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
        state.getXTN = action.payload;
      })
      .addCase(getXTN.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default graduationAdminSlice.reducer;
