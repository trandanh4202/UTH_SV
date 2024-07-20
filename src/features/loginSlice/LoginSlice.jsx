import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  info: [],
  loading: false,
  error: null,
  errorMessage: null,
  message: null,
  status: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginPage = createAsyncThunk(
  "auth/authenticate",
  async (combinedData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/login?g-recaptcha-response=${combinedData.recaptcha}`,
        {
          username: combinedData.username,
          password: combinedData.password,
        }
      );

      const { token, body } = response.data;
      if (token) {
        localStorage.setItem("account", token);
        localStorage.setItem("role", body);
      }

      return response.data;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        return rejectWithValue("Sai thông tin đăng nhập. Vui lòng thử lại.");
      }
      return rejectWithValue(error.message);
    }
  }
);
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
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
        `${API_BASE_URL}/user/change_password`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        config
      );

      return response.data;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      )
        return rejectWithValue(error.message);
    }
  }
);
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginPage.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
        state.errorMessage =
          action.payload || "Đã xảy ra lỗi. Vui lòng thử lại.";
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.status = action.payload.status;
        // localStorage.removeItem("account"); // Xóa token từ localStorage
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
        state.errorMessage =
          action.payload || "Đã xảy ra lỗi. Vui lòng thử lại.";
      });
  },
});

export default loginSlice.reducer;
