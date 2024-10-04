import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  program: [],
  select: [],
  learningResults: [],
  learningProgress: [],
  courses: [],
  loading: false,
  error: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProgram = createAsyncThunk(
  "program/getProgram",
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
        `${API_BASE_URL}/hoctap/chuongtrinhkhung`,
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

export const getSelect = createAsyncThunk(
  "program/getSelect",
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

      const response = await axios.get(`${API_BASE_URL}/hoctap/hocky`, config);
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

export const getLearningResults = createAsyncThunk(
  "program/getLearningResults",
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
        `${API_BASE_URL}/hoctap/kqtheoky/${semester}`,
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

export const getLearningProgress = createAsyncThunk(
  "program/getLearningProgress",
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

      const response = await axios.get(`${API_BASE_URL}/hoctap/tiendo`, config);
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

export const getCourses = createAsyncThunk(
  "program/getCourses",
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
        `${API_BASE_URL}/hoctap/montheoky/${semester}`,
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
export const xetTotNghiep = createAsyncThunk(
  "program/xetTotNghiep",
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
        `${API_BASE_URL}/hoctap/xetTotNghiep`,
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

export const getDotXetTotNghiep = createAsyncThunk(
  "program/getDotXetTotNghiep",
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
        `${API_BASE_URL}/hoctap/getDotXetTotNghiep`,
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
export const xetTotNghiepInfo = createAsyncThunk(
  "program/xetTotNghiepInfo",
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
        `${API_BASE_URL}/hoctap/xetTotNghiepInfo`,
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
export const dangKyXetTotNghiep = createAsyncThunk(
  "program/dangKyXetTotNghiep",
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
      const response = await axios.post(
        `${API_BASE_URL}/hoctap/xetTotNghiep?idDot=${semester}`,
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
const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.program = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(getSelect.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSelect.fulfilled, (state, action) => {
        state.loading = false;
        state.select = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getSelect.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getLearningResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLearningResults.fulfilled, (state, action) => {
        state.loading = false;
        state.learningResults = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getLearningResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getLearningProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLearningProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.learningProgress = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getLearningProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(dangKyXetTotNghiep.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default programSlice.reducer;
