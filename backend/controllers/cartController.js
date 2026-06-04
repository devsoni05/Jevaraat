const cart = require("../models/cart");

const addToCart = async (req, res) => {
  try {
    const {
      product_id,
      category,
      name,
      img_url,
      price,
      quantity,
      metal,
      purity,
      weight,
      stone,
      size,
      making_charge,
    } = req.body;

    if (!product_id || !category || !name || !img_url || price === undefined) {
      return res
        .status(400)
        .json({ msg: "Required cart item fields are missing" });
    }

    let userCart = await cart.findOne({ user_id: req.user._id.toString() });

    if (!userCart) {
      userCart = new cart({
        user_id: req.user._id.toString(),
        items: [],
      });
    }

    const existingItem = userCart.items.find(
      (item) => item.product_id === product_id && item.category === category,
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity) || 1;
    } else {
      userCart.items.push({
        product_id,
        category,
        name,
        img_url,
        price: Number(price),
        quantity: Number(quantity) || 1,
        metal,
        purity,
        weight,
        stone,
        size,
        making_charge,
      });
    }

    await userCart.save();

    res.status(201).json({
      msg: "Item added to cart",
      cart: userCart,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userCart = await cart.findOne({ user_id: req.user._id.toString() });

    if (!userCart) {
      return res.json({
        user_id: req.user._id.toString(),
        items: [],
      });
    }

    res.json(userCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userCart = await cart.findOne({ user_id: req.user._id.toString() });

    if (!userCart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const item = userCart.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    item.deleteOne();
    await userCart.save();

    res.json({
      msg: "Item removed from cart",
      cart: userCart,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeCartItem,
};
