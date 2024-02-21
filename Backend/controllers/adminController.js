import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import Admin from '../model/adminModel.js'
import User from "../model/userModel.js"

const adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return next(errorHandler(404, "You are not Admin"))
        }
        const isMatch = await bcryptjs.compareSync(password, admin.password);

        if (!isMatch) {
            return next(errorHandler(401, "Invalied Credentials"));
        }
        let token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET)
        const { password: hashedPassword, ...rest } = admin._doc;
        const expire = new Date(Date.now() + 3600000)
        res.cookie("access_token", token, { httpOnly: true, expires: expire }).status(200).json(rest);
    } catch (err) {
        next(err)
    }
};
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete({ _id: id });
        if (!deletedUser) {
            return next(errorHandler(404, "No such user found!"))
        }
        res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        next(error)
    }
}

const userList = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}

const editUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    profilePicture: req.body.profilePicture,
                    username: req.body.username,
                    email: req.body.email,
                    phone:req.body.phone
                }
            }, { new: true })
        const { password: hashedPassword, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}




export { adminLogin, deleteUser, userList, editUser };