import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllStudents from "./pages/StudentsPage.jsx";
import CardPage from "./pages/CardPage.jsx";
import BackSide from "./pages/BackSide.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/card-print",
    element: <AllStudents />,
  },
  {
    path: "/register",
    element: <div>about</div>,
  },
  {
    path: "/print-preview/:id",
    element: <CardPage />,
    loader: async ({ params }) =>
      fetch(`http://localhost:5000/print-preview/${params.id}`),
  },
  {
    path: "/print-backside",
    element: <BackSide />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
