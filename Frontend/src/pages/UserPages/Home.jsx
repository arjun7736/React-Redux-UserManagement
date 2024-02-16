import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-screen h-screen bg-slate-200 justify-center">
      <Avatar className="w-40 h-40">
        <AvatarImage src="https://cdn-icons-png.freepik.com/256/12225/12225773.png" />
      </Avatar>
      <h1 className="m-5 text-5xl ">Hai</h1>
      <Button className="m-5 hover:scale-110">LogOut</Button>
    </div>
  );
};

export default Home;
