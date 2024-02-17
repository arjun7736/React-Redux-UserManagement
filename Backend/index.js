import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const app = express()

mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("DataBase Connected") })
    .catch((err) => { console.log(err) })

app.listen(process.env.PORT, () => {
    console.log("server Running");
})