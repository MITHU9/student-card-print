import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import BackSide from "./pages/BackSide.jsx";
import CardPage from "./pages/CardPage.jsx";
import AllStudents from "./pages/StudentsPage.jsx";

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
      fetch(
        `https://library-card-backend.vercel.app/print-preview/${params.id}`
      ),
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
