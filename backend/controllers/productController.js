import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

const getSingleProductDetails = async (req, res) => {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
        throw new NotFoundError("Couldn't find the category for the given ID");
    }
    res.status(StatusCodes.OK).send(product);
};

const getAllProducts = async (req, res) => {
    const ProductsList = await Product.find().populate("category");
    if (!ProductsList) {
        throw new NotFoundError("Category not found!");
    }
    res.status(StatusCodes.OK).send(ProductsList);
};

const postProduct = async (req, res) => {
    const category = await Category.findById(req.body.category)

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
    if (!mongoose.isValidObjectId(req.params.id)) {
        throw new BadRequestError("Invalid product ID!");
    }
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

const getCount = async (req, res) => {
    const productCount = await Product.countDocuments();
    if (!productCount) {
        return new NotFoundError("Something went wront, try again later.");
    }
    res.status(StatusCodes.OK).send({ productCount: productCount });
};

const getFeatured = async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const featuredProducts = await Product.find({ isFeatured: true }).limit(
        count
    );
    if (!featuredProducts) {
        throw new NotFoundError("Couldn't find featured products");
    }
    res.status(StatusCodes.OK).send(featuredProducts);
};

const filterByCategories = async (req, res) => {
    let filter = [];
    if (req.query.categories) {
        filter = req.query.categories.split(",");
    }
    const productList = await Product.find({ category: filter }).populate(
        "category"
    );

    if (!productList) {
        throw new NotFoundError("Couldnt find any matches");
    }

    res.status(StatusCodes.OK).send(productList);
};

export {
    getSingleProductDetails,
    getAllProducts,
    postProduct,
    updateProduct,
    deleteProduct,
    getCount,
    getFeatured,
    filterByCategories,
};
