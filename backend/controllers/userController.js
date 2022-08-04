import User from "../models/User.js";
import {
    BadRequestError,
    GenericError,
    NotFoundError,
    UnauthenticatedError,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const registerUser = async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.passwordHash,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });

    user = await user.save();
    if (!user) {
        throw new GenericError("Something went wrong, try again later.");
    }
    res.status(StatusCodes.OK).send(user);
};

const loginUser = async (req, res) => {};

const getUserInfo = async (req, res) => {};

export { registerUser, loginUser, getUserInfo };
