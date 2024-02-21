import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import Admin from '../model/adminModel.js'

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




export { adminLogin };