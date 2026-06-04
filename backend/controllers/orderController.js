const cart = require("../models/cart");
const order = require("../models/order");

const getOrders = async (req, res) => {
  try {
    const orders = await order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await order
      .find({ user_id: req.user_id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createOrderFromCart = async (req, res) => {
  try {
    const userCart = await cart.findOne({ user_id: req.user._id.toString() });

    if (!userCart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const item = userCart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    const newOrder = new order({
      user_id: req.user._id.toString(),
      user_name: req.user.name,
      user_email: req.user.email,
      user_number: req.user.number,
      user_address: req.user.address,
      product_id: item.product_id,
      cart_item_id: item._id.toString(),
      category: item.category,
      name: item.name,
      img_url: item.img_url,
      price: item.price,
      quantity: item.quantity,
      total_amount: Number(item.price) * Number(item.quantity),
      metal: item.metal,
      purity: item.purity,
      weight: item.weight,
      stone: item.stone,
      size: item.size,
      making_charge: item.making_charge,
    });

    await newOrder.save();

    item.deleteOne();
    await userCart.save();

    res.status(201).json({
      msg: "Order placed successfully",
      order: newOrder,
      cart: userCart,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createOrderFromCart,
  getMyOrders,
  getOrders,
};
