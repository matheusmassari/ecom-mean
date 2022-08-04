import express from "express";
const router = express.Router();
import {
    getAllProducts,
    getSingleProductDetails,
    postProduct,
    updateProduct,
    deleteProduct,
    getCount,
    getFeatured,
    filterByCategories,
} from "../controllers/productController.js";

router.route("/").get(getAllProducts).post(postProduct);
router
    .route("/:id")
    .get(getSingleProductDetails)
    .put(updateProduct)
    .delete(deleteProduct);
router.route("/get/filter").get(filterByCategories);
router.route("/get/count").get(getCount);
router.route("/get/featured/:count").get(getFeatured);

export default router;
