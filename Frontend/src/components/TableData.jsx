import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import axios from "axios";

const TableData = ({ userdata, fun}) => {
  const DeleteUser = async () => {
    try {
      await axios.post(`/api/admin/deleteUser/${userdata._id}`);
      fun()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Table className="flex items-center justify-evenly w-3/4 mx-20 my-10">
        <div>
          <TableHead>Profile Image</TableHead>
          <TableRow className="h-12 border-none">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`${userdata.profilePicture}`} />
            </Avatar>
          </TableRow>
        </div>
        <div>
          <TableHead>Name</TableHead>
          <TableRow className="h-12 flex items-center border-none">
            {userdata.username}
          </TableRow>
        </div>
        <div>
          <TableHead>Mobile</TableHead>
          <TableRow className="h-12 flex items-center border-none">
            {userdata.phone}
          </TableRow>
        </div>
        <div>
          <TableHead>Mail</TableHead>
          <TableRow className="h-12 flex items-center border-none">
            {userdata.email}
          </TableRow>
        </div>
        <div>
          <TableHead>Actions</TableHead>
          <TableRow className="h-12 flex items-center border-none">
            <Button className="mx-3">Edit</Button>
            <Button onClick={DeleteUser}>Delete</Button>
          </TableRow>
        </div>
      </Table>
    </>
  );
};

export default TableData;
