import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  family: [],
  addFamily: [],
  updateFamily: [],
  deleteFamily: [],
  loading: false,
  error: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getFamily = createAsyncThunk(
  "family/getFamily",
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
      const response = await axios.get(`${API_BASE_URL}/quanHeGiaDinh`, config);

      // Assuming the new token is in the response data, adjust as needed

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

export const addFamily = createAsyncThunk(
  "family/addFamily",
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
        `${API_BASE_URL}/quanHeGiaDinh`,
        formData, // Gửi FormData
        config
      );

      const response = await axios.get(`${API_BASE_URL}/quanHeGiaDinh`, config);
      return {
        message: message.data,
        response: response.data.body,
      };
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // Xử lý lỗi token hết hạn
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateFamily = createAsyncThunk(
  "family/updateFamily",
  async ({ formData, id }, { rejectWithValue }) => {
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

      const message = await axios.put(
        `${API_BASE_URL}/quanHeGiaDinh/${id}`,
        formData, // Gửi FormData
        config
      );

      const response = await axios.get(`${API_BASE_URL}/quanHeGiaDinh`, config);
      return {
        message: message.data,
        response: response.data.body,
      };
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // Xử lý lỗi token hết hạn
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFamily = createAsyncThunk(
  "family/deleteFamily",
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

      const message = await axios.delete(
        `${API_BASE_URL}/quanHeGiaDinh/${id}`,
        config
      );
      const response = await axios.get(`${API_BASE_URL}/quanHeGiaDinh`, config);
      return {
        message: message.data,
        response: response.data.body,
      };
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // Xử lý lỗi token hết hạn
      }
      return rejectWithValue(error.message);
    }
  }
);

export const categoryFamily = createAsyncThunk(
  "family/categoryFamily",
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
        `${API_BASE_URL}/quanHeGiaDinh/category`,
        config
      );

      return response.data.body;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // Xử lý lỗi token hết hạn
      }
      return rejectWithValue(error.message);
    }
  }
);
const familySlice = createSlice({
  name: "family",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFamily.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFamily.fulfilled, (state, action) => {
        state.loading = false;
        state.family = action.payload;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getFamily.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addFamily.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFamily.fulfilled, (state, action) => {
        state.loading = false;
        state.addFamily = action.payload.message;
        state.family = action.payload.response;
        state.success = action.payload.message.success;
        state.message = action.payload.message.message;
        state.timestamp = action.payload.message.timestamp;
      })
      .addCase(addFamily.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateFamily.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFamily.fulfilled, (state, action) => {
        state.loading = false;
        state.updateFamily = action.payload.message;
        state.family = action.payload.response;
        state.success = action.payload.message.success;
        state.message = action.payload.message.message;
        state.timestamp = action.payload.message.timestamp;
      })
      .addCase(updateFamily.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteFamily.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFamily.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteFamily = action.payload.message;
        state.family = action.payload.response;
        state.success = action.payload.message.success;
        state.message = action.payload.message.message;
        state.timestamp = action.payload.message.timestamp;
      })
      .addCase(deleteFamily.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(categoryFamily.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoryFamily.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryFamily = action.payload;
      })
      .addCase(categoryFamily.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default familySlice.reducer;
