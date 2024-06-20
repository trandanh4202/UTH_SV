import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page/error-page";
import { store } from "./features/store";
import "./index.css";
import Layout from "./layout";
import Dashboard from "./page/dashboard";
import GeneralReceipts from "./page/tuitionFees/generalReceipts/GeneralReceipts";
import TuitionTable from "./page/tuitionFees/tuitionTable/TuitionTable";
import PaymentTable from "./page/tuitionFees/paymentOnline/PaymentTable";
import Transcirpt from "./page/transcript/Transcript";
import Login from "./page/login/Login";
import Calendar from "./page/calendar/Calendar";

const router = createBrowserRouter([
  {
    path: "/test",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Generalreceipts",
        element: <GeneralReceipts />,
      },
      {
        path: "/paymentonline",
        element: <PaymentTable />,
      },
      {
        path: "/tuitiontable",
        element: <TuitionTable />,
      },
      {
        path: "/transcript",
        element: <Transcirpt />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
