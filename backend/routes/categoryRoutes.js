import express from "express";
const router = express.Router();
import Category from "../models/Category.js";

router.get(`/`, async (req, res) => {
    const CategoryList = await Category.find();
    if (!CategoryList) {
        return res.status(500).json({ success: false });
    }
    res.send(CategoryList);
});

router.post(`/`, (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save()
    if(!category) {
        return res.status(404).send("the category cant be posted!")
    }
    res.send(category);
});

export default router;
