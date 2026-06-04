const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email number address password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUsers,
};
