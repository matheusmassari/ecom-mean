import express from "express";
const router = express.Router();
import {
    registerUser,
    loginUser,
    getAllUsers,
    getSingleUser,
    updateUser,
} from "../controllers/userController.js";

router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser).put(updateUser);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

export default router;
