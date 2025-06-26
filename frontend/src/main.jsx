import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { remote } from "./config/config.js";
import "./index.css";
import AddStudent from "./pages/AddStudent.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import BackSide from "./pages/BackSide.jsx";
import CardPage from "./pages/CardPage.jsx";
import Login from "./pages/Login.jsx";
import CombinedCardPrint from "./pages/PrintBoth.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";
import AllStudents from "./pages/StudentsPage.jsx";
import UpdatePage from "./pages/UpdatePage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
//const local = "https://library-card-backend.vercel.app";
//const remote = "https://library-card-backend.vercel.app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <App />,
  },

  {
    path: "/home/card-print",
    element: <AllStudents />,
  },
  {
    path: "/print-preview/:id",
    element: <CardPage />,
    // loader: async ({ params }) => fetch(`${remote}/print-preview/${params.id}`),
  },

  {
    path: "/print-backside/:id",
    element: <BackSide />,
  },
  {
    path: "/print-both-side/:id",
    element: <CombinedCardPrint />,
    loader: async ({ params }) => fetch(`${remote}/print-preview/${params.id}`),
  },
  {
    path: "/student-details/:id",
    element: <StudentDetails />,
    loader: async ({ params }) => fetch(`${remote}/print-preview/${params.id}`),
  },
  {
    path: "/update-info/:id",
    element: <UpdatePage />,
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/add-student",
    element: <AddStudent />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
