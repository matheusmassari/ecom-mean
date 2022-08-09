import express from "express";
const router = express.Router();
import {
    getAllOrders,
    getSingleOrder,
    postOrder,
    updateOrderStatus,
    deleteOrder,
    getTotalSales,
    getOrderCount,
    getPersonalOrders,
} from "../controllers/orderController.js";

router.route("/").get(getAllOrders).post(postOrder);
router
    .route("/:id")
    .get(getSingleOrder)
    .put(updateOrderStatus)
    .delete(deleteOrder);
router.route("/get/total-sales").get(getTotalSales);
router.route("/get/order-count").get(getOrderCount);
router.route("/get/userorders/:userid").get(getPersonalOrders);

export default router;
