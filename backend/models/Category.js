import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    }, 
    icon: {
        type: String,
    },
    image: {
        type: String,
    }
});

export default mongoose.model("Category", CategorySchema);
