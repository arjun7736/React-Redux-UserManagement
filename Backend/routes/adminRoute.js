import express from "express";
import { adminLogin } from "../controllers/adminController.js";
const router =express()


router.post("/login",adminLogin)


export default router;
