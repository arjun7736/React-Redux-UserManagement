import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPasword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setMail(mail);
    setPasword(password);
  };
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="w-96 rounded-lg h-auto flex flex-col items-center bg-gray-900 justify-around ">
          <h1 className="text-4xl m-3 font-bold text-white">Login</h1>
          <input
            value={mail}
            onChange={(e) => {
              setMail(e.target.value);
            }}
            type="text"
            id="mail"
            name="mail"
            className="m-5 px-3 py-2 w-72 rounded-md"
            placeholder="Enter Mail"
          />
          <input
            value={password}
            onChange={(e) => {
              setPasword(e.target.value);
            }}
            type="password"
            id="password"
            name="password"
            className=" px-3 py-2 w-72 rounded-md "
            placeholder="Enter Password"
          />
         

          <Button type="submit" className="bg-blue-700 mt-5 hover:bg-blue-900 hover:scale-110">
            Login
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
