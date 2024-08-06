import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  info: [],
  loading: false,
  error: null,
  errorMessage: null,
  message: null,
  status: null,
  getOtp: null,
  messageotp: null,
  messagerspw: null,
  loginPage: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginPage = createAsyncThunk(
  "auth/authenticate",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/login?g-recaptcha-response=${loginData.recaptcha}`,
        {
          username: loginData.username,
          password: loginData.password,
        }
      );
      console.log(loginData);

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
export const getOtp = createAsyncThunk(
  "auth/getOtp",
  async (forgotPasswordData, { rejectWithValue }) => {
    console.log(forgotPasswordData);
    try {
      const params = {
        username: forgotPasswordData.username,
        "g-recaptcha-response": forgotPasswordData.recaptcha,
        isEmail: forgotPasswordData.authMethod,
      };

      if (forgotPasswordData.authMethod === "0") {
        params.info = forgotPasswordData.phone;
      } else {
        params.info = forgotPasswordData.email;
      }

      const response = await axios.get(`${API_BASE_URL}/user/getOtp`, {
        params,
      });

      return response.data;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        return rejectWithValue("Sai thông tin. Vui lòng thử lại.");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const validateOTP = createAsyncThunk(
  "auth/validateOTP",
  async (validateOTPData, { rejectWithValue }) => {
    console.log(validateOTPData);
    try {
      const params = {
        username: validateOTPData.username,
        otp: validateOTPData.otp,
        "g-recaptcha-response": validateOTPData.recaptcha,
      };

      const response = await axios.get(`${API_BASE_URL}/user/validateOtp`, {
        params,
      });

      return response.data;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        return rejectWithValue("Sai thông tin. Vui lòng thử lại.");
      }
      return rejectWithValue(error.message);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetPasswordData, { rejectWithValue }) => {
    try {
      const params = {
        username: resetPasswordData.username,
        otp: resetPasswordData.otp,
        "g-recaptcha-response": resetPasswordData.recaptcha,
        password: resetPasswordData.password,
      };
      console.log(params);
      const response = await axios.post(
        `${API_BASE_URL}/user/resetPassword`,
        params
      );

      return response.data;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        return rejectWithValue("Sai thông tin. Vui lòng thử lại.");
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
        state.loginPage = action.payload;
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
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
        state.errorMessage =
          action.payload || "Đã xảy ra lỗi. Vui lòng thử lại.";
      })
      .addCase(getOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.getOtp = action.payload;
      })
      .addCase(getOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
        state.errorMessage =
          action.payload || "Đã xảy ra lỗi. Vui lòng thử lại.";
      })
      .addCase(validateOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.validateOtp = action.payload;
      })
      .addCase(validateOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
        state.errorMessage =
          action.payload || "Đã xảy ra lỗi. Vui lòng thử lại.";
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPassword = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
        state.errorMessage =
          action.payload || "Đã xảy ra lỗi. Vui lòng thử lại.";
      });
  },
});

export default loginSlice.reducer;
