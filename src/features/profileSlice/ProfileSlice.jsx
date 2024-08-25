import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: {},
  summaryProfile: {},
  loading: false,
  error: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProfile = createAsyncThunk(
  "profile/getProfile",
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

      const response = await axios.get(`${API_BASE_URL}/user/profile`, config);

      // Assuming the new token is in the response data, adjust as needed
      const newToken = response.data.token;
      if (newToken) {
        localStorage.setItem("account", newToken);
      }

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

export const getSummaryProfile = createAsyncThunk(
  "profile/getSummaryProfile",
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
        `${API_BASE_URL}/user/getSummaryProfile`,
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

export const getCheckUpdateProfile = createAsyncThunk(
  "profile/getCheckUpdateProfile",
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
        `${API_BASE_URL}/user/checkUpdateProfile`,
        config
      );

      return response.data;
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

export const uploadAvatar = createAsyncThunk(
  "profile/uploadAvatar",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("account");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Sử dụng multipart/form-data
        },
      };

      const response = await axios.put(
        `${API_BASE_URL}/user/updateAvatar`,
        formData, // Gửi FormData
        config
      );

      return response.data;
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

export const updateEmail = createAsyncThunk(
  "profile/updateEmail",
  async (email, { rejectWithValue }) => {
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

      const response = await axios.put(
        `${API_BASE_URL}/user/updateEmail`,
        email, // Gửi FormData
        config
      );

      return response.data;
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

export const updatePhone = createAsyncThunk(
  "profile/updatePhone",
  async (phone, { rejectWithValue }) => {
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

      const response = await axios.put(
        `${API_BASE_URL}/user/updatePhone`,
        phone, // Gửi FormData
        config
      );

      return response.data;
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

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
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

      const response = await axios.put(
        `${API_BASE_URL}/user/updateInfo`,
        formData, // Gửi FormData
        config
      );

      return response.data;
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

export const getUpdateProfile = createAsyncThunk(
  "profile/getUpdateProfile",
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
        `${API_BASE_URL}/user/updateInfo`,
        config
      );

      return response.data;
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // setStudent: (state, action) => {
    //   state.profile = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = action.payload.success;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSummaryProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSummaryProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.summaryProfile = action.payload;
        state.success = action.payload.success;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getSummaryProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.avatar = action.payload;
        state.success = action.payload.success;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.updateEmail = action.payload;
        state.success = action.payload.success;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePhone.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePhone.fulfilled, (state, action) => {
        state.loading = false;
        state.updatePhone = action.payload;
        state.success = action.payload.success;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(updatePhone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUpdateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.getUpdateProfile = action.payload;
        state.success = action.payload.success;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getUpdateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.updateProfile = action.payload;
        state.success = action.payload.success;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCheckUpdateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCheckUpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.getCheckUpdateProfile = action.payload;
        state.success = action.payload.success;
        state.status = action.payload.status;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getCheckUpdateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
