const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "xyzpqr";
/*
const seedDefaultAdmin = async () => {
  try {
    const defaultAdmins = [
      {
        name: "Admin",
        email: "dev71765@gmail.com",
        number: "0000000000",
        address: "Jeveraat Admin Office",
        password: "11111111",
      },
      {
        name: "tester",
        email: "tester11@gmail.com",
        number: "7676453429",
        address: "bhopal",
        password: "tester11",
      },
    ];

    for (const adminData of defaultAdmins) {
      const normalizedEmail = adminData.email.toLowerCase();
      const existingAdmin = await Admin.findOne({ email: normalizedEmail });

      if (existingAdmin) {
        continue;
      }

      const hashedPassword = await bcrypt.hash(adminData.password, 10);

      const defaultAdmin = new Admin({
        name: adminData.name,
        email: normalizedEmail,
        number: adminData.number,
        address: adminData.address,
        password: hashedPassword,
      });

      await defaultAdmin.save();
      console.log("Default admin created:", normalizedEmail);
    }
  } catch (err) {
    console.log("Default admin seed error:", err.message);
  }
};
*/
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Authorization token is required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const loggedInUser = await User.findById(decoded.id).select(
      "_id name email address number",
    );

    if (!loggedInUser) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = loggedInUser;
    req.user_id = loggedInUser._id.toString();

    if (req.body && typeof req.body === "object") {
      req.body.user_id = req.user_id;
    }

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

const authenticateAccount = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Authorization token is required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role === "admin") {
      const loggedInAdmin = await Admin.findById(decoded.id).select(
        "_id name email address number",
      );

      if (!loggedInAdmin) {
        return res.status(401).json({ msg: "Admin not found" });
      }

      req.admin = loggedInAdmin;
      req.admin_id = loggedInAdmin._id.toString();
      return next();
    }

    const loggedInUser = await User.findById(decoded.id).select(
      "_id name email address number",
    );

    if (!loggedInUser) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = loggedInUser;
    req.user_id = loggedInUser._id.toString();
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, number, address, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!name || !normalizedEmail || !number || !address || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email: normalizedEmail,
      number,
      address,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ msg: "User Registered Successfully" });
    console.log(newUser);
  } catch (err) {
    console.log("Register error:", err.message, req.body);
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    if (!user.password) {
      return res
        .status(500)
        .json({ error: "User password is missing in database" });
    }

    let isMatch = false;
    const hasBcryptHash = /^\$2[aby]\$\d{2}\$/.test(user.password);

    if (hasBcryptHash) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Support legacy plain-text passwords and upgrade them after a successful login.
      isMatch = password === user.password;

      if (isMatch) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
      }
    }

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        number: user.number,
      },
    });
  } catch (err) {
    console.log("Login error:", err.message, req.body);
    res.status(500).json({ error: err.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email: normalizedEmail });

    if (!admin) {
      return res.status(400).json({ msg: "Invalid Admin Email" });
    }

    if (!admin.password) {
      return res
        .status(500)
        .json({ error: "Admin password is missing in database" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Admin Password" });
    }

    const token = jwt.sign({ id: admin._id, role: "admin" }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        address: admin.address,
        number: admin.number,
      },
    });
  } catch (err) {
    console.log("Admin login error:", err.message, req.body);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  adminLogin,
  authenticateAccount,
  authenticateUser,
  login,
  register,
  /*seedDefaultAdmin,*/
};
