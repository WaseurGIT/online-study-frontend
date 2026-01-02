import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root/Root.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./auth/Login/Login.jsx";
import Register from "./auth/Register/Register.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import Assignments from "./components/Assignments/Assignments.jsx";
import CreateAssignment from "./components/CreateAssignment/CreateAssignment.jsx";
import Submission from "./components/Submission/Submission.jsx";
import SubmitAssignment from "./components/SubmitAssignment/SubmitAssignment.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/assignments",
        element: <Assignments></Assignments>,
      },
      {
        path: "/createAssignment",
        element: <CreateAssignment></CreateAssignment>,
      },
      {
        path: "/submission",
        element: <Submission></Submission>,
      },
      {
        path: "/submitAssignment",
        element: <SubmitAssignment></SubmitAssignment>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
