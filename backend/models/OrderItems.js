import mongoose from "mongoose";
import Product from "./Product.js";

const OrderItemsSchema = new mongoose.Schema({
    name: String,
    product: Product,
    icon: String,
    image: String,
});

export default mongoose.model("OrderItems", OrderItemsSchema);
