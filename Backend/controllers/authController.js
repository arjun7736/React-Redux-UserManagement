import express from "express";
import User from "../model/userModel.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import { isEmail, isPhoneNumber, isStrongPassword, isValiedusername } from "../utils/validator.js";




export const signup = async (req, res, next) => {
    try {
        const { username, password, email, phone } = req.body;
        const valiedUsername = isValiedusername(username);
        if (!valiedUsername) return next(errorHandler(400, "Invalied Username"))
        const strongPassword = isStrongPassword(password);
        if (!strongPassword) return next(errorHandler(400,"The Password should be at least 8 characters long and contain a mix of Special and upper and lowercase characters"))
        const isemail = isEmail(email)
        if (!isemail) return next(errorHandler(400, 'Invalid Email'))
        const isPhone = isPhoneNumber(phone)
        if (!isPhone) return next(errorHandler(400, "Invalid Phone Number"));
        const userExist = await User.findOne({ email });
        if (userExist) return next(errorHandler(409, 'User already exist'));
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const new_user = new User({ username, email, password: hashedPassword, phone })
        await new_user.save()
        const token = jwt.sign({ id: new_user._id }, process.env.JWT_SECRET);
        const { password: hashPassword, ...rest } = new_user._doc;
        const expire = new Date(Date.now() + 3600000)
        res.cookie("access_token", token, { httpOnly: true, expires: expire }).status(200).json(rest);
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