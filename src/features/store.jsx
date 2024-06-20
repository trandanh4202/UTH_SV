import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice/LoginSlice";
import profileReducer from "./profileSlice/ProfileSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
  },
});
