import mongoose from "mongoose";
import Product from "./Product.js";

const OrderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
});

export default mongoose.model("OrderItem", OrderItemSchema);
