import express from "express";
import { adminLogin, deleteUser, editUser, userList } from "../controllers/adminController.js";
import { verifyToken } from "../utils/verifyAdmin.js";
const router =express()


router.post("/login",adminLogin)
router.post("/deleteUser/:id",deleteUser)
router.post("/fetchUser",userList)
router.post("/editUser",editUser)

export default router;
