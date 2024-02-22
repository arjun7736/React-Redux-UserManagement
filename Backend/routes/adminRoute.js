import express from "express";
import { adminLogin, deleteUser, editUser, logOut, searchUser, updateUser, userList } from "../controllers/adminController.js";
import { verifyToken } from "../utils/verifyAdmin.js";
const router = express()


router.post("/login", adminLogin)
router.post("/deleteUser/:id", deleteUser)
router.post("/fetchUser", userList)
router.post("/editUser/:id", editUser)
router.post("/searchUser", searchUser)
router.post("/updateUser/:id",updateUser)
router.get('/logout', logOut);
export default router;
