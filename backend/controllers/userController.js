import User from "../models/User.js";
import {
    BadRequestError,
    GenericError,
    NotFoundError,
    UnauthenticatedError,
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs"

const getAllUsers = async (req, res) => {
    const userList = await User.find().select("name phone email");
    if (!userList) {
        throw new GenericError("Something went wrong, try again later.");
    }
    res.status(StatusCodes.OK).send(userList);
};

const getSingleUser = async (req, res) => {
    const singleUserInfo = await User.findById(req.params.id).select(
        "name phone email"
    );
    if (!singleUserInfo) {
        throw new NotFoundError("User not found.");
    }
    res.status(StatusCodes.OK).send(singleUserInfo);
};

const registerUser = async (req, res) => {
    const { email } = req.body;
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError("Email already in use ");
    }
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });

    if (!user) {
        throw new GenericError("Something went wrong, try again later.");
    }
    res.status(StatusCodes.OK).send(user);
};

const loginUser = async (req, res) => {};

const updateUser = async (req, res) => {
    
};

export { registerUser, loginUser, getSingleUser, getAllUsers, updateUser };
