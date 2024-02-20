import express from "express";
import User from "../model/userModel.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';





export const signup = async (req, res, next) => {
    try {
        const { username, password, email, phone } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const new_user = new User({ username, email, password: hashedPassword, phone })
        await new_user.save()
        res.status(200).json({ message: "User created!" })
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorHandler(404, "User not Found"))
        }
        const validPass = await bcryptjs.compareSync(password, user.password);
        if (!validPass) {
            return next(errorHandler(401, "Invalied Credentials"));
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expire = new Date(Date.now() + 3600000)
        res.cookie("access_token", token, { httpOnly: true, expires: expire }).status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res) => {
    res.clearCookie('access_token').status(200).json("Logout Succesfully")
}