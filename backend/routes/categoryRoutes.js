import express from "express";
const router = express.Router();
import {
    getAllCategories,
    postCategory,
} from "../controllers/categoryController.js";

router.route("/getAll").get(getAllCategories);
router.route("/postCategory").post(postCategory);

export default router;
