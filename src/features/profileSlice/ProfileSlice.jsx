import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: {},
  loading: false,
  error: null,
  select: [],
  learningResults: [],
  learningProgress: [],
  courses: [],
  loadingUI: false,
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
        localStorage.clear();
        window.location.href = "/"; // Chuyển hướng người dùng về trang login
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getSelect = createAsyncThunk(
  "profile/getSelect",
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
  "profile/getLearningResults",
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
  "profile/getLearningProgress",
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
  "profile/getCourses",
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

export const getProvince = createAsyncThunk(
  "profile/getProvince",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tinh/getAll`);
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDistrict = createAsyncThunk(
  "profile/getDistrict",
  async (idProvince, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/huyen/getByTinh?idTinh=${idProvince}`
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getWard = createAsyncThunk(
  "profile/getWard",
  async (idDistrict, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/xa/getByHuyen?idHuyen=${idDistrict}`
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.loadingUI = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.loadingUI = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSelect.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSelect.fulfilled, (state, action) => {
        state.loading = false;
        state.select = action.payload;
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
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProvince.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProvince.fulfilled, (state, action) => {
        state.loading = false;
        state.province = action.payload;
      })
      .addCase(getProvince.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDistrict.fulfilled, (state, action) => {
        state.loading = false;
        state.district = action.payload;
      })
      .addCase(getDistrict.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getWard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWard.fulfilled, (state, action) => {
        state.loading = false;
        state.ward = action.payload;
      })
      .addCase(getWard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
