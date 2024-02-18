import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import userRoutes from "./routes/userRoute.js"
import authRoute from "./routes/auth.js"




const app = express()

app.use(express.json())
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoute)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})












mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("DataBase Connected") })
    .catch((err) => { console.log(err) })

app.listen(process.env.PORT, () => {
    console.log("server Running");
})