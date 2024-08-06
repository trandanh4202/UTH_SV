import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice/LoginSlice";
import profileReducer from "./profileSlice/ProfileSlice";
import transcriptReducer from "./transcriptSlice/TranscriptSlice";
import calendarReducer from "./calendarSlice/CalendarSlice";
import notificationReducer from "./notificationSlice/NotificationSlice";
import programReducer from "./programSlice/ProgramSlice";
import tuitionReducer from "./tuitionSlice/TuitionSlice";
import menuReducer from "./menuSlice/MenuSlice";
import religionReducer from "./religionSlice/ReligionSlice";
import nationReducer from "./nationSlice/NationSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    transcript: transcriptReducer,
    calendar: calendarReducer,
    notification: notificationReducer,
    program: programReducer,
    tuition: tuitionReducer,
    menu: menuReducer,
    religion: religionReducer,
    nation: nationReducer,
  },
  // devTools: false,
});
