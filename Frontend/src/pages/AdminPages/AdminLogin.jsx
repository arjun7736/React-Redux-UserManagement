import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginError, loginStart, loginSuccess } from "@/redux/admin/adminSlice";

const AdminLogin = () => {
  const { loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      await axios
        .post("/api/admin/login", formData)
        .then((data) => {
          dispatch(loginSuccess(data.data));
          navigate("/admin");
        })
        .catch((error) => {
          dispatch(loginError(error));
        });
    } catch (error) {
      dispatch(loginError(error));
    }
  };
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="w-96 rounded-lg h-auto flex flex-col items-center bg-gray-900 justify-around ">
          <h1 className="text-4xl m-3 font-bold text-white">Admin Login</h1>
          <p className="text-red-700 ">
            {error &&  error?.response?.data?.message ? error.response.data.message || "Something Went Wrong":""}
          </p>
          <input
            onChange={handleChange}
            type="text"
            id="email"
            name="email"
            className="m-5 px-3 py-2 w-72 rounded-md"
            placeholder="Enter Mail"
          />
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            className=" px-3 py-2 w-72 rounded-md "
            placeholder="Enter Password"
          />
          <Button
            type="submit"
            className="bg-blue-700 m-5 hover:bg-blue-900 hover:scale-110 uppercase"
          >
            {loading ? (
              <>
                <SpinnerCircular
                  size={30}
                  thickness={168}
                  speed={127}
                  color="rgba(255, 255, 255, 1)"
                  secondaryColor="rgba(0, 0, 0, 0.44)"
                />
                &nbsp; Loading...
              </>
            ) : (
              "login"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
