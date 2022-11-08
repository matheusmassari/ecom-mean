import Order from "../models/Order.js";
import OrderItems from "../models/OrderItems.js";
import { GenericError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const getAllOrders = async (req, res) => {
    const orders = await Order.find().populate("user", "name");

    if (!orders) {
        throw new NotFoundError("No orders were found.");
    }
    res.status(StatusCodes.OK).send(orders);
};

const getSingleOrder = async (req, res) => {
    const singleOrder = await Order.findById(req.params.id)
        .populate("user", "name")
        .populate({
            path: "orderItems",
            populate: {
                path: "product",
                populate: "category",
            },
        });

    if (!singleOrder) {
        throw new NotFoundError(
            `Could not find order for give id: ${req.params.id}`
        );
    }
    res.status(StatusCodes.OK).send(singleOrder);
};

const postOrder = async (req, res) => {
    const orderItemsIds = Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderItems({
                quantity: orderItem.quantity,
                product: orderItem.product,
            });

            newOrderItem = await newOrderItem.save();
            return newOrderItem._id;
        })
    );

    const orderItemsIdsResolved = await orderItemsIds;

    const totalPricesArray = await Promise.all(
        orderItemsIdsResolved.map(async (orderItemId) => {
            const orderItem = await OrderItems.findById(orderItemId).populate(
                "product",
                "price"
            );
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice;
        })
    );

    const totalPrice = totalPricesArray.reduce((a, b) => a + b, 0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAdress1: req.body.shippingAdress1,
        shippingAdress2: req.body.shippingAdress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    });

    order = await order.save();

    if (!order) {
        throw new GenericError("Order cannot be created!");
    }
    res.status(StatusCodes.OK).send(order);
};

const updateOrderStatus = async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status,
        },
        { new: true }
    );

    if (!order) {
        throw new NotFoundError("Could not find the order for the given id");
    }

    res.status(StatusCodes.OK).send(order);
};

const deleteOrder = async (req, res) => {
    let order = await Order.findByIdAndRemove(req.params.id);
    if (order) {
        order.orderItems.map(async (orderItem) => {
            await OrderItems.findByIdAndRemove(orderItem);
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "The order was successfully deleted.",
        });
    } else {
        throw new NotFoundError("Couldn't find the order for the given ID");
    }
};

const getTotalSales = async (req, res) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    ]);
    if (!totalSales) throw new GenericError("Couldn't reach totalSales");

    res.status(StatusCodes.OK).send({
        totalSales: totalSales.pop().totalSales,
    });
};

const getOrderCount = async (req, res) => {
    const orderCount = await Order.countDocuments();
    if (!orderCount)
        throw new GenericError("Couldn't retrieve document count.");

    res.status(StatusCodes.OK).send({ orderCount: orderCount });
};

const getPersonalOrders = async (req, res) => {
    const personalOrderList = await Order.find({ user: req.params.userid })
        .populate({
            path: "orderItems",
            populate: "product",
        })
        .sort({ dateOrdered: -1 });

    if (!personalOrderList) {
        throw new NotFoundError("Couldn't get personal orders list.");
    }
    res.status(StatusCodes.OK).send(personalOrderList);
};

export {
    getAllOrders,
    postOrder,
    getSingleOrder,
    updateOrderStatus,
    deleteOrder,
    getTotalSales,
    getOrderCount,
    getPersonalOrders,
};
