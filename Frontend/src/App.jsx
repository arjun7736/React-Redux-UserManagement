import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/UserPages/Home";
import Login from "./pages/UserPages/Login";
import SignUp from "./pages/UserPages/SignUp";
import AdminLogin from "./pages/AdminPages/AdminLogin";
import AdminHome from "./pages/AdminPages/AdminHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;