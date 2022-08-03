import Category from "../models/Category.js";
import { NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const getAllCategories = async (req, res) => {
    const CategoryList = await Category.find();
    if (!CategoryList) {
        throw new NotFoundError("Category not found!");
    }
    res.status(StatusCodes.OK).send(CategoryList);
};

const postCategory = async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });
    category = await category.save();
    if (!category) {
        throw new NotFoundError(
            "The category cannot be created, something went wrong."
        );
    }
    res.status(StatusCodes.CREATED).send(category);
};

const deleteCategory = async (req, res) => {
    let category = await Category.findByIdAndRemove(req.params.id);
    if (category) {
        res.status(StatusCodes.OK).json({
            success: true,
            message: "The category was successfully deleted.",
        });
    } else {
        throw new NotFoundError("Couldn't find the category for the given ID");
    }
};

const getSingleCategoryDetails = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        throw new NotFoundError("Couldn't find the category for the given ID");
    }
    res.status(StatusCodes.OK).send(category);
};

const updateCategory = async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        { new: true }
    );
    if (!category) {
        throw new NotFoundError("Couldn't find the category for the given ID");
    }
    res.status(StatusCodes.OK).send(category);
};

export {
    getAllCategories,
    postCategory,
    deleteCategory,
    getSingleCategoryDetails,
    updateCategory,
};
