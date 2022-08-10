import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
app.use(cors());
import morgan from "morgan";
import "express-async-errors";
// DB Connect
import connectDB from "./db/conect.js";

//Routers
import productsRouter from "./routes/productRoutes.js";
import categoriesRouter from "./routes/categoryRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

//Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

//JWT Helper
import { authJwt } from "./helpers/jwt.js";

//Path e __dirname
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
/////////////

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}
app.use(express.json());
app.use(authJwt());
app.use("/public/uploads",express.static(__dirname+"/public/uploads"));

const api = process.env.API_URL;
const port = process.env.PORT || 4000;

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
