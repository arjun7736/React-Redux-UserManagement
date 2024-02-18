import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerCircular } from 'spinners-react';


const SignUp = () => {
  const navigate =useNavigate()
  const [formData, setFormData] = useState({});
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const options = {
        method: "POST",
        url: "/api/auth/signup",
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      };
      const response = await axios(options);
      navigate("/")
      setLoading(false)
      setError(false)
    } catch (error) {
     setLoading(false)
     setError(true)
    }
  };
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="w-96 rounded-lg h-auto flex flex-col items-center bg-gray-900 justify-around ">
          <h1 className="text-4xl m-3 font-bold text-white">Signup</h1>
          <p  className="text-red-700 ">{error && "Something Went Wrong"}</p>
          <input
            onChange={handleChange}
            id="username"
            name="username"
            type="text"
            className="mt-3 px-3 py-2 w-72 rounded-md"
            placeholder="Enter Username"
          />
          <input
            onChange={handleChange}
            type="text"
            id="email"
            name="email"
            className="m-5 px-3 py-2 w-72 rounded-md"
            placeholder="Enter Email"
          />
          <input
            onChange={handleChange}
            type="number"
            id="phone"
            name="phone"
            className="mb-5 px-3 py-2 w-72 rounded-md"
            placeholder="Enter Number"
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
            className="bg-blue-700 uppercase mt-5 hover:bg-blue-900 hover:scale-110"
          >
           {loading ? (
  <>
    <SpinnerCircular size={30} thickness={168} speed={127} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
    &nbsp; Loading...
  </>
) : (
  "Sign Up"
)}

          </Button>
          <div className="flex w-full items-end justify-end">
            <Link to="/login">
              {" "}
              <p className="m-5 text-blue-500 underline hover:no-underline">
                Already Have a Account ?
              </p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
