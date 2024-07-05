import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tuitionFee: [],
  loading: false,
  error: null,
  tuitionOther: [],
  receipts: [],
  receiptDetail: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTuitionFee = createAsyncThunk(
  "tuition/getTuitionFee",
  async ({ semester }, { rejectWithValue }) => {
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
        `${API_BASE_URL}/hocphi?idDot=${semester}`,
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

export const getTuitionOther = createAsyncThunk(
  "tuition/getTuitionOther",
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
        `${API_BASE_URL}/hocphi/khoanthukhac`,
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

export const getReceipts = createAsyncThunk(
  "tuition/getReceipts",
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
        `${API_BASE_URL}/hocphi/phieuthu`,
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

export const getReceiptDetail = createAsyncThunk(
  "tuition/getReceiptDetail",
  async ({ soPhieu }, { rejectWithValue }) => {
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
        `${API_BASE_URL}/hocphi/phieuthuchitiet/${soPhieu}`,
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

const tuitionSlice = createSlice({
  name: "tuition",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTuitionFee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTuitionFee.fulfilled, (state, action) => {
        state.loading = false;
        state.tuitionFee = action.payload;
      })
      .addCase(getTuitionFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getTuitionOther.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTuitionOther.fulfilled, (state, action) => {
        state.loading = false;
        state.tuitionOther = action.payload;
      })
      .addCase(getTuitionOther.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getReceipts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReceipts.fulfilled, (state, action) => {
        state.loading = false;
        state.receipts = action.payload;
      })
      .addCase(getReceipts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getReceiptDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReceiptDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.receiptDetail = action.payload;
      })
      .addCase(getReceiptDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default tuitionSlice.reducer;
