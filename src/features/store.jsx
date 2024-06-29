import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice/LoginSlice";
import profileReducer from "./profileSlice/ProfileSlice";
import transcriptReducer from "./transcriptSlice/TranscriptSlice";
import calendarReducer from "./calendarSlice/CalendarSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    transcript: transcriptReducer,
    calendar: calendarReducer,
  },
  
});
