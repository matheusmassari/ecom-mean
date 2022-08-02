import mongoose from "mongoose";
import User from "./User";

const OrderSchema = new mongoose.Schema({
    shippingAdress1: String,
    shippingAdress2: String,
    city: String,
    zip: String,
    country: String,
    phone: Number,
    status: String,
    totalPrice: Number,
    user: User,
    // dateOrder: Date
});

export default mongoose.model("Order", OrderSchema);
