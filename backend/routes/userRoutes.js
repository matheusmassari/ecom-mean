import express from "express";
const router = express.Router();
import {
    registerUser,
    loginUser,
    getAllUsers,
    getSingleUser,
    updateUser,
} from "../controllers/userController.js";

router.route("/").get(getAllUsers).post(registerUser);
router.route("/:id").get(getSingleUser).put(updateUser);

export default router;
