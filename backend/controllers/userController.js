import User from "../models/User.js";
import {
    BadRequestError,
    GenericError,
    NotFoundError,    
} from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
    const userList = await User.find().select("name phone email isAdmin");
    if (!userList) {
        throw new GenericError("Something went wrong, try again later.");
    }
    res.status(StatusCodes.OK).send(userList);
};

const getSingleUser = async (req, res) => {
    const singleUserInfo = await User.findById(req.params.id).select(
        "name phone email passwordHash isAdmin apartment zip city country street"
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
        street: req.body.street,
    });

    if (!user) {
        throw new GenericError("Something went wrong, try again later.");
    }
    res.status(StatusCodes.OK).send(user);
};

const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_LIFETIME,
            }
        );

        return res
            .status(StatusCodes.OK)
            .send({ user: user.email, token: token });
    } else {
        throw new BadRequestError("Invalid credentials.");
    }
};

const updateUser = async (req, res) => {
    const existingUser = await User.findById(req.params.id);
    let newPassword;
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
        newPassword = existingUser.passwordHash;
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        passwordHash: newPassword,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });    
    if(!user) {
        throw new BadRequestError("User not found.");
    }
    res.status(StatusCodes.OK).send(user);    
};

const getCount = async (req, res) => {
    const userCount = await User.countDocuments();
    if (!userCount) {
        return new NotFoundError("Something went wront, try again later.");
    }
    res.status(StatusCodes.OK).send({ userCount: userCount });
};

const deleteUser = async (req, res) => {
    const userToBeDeleted = await User.findByIdAndRemove(req.params.id);

    if (userToBeDeleted) {
        res.status(StatusCodes.OK).send("User succesfully deleted.");
    }
    if(!userToBeDeleted) {
        throw new BadRequestError("User not found.")
    }
};

export {
    registerUser,
    loginUser,
    getSingleUser,
    getAllUsers,
    updateUser,
    getCount,
    deleteUser
};
