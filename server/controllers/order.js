const Order = require("../models/order");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json({
      message: "Success",
      orders,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    console.log(req.body)
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    res.json({ success: true, order: deletedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
