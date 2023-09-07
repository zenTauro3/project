import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PublicRoute component={<Navigate to="/login" />} />} />
        <Route path="/register" element={<PublicRoute component={<Register />} />} />
        <Route path="/login" element={<PublicRoute component={<Login />} />} />
        <Route path="/home" element={<PrivateRoute component={<Home />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App