import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page/error-page";
import { store } from "./features/store";
import "./index.css";
import Layout from "./layout";
import Calendar from "./page/calendar/Calendar";
import Dashboard from "./page/dashboard";
import Login from "./page/login/Login";
import Transcript from "./page/transcript/Transcript";
import GeneralReceipts from "./page/tuitionFees/generalReceipts/GeneralReceipts";
import PaymentTable from "./page/tuitionFees/paymentOnline/PaymentTable";
import TuitionTable from "./page/tuitionFees/tuitionTable/TuitionTable";
import Test from "./page/test/Test";
import InforDetail from "./page/inforDetail/InforDetail";
import Newfeeds from "./page/newfeeds/Newfeeds";
import SingleNews from "./page/singleNews/SingleNews";
import { createTheme, ThemeProvider } from "@mui/material";
import Program from "./page/educationProgram/Program";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

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

const router = createBrowserRouter([
  {
    path: "/",
    // element: (
    //   <PublicRoutes>
    //     <Login />
    //   </PublicRoutes>
    // ),
    element: <LoginRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    // element: (
    //   <PublicRoutes>
    //     <Login />
    //   </PublicRoutes>
    // ),
    element: <Test />,
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
            element: <Dashboard />,
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
          // {
          //   path: "calendar",
          //   element: <Calendar />,
          // },
          {
            path: "infordetail",
            element: <InforDetail />,
          },
          {
            path: "educationprogram",
            element: <Program />,
          },
        ],
      },
    ],
  },

  {
    element: <Layout />,
    children: [
      {
        path: "newfeeds/:id",
        element: <SingleNews />,
      },
      {
        path: "newfeeds",
        element: <Newfeeds />,
      },
    ],
  },
  // {
  //   path: "newfeeds/:id",
  //   element: <SingleNews />,
  // },
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
