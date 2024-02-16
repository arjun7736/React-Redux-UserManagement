import React from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from './ui/button';

const TableData = () => {
  return (
    <>
        <Table className="flex items-center justify-evenly w-3/4 mx-20 my-10"  >
          <div>
            <TableHead>Profile Image</TableHead>
            <TableRow className="h-12 border-none">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://cdn-icons-png.freepik.com/256/12225/12225773.png"/>
              </Avatar>
            </TableRow>
          </div>
          <div>
            <TableHead >Name</TableHead>
            <TableRow className="h-12 flex items-center border-none">Content 2</TableRow>
          </div>
          <div>
            <TableHead>Mobile</TableHead>
            <TableRow className="h-12 flex items-center border-none">Content 3</TableRow>
          </div>
          <div>
            <TableHead>Gender</TableHead>
            <TableRow className="h-12 flex items-center border-none">Content 4</TableRow>
          </div>
          <div>
          <TableHead>Actions</TableHead>
          <TableRow className="h-12 flex items-center border-none">
            <Button className="mx-3">Edit</Button>
            <Button>Delete</Button>
          </TableRow>
          </div>
        </Table>
    </>
  )
}

export default TableData