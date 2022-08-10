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
    uploadGallery,
} from "../controllers/productController.js";
import multer from "multer";

const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error("Invalid image type");
        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, "public/uploads");
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(" ").join("-");
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    },
});
const uploadOptions = multer({ storage: storage });

router
    .route("/")
    .get(getAllProducts)
    .post(uploadOptions.single("image"), postProduct);
router
    .route("/:id")
    .get(getSingleProductDetails)
    .put(updateProduct)
    .delete(deleteProduct);
router
    .route("/gallery-images/:id")
    .put(uploadOptions.array("images", 10), uploadGallery);
router.route("/get/filter").get(filterByCategories);
router.route("/get/count").get(getCount);
router.route("/get/featured/:count").get(getFeatured);

export default router;
