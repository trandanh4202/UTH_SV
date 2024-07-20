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
import Layout from "~/layout/Layout";
import DashboardLecture from "~/page/lecture/dashboard/DashboardLecture";
import Calendar from "~/page/student/calendar/Calendar";
import Dashboard from "~/page/student/dashboard/Dashboard";
import Program1 from "~/page/student/educationProgram/Program";
import InforDetail from "~/page/student/inforDetail/InforDetail";
import Newfeeds from "~/page/student/newfeeds/Newfeeds";
import SingleNews from "~/page/student/singleNews/SingleNews";
import Transcript from "~/page/student/transcript/Transcript";
import GeneralReceipts from "~/page/student/tuitionFees/generalReceipts/GeneralReceipts";
import PaymentTable from "~/page/student/tuitionFees/paymentOnline/PaymentTable";
import TuitionTable from "~/page/student/tuitionFees/tuitionTable/TuitionTable";
import Login from "~/page/login/Login";

// Function to check for account in localStorage
const isAuthenticated = () => {
  return !!localStorage.getItem("account");
};

const PrivateRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};
const LoginRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />;
};
const getRole = () => {
  return localStorage.getItem("role");
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    // element: <Test />,
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
            element: getRole() === "sv" ? <Dashboard /> : <DashboardLecture />,
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
            path: "calendar",
            element: <Calendar />,
          },
          {
            path: "infordetail",
            element: <InforDetail />,
          },
          {
            path: "educationprogram",
            element: <Program1 />,
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
]);

const theme = createTheme({
  typography: {
    fontFamily: "'Noto Sans', sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer autoClose={5000} />
    </Provider>
  </ThemeProvider>
);
