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
};

export const getProfile = createAsyncThunk("profile/getProfile", async () => {
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
      `https://uth-api-boot.ut.edu.vn/api/v1/user/profile`,
      config
    );

    // Assuming the new token is in the response data, adjust as needed
    const newToken = response.data.token;
    if (newToken) {
      localStorage.setItem("account", newToken);
    }

    return response.data;
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
});

export const getSelect = createAsyncThunk("profile/getSelect", async () => {
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
      `https://uth-api-boot.ut.edu.vn/api/v1/user/dashboard/dot`,
      config
    );
    return response.data.body;
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
});

export const getLearningResults = createAsyncThunk(
  "profile/getLearningResults",
  async ({ semester }) => {
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
        `https://uth-api-boot.ut.edu.vn/api/v1/user/dashboard/ketquatheodot/${semester}`,
        config
      );
      return response.data.body;
    } catch (error) {
      console.error("Error during authentication:", error);
      throw error;
    }
  }
);

export const getLearningProgress = createAsyncThunk(
  "profile/getLearningProgress",
  async () => {
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
        `https://uth-api-boot.ut.edu.vn/api/v1/user/dashboard/tiendo`,
        config
      );
      return response.data.body;
    } catch (error) {
      console.error("Error during authentication:", error);
      throw error;
    }
  }
);

export const getCourses = createAsyncThunk(
  "profile/getCourses",
  async ({ semester }) => {
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
        `https://uth-api-boot.ut.edu.vn/api/v1/user/dashboard/monhoctheoky/${semester}`,
        config
      );
      return response.data.body;
    } catch (error) {
      console.error("Error during authentication:", error);
      throw error;
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
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
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
      });
  },
});

export default profileSlice.reducer;
