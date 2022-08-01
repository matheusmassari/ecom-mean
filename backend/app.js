import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

// DB Connect
import connectDB from "./db/conect.js";


if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

const api = process.env.API_URL;
const port = process.env.PORT || 4000;

//Middleware
app.use(express.json());

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: "Hair dresser",
        image: "some_url",
    };
    res.send(product);
});

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct);
});

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
