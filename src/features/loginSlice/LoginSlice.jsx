import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  info: [],
  loading: false,
  error: null,
  errorMessage: null,
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

      const { token } = response.data;
      if (token) {
        localStorage.setItem("account", token);
      } else {
        console.error("Token not found in response");
      }
      console.log(response.data);

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
  async ({ passWord }, { rejectWithValue }) => {
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
        `${API_BASE_URL}/user/change_password`,
        config
      );
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
        state.token = action.payload;
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
