import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dorms: [],
  // : [],
  loading: false,
  error: null,
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
      const response = await axios.get(`${API_BASE_URL}/dorm/getInfor`, config);

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
  async (_, { rejectWithValue }) => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem("account");
      if (!token) {
        throw new Error("No token found");
      }
      const formData = new FormData();

      // Thêm file vào FormData (thay đổi đường dẫn file cho phù hợp)
      //  formData.append("proof", fileInput.files[0]); // fileInput là một input type="file" trong form của bạn

      // Thêm dữ liệu JSON vào FormData
      formData.append(
        "form",
        JSON.stringify({
          campusId: 1,
          objectIds: "1,2,3",
        })
      );
      // Cấu hình headers cho yêu cầu
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      // Gửi yêu cầu POST bằng axios
      const response = await axios.post(
        `${API_BASE_URL}/dorm/register`,
        formData,
        config
      );

      // Trả về dữ liệu nếu thành công
      return response.data;
    } catch (error) {
      // Xử lý lỗi ủy quyền hoặc lỗi khác
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // Ví dụ: chuyển hướng đến trang đăng nhập
      }

      // Trả về lỗi thông qua rejectWithValue để sử dụng trong Redux
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
        state.registerDormMessage = action.payload;
        state.dorms = action.payload.response;
      })
      .addCase(registerDorm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
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
        state.cancelDormMessage = action.payload;
        state.dorms = action.payload.response;
      })
      .addCase(cancelDorm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default dormSlice.reducer;
