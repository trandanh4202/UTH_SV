import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dorms: [],
  // : [],
  loading: false,
  error: null,
  message: {},
  success: {},
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getDorm = createAsyncThunk(
  "dorm/getDorm",
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
      const response = await axios.get(`${API_BASE_URL}/dorm/getAll`, config);

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

export const cancelDorm = createAsyncThunk(
  "dorm/cencelDorm",
  async (id, { rejectWithValue }) => {
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
      const message = await axios.get(
        `${API_BASE_URL}/dorm/cancel/${id}`,
        config
      );
      const response = await axios.get(`${API_BASE_URL}/dorm/getAll`, config);

      return { message: message.data, response: response.data };
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

export const getInforDorm = createAsyncThunk(
  "dorm/getInforDorm",
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
      const response = await axios.get(`${API_BASE_URL}/dorm/getInfo`, config);

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
export const registerDorm = createAsyncThunk(
  "dorm/registerDorm",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("account");
      if (!token) {
        throw new Error("No token found");
      }

      // Không cần thiết lập 'Content-Type' cho FormData, Axios sẽ tự động thiết lập
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Gửi yêu cầu POST với formData
      const message = await axios.post(
        `${API_BASE_URL}/dorm/register`,
        formData,
        config
      );
      const response = await axios.get(`${API_BASE_URL}/dorm/getAll`, config);

      return { message: message.data, response: response.data };
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // Xử lý lỗi ủy quyền
      }

      return rejectWithValue(error.message);
    }
  }
);

const dormSlice = createSlice({
  name: "dorm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDorm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDorm.fulfilled, (state, action) => {
        state.loading = false;
        state.dorms = action.payload;
      })
      .addCase(getDorm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(registerDorm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerDorm.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message.message;
        state.success = action.payload.message.success;
        state.timestamp = action.payload.message.timestamp;
        state.dorms = action.payload.response;
      })
      .addCase(registerDorm.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getInforDorm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInforDorm.fulfilled, (state, action) => {
        state.loading = false;
        state.getInforDorm = action.payload;
        state.dorm = action.payload.response;
      })
      .addCase(getInforDorm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(cancelDorm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelDorm.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message.message;
        state.success = action.payload.message.success;
        state.timestamp = action.payload.message.timestamp;
        state.dorms = action.payload.response;
      })
      .addCase(cancelDorm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default dormSlice.reducer;
