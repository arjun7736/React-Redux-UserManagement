import React from "react";
import TableData from "../../components/TableData";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
const AdminHome = () => {
  return (
    <div className="">
        <NavBar />
      <div className="w-screen h-screen flex ">
        <SideBar />
        <TableData />
      </div>
    </div>
  );
};

export default AdminHome;
