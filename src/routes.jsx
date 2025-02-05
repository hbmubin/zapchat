import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/login";
import Register from "./pages/Register";
import PrivateRoute from "./PrivateRoute";
import VerifyEmail from "./pages/VerifyEmail";
import Forget from "./pages/Forget";


const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute><App /></PrivateRoute>,
      errorElement: <ErrorPage />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/forget-password',
      element: <Forget />
    },
    {
      path: '/verify-email',
      element: <VerifyEmail />
    }
  ]);

export default router;