import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/UserPages/Home";
import Login from "./pages/UserPages/Login";
import SignUp from "./pages/UserPages/SignUp";
import AdminLogin from "./pages/AdminPages/AdminLogin";
import AdminHome from "./pages/AdminPages/AdminHome";
import { useSelector } from "react-redux";

function App() {
  const useAuthCheck = () => {
    const { currentUser } = useSelector((state) => state.user);
    const isLoggedIn = !!currentUser;
    return isLoggedIn;
  };
  const adminCheck = () => {
    const { currentAdmin } = useSelector((state) => state.admin);
    const adminLogin = !!currentAdmin;
    return  adminLogin
  };
  const isAdminLoggedIn=adminCheck();
  const isLoggedIn = useAuthCheck();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Home /> : <SignUp />} />
          <Route path="/admin/login" element={isAdminLoggedIn?<AdminHome/>: <AdminLogin />} />
          <Route path="/admin" element={isAdminLoggedIn?<AdminHome />:<AdminLogin/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
