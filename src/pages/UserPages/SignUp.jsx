import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, seteMail] = useState("");
  const [password, setPasword] = useState("");
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setPasword(password)
    seteMail(email)
    setUsername(username)
  };
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="w-96 rounded-lg h-auto flex flex-col items-center bg-gray-900 justify-around ">
          <h1 className="text-4xl m-3 font-bold text-white">Signup</h1>
          <input
            value={username}
            onChange={(e) => {  
              setUsername(e.target.value);
            }}
            type="text"
            className="mt-3 px-3 py-2 w-72 rounded-md"
            placeholder="Enter Username"
          />
          <input
            value={email}
            onChange={(e) => {
              seteMail(e.target.value);
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
          <Button type="submit" className='bg-blue-700 mt-5 hover:bg-blue-900 hover:scale-110'>SignUp</Button>
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
