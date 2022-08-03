import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const getSingleProductDetails = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new NotFoundError("Couldn't find the category for the given ID");
    }
    res.status(StatusCodes.OK).send(product);
};

const getAllProducts = async (req, res) => {
    const ProductsList = await Product.find();
    if (!ProductsList) {
        throw new NotFoundError("Category not found!");
    }
    res.status(StatusCodes.OK).send(ProductsList);
};

const postProduct = async (req, res) => {
    const category = await Category.findById(req.body.category);

    if (!category) {
        throw new BadRequestError("Invalid category");
    }

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    });

    product = await product.save();

    if (!product) {
        throw new BadRequestError(
            "Couldn't post the product, something went wrong!"
        );
    }

    res.status(StatusCodes.CREATED).send(product);
};

const updateProduct = async (req, res) => {
    const category = await Category.findById(req.body.category);

    if (!category) {
        throw new BadRequestError("Invalid category");
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true }
    );
    if (!product) {
        throw new NotFoundError("Couldn't find the product for the given ID");
    }
    res.status(StatusCodes.OK).send(product);
};

const deleteProduct = async (req, res) => {
     let product = await Product.findByIdAndRemove(req.params.id);
     if (product) {
         res.status(StatusCodes.OK).json({
             success: true,
             message: "The product was successfully deleted.",
         });
     } else {
         throw new NotFoundError("Couldn't find the product for the given ID");
     }
};

export {
    getSingleProductDetails,
    getAllProducts,
    postProduct,
    updateProduct,
    deleteProduct,
};
