import express from "express";
const router = express.Router();
import {
    getAllCategories,
    postCategory,
    deleteCategory,
    getSingleCategoryDetails,
    updateCategory
} from "../controllers/categoryController.js";

router.route("/").get(getAllCategories).post(postCategory);
router
    .route("/:id")
    .delete(deleteCategory)
    .get(getSingleCategoryDetails)
    .put(updateCategory);

export default router;
