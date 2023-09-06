import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import Google from "./components/Google";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PublicRoute component={<Navigate to="/login" />} />} />
        <Route path="/register" element={<PublicRoute component={<Register />} />} />
        <Route path="/login" element={<PublicRoute component={<Login />} />} />
        <Route path="/google" element={<PublicRoute component={<Google />} />} />
        <Route path="/home" element={<PrivateRoute component={<Home />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App