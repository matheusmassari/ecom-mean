import Category from "../models/Category.js";
import { NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

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
        throw new NotFoundError("The category cannot be created, something went wrong.");
    }
    res.status(StatusCodes.CREATED).send(category)
};

export { getAllCategories, postCategory };
