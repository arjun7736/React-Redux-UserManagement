import User from "../model/userModel.js";
import { errorHandler } from "../utils/error.js";


// update user
const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You cant Update this account"))
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    profilePicture: req.body.profilePicture,
                    username: req.body.username,
                    email: req.body.email
                }
            }, { new: true })
        const { password: hashedPassword, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    }
    catch (error) {
        next(error)
    }
}


export { updateUser }