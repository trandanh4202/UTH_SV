import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  message: "",
  getFileCert: {},
  getCert: {},
  dangKyXetTotNghiep: {},
  xetTotNghiepInfo: {},
  getDotXetTotNghiep: {},
  xetTotNghiep: {},
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const xetTotNghiep = createAsyncThunk(
  "XTN/xetTotNghiep",
  async (semester, { rejectWithValue }) => {
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
        `${API_BASE_URL}/xetTotNghiep/xetTotNghiep?idDot=${semester}`,
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

export const getDotXetTotNghiep = createAsyncThunk(
  "XTN/getDotXetTotNghiep",
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
        `${API_BASE_URL}/xetTotNghiep/getDotXetTotNghiep`,
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
export const xetTotNghiepInfo = createAsyncThunk(
  "XTN/xetTotNghiepInfo",
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
        `${API_BASE_URL}/xetTotNghiep/xetTotNghiepInfo`,
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
export const dangKyXetTotNghiep = createAsyncThunk(
  "XTN/dangKyXetTotNghiep",
  async ({ formData, semester }, { rejectWithValue }) => {
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
        `${API_BASE_URL}/xetTotNghiep/xetTotNghiep?idDot=${semester}`,
        formData,
        config
      );
      const response = await axios.get(
        `${API_BASE_URL}/xetTotNghiep/xetTotNghiep?idDot=${semester}`,
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

export const getCert = createAsyncThunk(
  "XTN/getCert",
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
        `${API_BASE_URL}/xetTotNghiep/getChungChi`,
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

export const getFileCert = createAsyncThunk(
  "XTN/getFileCert",
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
      const response = await axios.get(
        `${API_BASE_URL}/xetTotNghiep/getFile/${id}`,
        config
      );

      return response.data.body;
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
export const updateXetTotNghiep = createAsyncThunk(
  "XTN/updateXetTotNghiep",
  async ({ formData, semester, id }, { rejectWithValue }) => {
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
        `${API_BASE_URL}/xetTotNghiep/updateXetTotNghiep/${id}`,
        formData,
        config
      );
      const response = await axios.get(
        `${API_BASE_URL}/xetTotNghiep/xetTotNghiep?idDot=${semester}`,
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
export const updateChungChi = createAsyncThunk(
  "XTN/updateChungChi",
  async ({ idCertUpdate, formData, semester }, { rejectWithValue }) => {
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
        `${API_BASE_URL}/xetTotNghiep/updateChungChi/${idCertUpdate}`,
        formData,
        config
      );
      const response = await axios.get(
        `${API_BASE_URL}/xetTotNghiep/xetTotNghiep?idDot=${semester}`,
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
const graduationSlice = createSlice({
  name: "XTN",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(xetTotNghiep.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(xetTotNghiep.fulfilled, (state, action) => {
        state.loading = false;
        state.xetTotNghiep = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(xetTotNghiep.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDotXetTotNghiep.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDotXetTotNghiep.fulfilled, (state, action) => {
        state.loading = false;
        state.getDotXetTotNghiep = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getDotXetTotNghiep.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(xetTotNghiepInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(xetTotNghiepInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.xetTotNghiepInfo = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(xetTotNghiepInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(dangKyXetTotNghiep.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dangKyXetTotNghiep.fulfilled, (state, action) => {
        state.loading = false;
        state.dangKyXetTotNghiep = action.payload;
        state.message = action.payload.message.message;
        state.success = action.payload.message.success;
        state.timestamp = action.payload.message.timestamp;
        state.xetTotNghiep = action.payload.response;
      })
      .addCase(dangKyXetTotNghiep.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCert.fulfilled, (state, action) => {
        state.loading = false;
        state.getCert = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getCert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFileCert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFileCert.fulfilled, (state, action) => {
        state.loading = false;
        state.getFileCert = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getFileCert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateXetTotNghiep.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateXetTotNghiep.fulfilled, (state, action) => {
        state.loading = false;
        state.xetTotNghiep = action.payload.response;
        state.message = action.payload.message.message;
        state.success = action.payload.message.success;
        state.timestamp = action.payload.message.timestamp;
        state.updateXetTotNghiep = action.payload.message;
      })
      .addCase(updateXetTotNghiep.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateChungChi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateChungChi.fulfilled, (state, action) => {
        state.loading = false;
        state.xetTotNghiep = action.payload.response;
        state.message = action.payload.message.message;
        state.success = action.payload.message.success;
        state.timestamp = action.payload.message.timestamp;
        state.updateChungChi = action.payload.message;
      })
      .addCase(updateChungChi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default graduationSlice.reducer;
