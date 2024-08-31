import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  adminDorm: [],
  // : [],
  loading: false,
  error: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getRoom = createAsyncThunk(
  "adminDorm/getRoom",
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
      const response = await axios.get(`${API_BASE_URL}/dorm/getRoom`, config);

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

export const createDorm = createAsyncThunk(
  "adminDorm/createDorm",
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
      const message = await axios.post(
        `${API_BASE_URL}/dorm/createDorm`,
        formData,
        config
      );
      const response = await axios.get(`${API_BASE_URL}/dorm/getRoom`, config);

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
export const getAllToApprove = createAsyncThunk(
  "dorm/getAllToApprove",
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
        `${API_BASE_URL}/dorm/getAllAdmin`,
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

export const getPeriod = createAsyncThunk(
  "dorm/getPeriod",
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
        `${API_BASE_URL}/dorm/getPeriod`,
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
export const setApprove = createAsyncThunk(
  "dorm/setApprove",
  async ({ formDataAprove, formDataGetAll, id }, { rejectWithValue }) => {
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
      const message = await axios.post(
        `${API_BASE_URL}/dorm/approve?dormRegisterId=${id}`,
        formDataAprove,
        config
      );
      const response = await axios.post(
        `${API_BASE_URL}/dorm/getAllAdmin`,
        formDataGetAll,
        config
      );
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
export const getStatusDorm = createAsyncThunk(
  "admin/getStatusDorm",
  async (_, { rejectWithValue }) => {
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
      const response = await axios.get(
        `${API_BASE_URL}/dorm/getStatus`,
        config
      );

      return response.data;
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

const adminSlice = createSlice({
  name: "adminDorm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
        state.getRoom = action.payload;
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createDorm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDorm.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message.message;
        state.success = action.payload.message.success;
        state.timestamp = action.payload.message.timestamp;
        state.createDorm = action.payload.response;
      })
      .addCase(createDorm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getAllToApprove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllToApprove.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
        state.getAllToApprove = action.payload;
      })
      .addCase(getAllToApprove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getPeriod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPeriod.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
        state.getPeriod = action.payload;
      })
      .addCase(getPeriod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(setApprove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setApprove.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message.message;
        state.success = action.payload.message.success;
        state.timestamp = action.payload.message.timestamp;
        state.getAllToApprove = action.payload.response;
      })
      .addCase(setApprove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(getStatusDorm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatusDorm.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
        state.getStatusDorm = action.payload;
      })
      .addCase(getStatusDorm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default adminSlice.reducer;
