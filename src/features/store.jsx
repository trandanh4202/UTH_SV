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
import provinceReducer from "./provinceSlice/ProvinceSlice";
import districtReducer from "./districtSlice/DistrictSlice";
import wardReducer from "./wardSlice/WardSlice";
import familyReducer from "./familySlice/FamilySlice";

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
    province: provinceReducer,
    district: districtReducer,
    ward: wardReducer,
    family: familyReducer,
  },
  // devTools: false,
});
