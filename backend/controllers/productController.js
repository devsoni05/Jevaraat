const cart = require("../models/cart");
const goldbar = require("../models/goldbar");
const ladiesring = require("../models/ladiesrings");
const necklace = require("../models/necklace");
const ring = require("../models/mensrings");
const appointment = require("../models/appointment");
const User = require("../models/user");

const models = {
  ring,
  ladiesring,
  necklace,
  goldbar,
  appointment,
};

const buildCartItemSnapshot = (product) => ({
  "items.$[item].name": product.name,
  "items.$[item].img_url": product.img_url,
  "items.$[item].price": product.price,
  "items.$[item].metal": product.metal,
  "items.$[item].purity": product.purity,
  "items.$[item].weight": product.weight,
  "items.$[item].stone": product.stone,
  "items.$[item].size": product.size,
  "items.$[item].making_charge": product.making_charge,
});

const getAllInventory = async (req, res) => {
  try {
    const [rings, ladiesrings, necklaces, goldbars] = await Promise.all([
      ring.find(),
      ladiesring.find(),
      necklace.find(),
      goldbar.find(),
    ]);

    res.json({
      ring: rings,
      ladiesring: ladiesrings,
      necklace: necklaces,
      goldbar: goldbars,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const readByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const Model = models[category];

    if (!Model) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const items = await Model.find();

    if (category === "appointment") {
      const appointmentsWithUsers = await Promise.all(
        items.map(async (item) => {
          const user = await User.findById(item.user_id).select(
            "name email number address",
          );

          return {
            ...item.toObject(),
            user,
          };
        }),
      );

      return res.json(appointmentsWithUsers);
    }

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const Model = models[category];

    if (!Model) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const { category: _, ...data } = req.body;

    const item = new Model({
      ...data,
      img_url: req.file.filename,
    });

    await item.save();

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteByCategory = async (req, res) => {
  try {
    const { category, id } = req.params;
    console.log(req.params);
    const Model = models[category];
    console.log(Model);

    if (!Model) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const deletedItem = await Model.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedItem,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateByCategory = async (req, res) => {
  try {
    const { category, id } = req.params;
    const Model = models[category];

    if (!Model) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.img_url = req.file.filename;
    }

    const updated = await Model.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    await cart.updateMany(
      {
        "items.product_id": id,
        "items.category": category,
      },
      {
        $set: buildCartItemSnapshot(updated),
      },
      {
        arrayFilters: [
          {
            "item.product_id": id,
            "item.category": category,
          },
        ],
      },
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createByCategory,
  deleteByCategory,
  getAllInventory,
  readByCategory,
  updateByCategory,
};
