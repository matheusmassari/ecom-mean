import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    orderItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderItem",
            required: true,
        },
    ],
    shippingAdress1: {
        type: String,
        required: true,
    },
    shippingAdress2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
    },
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Order", OrderSchema);
