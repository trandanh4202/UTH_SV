import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  order: [],
  // : [],
  loading: false,
  error: null,
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllOrder = createAsyncThunk(
  "order/getAllOrder",
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
      const response = await axios.get(`${API_BASE_URL}/order/getAll`, config);

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

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (formData, { rejectWithValue }) => {
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
        `${API_BASE_URL}/order/createOrder`,
        formData,
        config
      );
      const response = await axios.get(`${API_BASE_URL}/order/getAll`, config);

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

export const cancelOrder = createAsyncThunk(
  "order/cencelOrder",
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
      const message = await axios.delete(
        `${API_BASE_URL}/order/cancel/${id}`,
        config
      );
      const response = await axios.get(`${API_BASE_URL}/order/getAll`, config);

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
export const finishOrder = createAsyncThunk(
  "order/finishOrder",
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
      const message = await axios.put(
        `${API_BASE_URL}/order/finish/${id}`,
        {},
        config
      );
      const response = await axios.get(`${API_BASE_URL}/order/getAll`, config);

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

export const getAllToShip = createAsyncThunk(
  "order/getAllToShip",
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
        `${API_BASE_URL}/order/getAllToShip`,
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

export const getAllToHandle = createAsyncThunk(
  "order/getAllToHandle",
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
        `${API_BASE_URL}/order/getAllToHandle`,
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

export const getDetailOrder = createAsyncThunk(
  "order/getDetailOrder",
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
        `${API_BASE_URL}/order/getDetail/${id}`,
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

export const getAllToDeliverWithoutShip = createAsyncThunk(
  "order/getAllToDeliverWithoutShip",
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
        `${API_BASE_URL}/order/getAllToDeliverWithoutShip`,
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

export const getAllToApprove = createAsyncThunk(
  "order/getAllToApprove",
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
      const response = await axios.post(
        `${API_BASE_URL}/order/getAllToApprove`,
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

export const getAllApprove = createAsyncThunk(
  "order/getAllApprove",
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
        `${API_BASE_URL}/order/approve?orderId=${id}`,
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

export const setApprove = createAsyncThunk(
  "order/setApprove",
  async ({ formDataAprove, formDataGetAll, id }, { rejectWithValue }) => {
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
        `${API_BASE_URL}/order/approve/${id}`,
        formDataAprove,
        config
      );
      const message2 = await axios.put(
        `${API_BASE_URL}/order/handle?orderId=${id}`,
        { shipCode: "", shipFee: 0 },
        config
      );
      const response = await axios.post(
        `${API_BASE_URL}/order/getAllAdmin`,
        formDataGetAll,
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
export const printToShip = createAsyncThunk(
  "order/printToShip",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("account");
      if (!token) {
        throw new Error("No token found");
      }

      // Không cần thiết lập 'Content-Type' cho FormData, Axios sẽ tự động thiết lập
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // Gửi yêu cầu POST với formData
      const response = await axios.get(
        `${API_BASE_URL}/order/printToShip/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // Xử lý lỗi ủy quyền
      }

      return rejectWithValue(error.message);
    }
  }
);
export const getCampus = createAsyncThunk(
  "order/getCampus",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("account");
      if (!token) {
        throw new Error("No token found");
      }

      // Không cần thiết lập 'Content-Type' cho FormData, Axios sẽ tự động thiết lập
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Gửi yêu cầu POST với formData
      const response = await axios.get(
        `${API_BASE_URL}/order/getCampus`,
        config
      );

      return response.data;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // Xử lý lỗi ủy quyền
      }

      return rejectWithValue(error.message);
    }
  }
);
export const getAllAdmin = createAsyncThunk(
  "order/getAllAdmin",
  async (formData, { rejectWithValue }) => {
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
        `${API_BASE_URL}/order/getAllAdmin`,
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
export const getStatusUniform = createAsyncThunk(
  "order/getStatusUniform",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("account");
      if (!token) {
        throw new Error("No token found");
      }

      // Không cần thiết lập 'Content-Type' cho FormData, Axios sẽ tự động thiết lập
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Gửi yêu cầu POST với formData
      const response = await axios.get(
        `${API_BASE_URL}/order/getStatus`,
        config
      );

      return response.data;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        // Xử lý lỗi ủy quyền
      }

      return rejectWithValue(error.message);
    }
  }
);
export const getEstimateTotalAmount = createAsyncThunk(
  "order/getEstimateTotalAmount",
  async (formData, { rejectWithValue }) => {
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
        `${API_BASE_URL}/order/estimateTotalAmount`,
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.response;
        state.success = action.payload.message.success;
        state.message = action.payload.message.message;
        state.timestamp = action.payload.message.timestamp;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(finishOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finishOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.response;
        state.success = action.payload.message.success;
        state.message = action.payload.message.message;
        state.timestamp = action.payload.message.timestamp;
      })
      .addCase(finishOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getAllToShip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllToShip.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllToShip = action.payload;
      })
      .addCase(getAllToShip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getAllToHandle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllToHandle.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllToHandle = action.payload;
      })
      .addCase(getAllToHandle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getAllToDeliverWithoutShip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllToDeliverWithoutShip.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllToDeliverWithoutShip = action.payload;
      })
      .addCase(getAllToDeliverWithoutShip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getAllToApprove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllToApprove.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllToApprove = action.payload;
      })
      .addCase(getAllToApprove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getAllApprove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllApprove.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllApprove = action.payload;
      })
      .addCase(getAllApprove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getEstimateTotalAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEstimateTotalAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
        state.getEstimateTotalAmount = action.payload;
      })
      .addCase(getEstimateTotalAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message.message;
        state.success = action.payload.message.success;
        state.timestamp = action.payload.message.timestamp;
        state.order = action.payload.response;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getDetailOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDetailOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.getDetailOrder = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getDetailOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getAllAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllAdmin = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getAllAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(getStatusUniform.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatusUniform.fulfilled, (state, action) => {
        state.loading = false;
        state.getStatusUniform = action.payload;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
      })
      .addCase(getStatusUniform.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(setApprove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setApprove.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message.message;
        state.success = action.payload.message.success;
        state.timestamp = action.payload.message.timestamp;
        state.getAllAdmin = action.payload.response;
      })
      .addCase(printToShip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(printToShip.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
        state.printToShip = action.payload;
      })
      .addCase(printToShip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(getCampus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampus.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.timestamp = action.payload.timestamp;
        state.getCampus = action.payload;
      })
      .addCase(getCampus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default orderSlice.reducer;
