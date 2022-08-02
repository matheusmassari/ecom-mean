import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwordHash: String,
    street: String,
    apartment: String,
    city: String,
    zip: String,
    country: String,
    phone: Number,
    isAdmin: Boolean
});

export default mongoose.model("User", UserSchema);
