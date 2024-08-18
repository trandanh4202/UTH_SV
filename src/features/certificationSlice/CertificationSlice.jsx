import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  certification: [],
  loading: false,
  error: null,
};
const API_BASE_URL = "https://ts24.ut.edu.vn/api/getdatanhaphoc.php";

export const getCertification = createAsyncThunk(
  "certification/getCertification",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("account");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get(`/ts24/getdatanhaphoc.php?${token}`);
      const a = `/ts24/getdatanhaphoc.php?${token}`;

      console.log(a);
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

const certificationSlice = createSlice({
  name: "certification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCertification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCertification.fulfilled, (state, action) => {
        state.loading = false;
        state.certification = action.payload;
      })
      .addCase(getCertification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default certificationSlice.reducer;
