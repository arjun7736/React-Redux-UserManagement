import React, { useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { SpinnerCircular } from 'spinners-react';


const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const options = {
        method: "POST",
        url: "/api/auth/login",
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response =await axios(options)
      setLoading(false)
      setError(false)
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  };
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="w-96 rounded-lg h-auto flex flex-col items-center bg-gray-900 justify-around ">
          <h1 className="text-4xl m-3 font-bold text-white">Login</h1>
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

          <Button disabled={loading}
            type="submit"
            className="bg-blue-700 mt-5 hover:bg-blue-900 hover:scale-110 uppercase"
          >
              {loading ? (
  <>
    <SpinnerCircular size={30} thickness={168} speed={127} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
    &nbsp; Loading...
  </>
) : (
  "login"
)}

          </Button>
          <div className="flex w-full items-end justify-end">
            <Link to="/signup">
              {" "}
              <p className="m-5 text-blue-500 underline hover:no-underline">
                Don't Have a Account
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
