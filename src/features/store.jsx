import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice/LoginSlice";
import profileReducer from "./profileSlice/ProfileSlice";
import transcriptReducer from "./transcriptSlice/TranscriptSlice";
import calendarReducer from "./calendarSlice/CalendarSlice";
import notificationReducer from "./notificationSlice/NotificationSlice";
import programReducer from "./programSlice/ProgramSlice";
import tuitionReducer from "./tuitionSlice/TuitionSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    transcript: transcriptReducer,
    calendar: calendarReducer,
    notification: notificationReducer,
    program: programReducer,
    tuition: tuitionReducer,
  },
  devTools: false,
});
