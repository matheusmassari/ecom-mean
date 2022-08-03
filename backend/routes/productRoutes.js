import express from "express";
const router = express.Router();
import {
    getAllProducts,
    getSingleProductDetails,
    postProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

router.route("/").get(getAllProducts).post(postProduct);
router
    .route("/:id")
    .get(getSingleProductDetails)
    .put(updateProduct)
    .delete(deleteProduct);

export default router;
