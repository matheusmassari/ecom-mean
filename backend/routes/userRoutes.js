import express from "express";
const router = express.Router();
import {registerUser, loginUser} from "../controllers/userController.js";

router.route("/").post(registerUser);

export default router;
