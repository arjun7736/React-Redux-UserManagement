import express from "express";
import User from "../model/userModel.js"
import bcryptjs from "bcryptjs"

export const signup = async (req, res, next) => {
    try {
        const { username, password, email,phone } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const new_user = new User({ username, email, password: hashedPassword,phone })
        await new_user.save()
        res.status(200).json({ message: "User created!" })
    } catch (error) {
        next(error)
    }
}
