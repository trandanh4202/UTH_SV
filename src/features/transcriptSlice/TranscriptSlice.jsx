import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  transcript: [],
  loading: false,
  error: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTranscript = createAsyncThunk(
  "transcript/getTranscript",
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
        `${API_BASE_URL}/hoctap/bangdiem`,
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

export const getCert = createAsyncThunk(
  "transcript/getCert",
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
        `${API_BASE_URL}/hoctap/getChungChi`,
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

export const getKetQuaDauVao = createAsyncThunk(
  "transcript/getKetQuaDauVao",
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
        `${API_BASE_URL}/hoctap/getKetQuaDauVao`,
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

const transcriptSlice = createSlice({
  name: "transcript",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTranscript.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTranscript.fulfilled, (state, action) => {
        state.loading = false;
        state.transcript = action.payload;
      })
      .addCase(getTranscript.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getCert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCert.fulfilled, (state, action) => {
        state.loading = false;
        state.getCert = action.payload;
      })
      .addCase(getCert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getKetQuaDauVao.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getKetQuaDauVao.fulfilled, (state, action) => {
        state.loading = false;
        state.getKetQuaDauVao = action.payload;
      })
      .addCase(getKetQuaDauVao.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default transcriptSlice.reducer;
