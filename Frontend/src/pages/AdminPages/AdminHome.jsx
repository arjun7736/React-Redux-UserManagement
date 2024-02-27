import React from "react";
import TableData from "../../components/TableData";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  userFetchFailure,
  userFetchStart,
  userFetchSuccess,
} from "@/redux/admin/adminSlice";

const AdminHome = () => {
  const FetchApi = async () => {
    dispatch(userFetchStart());
    await axios
      .post("/api/admin/fetchUser")
      .then((data) => dispatch(userFetchSuccess(data.data)))
      .catch((error) => {
        dispatch(userFetchFailure(error));
      });
  };
  const dispatch = useDispatch();
  const { loading, error, userData } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(userFetchStart());
    axios
      .post("/api/admin/fetchUser")
      .then((data) => dispatch(userFetchSuccess(data.data)))
      .catch((error) => {
        dispatch(userFetchFailure(error));
      });
  }, []);
  return (
    <div className="">
      <NavBar />
      <div className="w-screen h-screen flex ">
        <SideBar />
        <div className="w-full overflow-scroll mt-20">
          {userData?.length === 0 ? (
            <p className="mt-20 text-center">No users Found</p>
          ) : (
            userData?.map((user) => (
              <TableData key={user._id} userdata={user} fun={FetchApi} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
