import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
app.use(cors());
import morgan from "morgan";

// DB Connect
import connectDB from "./db/conect.js";

//Routers
import productsRouter from "./routes/productRoutes.js"


if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

const api = process.env.API_URL;
const port = process.env.PORT || 4000;

//Middleware
app.use(express.json());

app.use(`${api}/products`, productsRouter)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server rodando na porta ${port} :)`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
