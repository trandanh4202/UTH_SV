import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "~/error-page/error-page";
import { store } from "~/features/store";
import "~/index.css";

import { createTheme, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "~/layout/Layout";
import DashboardLecture from "~/page/lecture/dashboard/DashboardLecture";
import CalendarLecture from "~/page/lecture/calendar/Calendar";
import Dashboard from "~/page/student/dashboard/Dashboard";
import Calendar from "~/page/student/calendar/Calendar";
import Program1 from "~/page/student/educationProgram/Program";
import InforDetail from "~/page/student/inforDetail/InforDetail";
import Newfeeds from "~/page/student/newfeeds/Newfeeds";
import SingleNews from "~/page/student/singleNews/SingleNews";
import Transcript from "~/page/student/transcript/Transcript";
import GeneralReceipts from "~/page/student/tuitionFees/generalReceipts/GeneralReceipts";
import PaymentTable from "~/page/student/tuitionFees/paymentOnline/PaymentTable";
import TuitionTable from "~/page/student/tuitionFees/tuitionTable/TuitionTable";
import Login from "~/page/login/Login";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"; // Import GoogleReCaptchaProvider
import SubjectHandling from "./page/student/subjectHandling/SubjectHandling";
import Test from "./page/test/Test";
import PersonalInfo from "./page/student/editProfile/PersonalInfo";
import EditProfile from "./page/student/editProfile/EditProfile";
import Dormitory from "./page/student/dormitory/Dormitory";
import StudentCertificate from "./page/student/studentCertificate/StudentCertificate";
import Certification from "./page/student/certification/Certification";
import HandleDorm from "./page/lecture/handleDorm/HandleDorm";
import HandleUniform from "./page/lecture/handleUniform/HandleUniform";
import Note from "./page/student/note/Note";
import HandleTicket from "./page/lecture/handleTicket/HandleTicket";
import Graduation from "./page/student/graduation/Graduation";

// Function to check if the user is authenticated
const isAuthenticated = () => !!localStorage.getItem("account");

// Component to get the role-based component
const RoleBasedRoute = ({ studentComponent, lecturerComponent }) => {
  const role = localStorage.getItem("role");
  return role === "sv" ? studentComponent : lecturerComponent;
};

const PrivateRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
  // return isAuthenticated() ? <Outlet /> : <Outlet />;
};

// Component for login route
const LoginRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />;
  // return isAuthenticated() ? (
  //   <Navigate to="/dashboard" />
  // ) : (
  //   <Navigate to="/dashboard" />
  // );
};
// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRoute />,
    errorElement: <ErrorPage />,
  },

  {
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "dashboard",
            element: (
              <RoleBasedRoute
                studentComponent={<Dashboard />}
                lecturerComponent={<DashboardLecture />}
              />
            ),
          },
          {
            path: "calendar",
            element: (
              <RoleBasedRoute
                studentComponent={<Calendar />}
                lecturerComponent={<CalendarLecture />}
              />
            ),
          },
          {
            path: "editprofile",
            element: <EditProfile />,
          },
          {
            path: "generalreceipts",
            element: <GeneralReceipts />,
          },
          {
            path: "paymentonline",
            element: <PaymentTable />,
          },
          {
            path: "tuition",
            element: <TuitionTable />,
          },
          {
            path: "transcript",
            element: <Transcript />,
          },
          {
            path: "infordetail",
            element: <InforDetail />,
          },
          {
            path: "educationprogram",
            element: <Program1 />,
          },
          {
            path: "subjecthandling",
            element: <SubjectHandling />,
          },
          {
            path: "Dormitory",
            element: <Dormitory />,
          },
          {
            path: "studentservice",
            element: <StudentCertificate />,
          },
          {
            path: "certification",
            element: <Certification />,
          },
          {
            path: "admindorm",
            element: <HandleDorm />,
          },
          {
            path: "adminuniform",
            element: <HandleUniform />,
          },
          {
            path: "adminticket",
            element: <HandleTicket />,
          },
          {
            path: "notedetail",
            element: <Note />,
          },
          {
            path: "Graduation",
            element: <Graduation />,
          },
        ],
      },
    ],
  },
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "newfeeds/:id",
        element: <Newfeeds />,
      },
      {
        path: "newfeeds/:id/:articleId",
        element: <SingleNews />,
      },
    ],
  },
  {
    path: "test",
    element: <Test />,
  },
]);

const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans', sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GoogleReCaptchaProvider reCaptchaKey="6Ldz8PUpAAAAALEoaICewBmqHCkt6VgvQzkiCgeJ">
        <RouterProvider router={router} />
        <ToastContainer autoClose={5000} />
      </GoogleReCaptchaProvider>
    </Provider>
  </ThemeProvider>
);
