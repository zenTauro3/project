import { createBrowserRouter, Navigate } from "react-router-dom";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Verify from "./pages/Verify";

const router = createBrowserRouter([
  { path: "*", element: <PublicRoute component={<Navigate to="/" />} /> },
  { path: "/", element: <PublicRoute component={<Main />} /> },
  { path: "/auth/register", element: <PublicRoute component={<Register />} /> },
  { path: "/auth/login", element: <PublicRoute component={<Login />} /> },
  { path: "/auth/verify/:key", element: <PublicRoute component={<Verify />} /> },
  { path: "/home", element: <PrivateRoute component={<Home />} /> }
])

export default router