import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  transcript: [],
  loading: false,
  error: null,
};

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
      const response = await axios.get(`/api/hoctap/bangdiem`, config);

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
      });
  },
});

export default transcriptSlice.reducer;
