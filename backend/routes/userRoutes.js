import express from "express";
const router = express.Router();
import {
    registerUser,
    loginUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    getCount,
    deleteUser,
} from "../controllers/userController.js";

router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/get/count").get(getCount);

export default router;
