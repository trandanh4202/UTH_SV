import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  province: [],
  district: [],
  ward: [],
  // : [],
  loading: false,
  error: null,
};
const API_BASE_URL = "https://partnerdev.viettelpost.vn/v2";

export const getProvinceViettel = createAsyncThunk(
  "viettel/getProvinceViettel",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("account");
      if (!token) {
        throw new Error("No token found");
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        "https://uth-api-boot.ut.edu.vn/api/v1/viettelpost/tinh",
        config
      );

      return response.data;
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

export const getDistrictViettel = createAsyncThunk(
  "viettel/getDistrictViettel",
  async (provinceId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("account");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `https://uth-api-boot.ut.edu.vn/api/v1/viettelpost/huyen?provinceId=${provinceId}`,
        config
      );

      return response.data;
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

export const getWardViettel = createAsyncThunk(
  "viettel/getWardViettel",
  async (districtId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("account");
      if (!token) {
        throw new Error("No token found");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `https://uth-api-boot.ut.edu.vn/api/v1/viettelpost/xa?districtId=${districtId}`,
        config
      );

      return response.data;
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
const viettelSlice = createSlice({
  name: "viettel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProvinceViettel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProvinceViettel.fulfilled, (state, action) => {
        state.loading = false;
        state.province = action.payload;
      })
      .addCase(getProvinceViettel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getDistrictViettel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDistrictViettel.fulfilled, (state, action) => {
        state.loading = false;
        state.district = action.payload;
      })
      .addCase(getDistrictViettel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getWardViettel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWardViettel.fulfilled, (state, action) => {
        state.loading = false;
        state.ward = action.payload;
      })
      .addCase(getWardViettel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default viettelSlice.reducer;
