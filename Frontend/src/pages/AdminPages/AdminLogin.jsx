import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const AdminLogin = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  }
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="w-96 rounded-lg h-auto flex flex-col items-center bg-gray-900 justify-around ">
          <h1 className="text-4xl m-3 font-bold text-white">Admin Login</h1>
          <input
            onChange={handleChange}
            type="text"
            id="mail"
            name="mail"
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
          <Button type="submit" className="bg-blue-700 m-5 hover:bg-blue-900 hover:scale-110">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin