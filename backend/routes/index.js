const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const {
  adminLogin,
  authenticateAccount,
  authenticateUser,
  login,
  register,
 /* seedDefaultAdmin,*/
} = require("../controllers/authController");
const { askInventoryAssistant } = require("../controllers/aiController");
const { createAppointment } = require("../controllers/appointmentController");
const {
  addToCart,
  getCart,
  removeCartItem,
} = require("../controllers/cartController");
const { getGoldRate } = require("../controllers/goldRateController");
const {
  createOrderFromCart,
  getMyOrders,
  getOrders,
} = require("../controllers/orderController");
const {
  createByCategory,
  deleteByCategory,
  getAllInventory,
  readByCategory,
  updateByCategory,
} = require("../controllers/productController");
const { getUsers } = require("../controllers/userController");

const router = express.Router();
const productUploadDir = path.join(__dirname, "..", "uploads");
const assistantUploadDir = path.join(productUploadDir, "assistant");

fs.mkdirSync(productUploadDir, { recursive: true });
fs.mkdirSync(assistantUploadDir, { recursive: true });

const upload = multer({ dest: productUploadDir });
const assistantUpload = multer({
  dest: assistantUploadDir,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 5,
  },
});

router.use("/appointment", authenticateUser);
router.use("/cart", authenticateUser);

router.get("/inventory",  getAllInventory);
router.post(
  "/ai/assistant",
  assistantUpload.array("attachments", 5),
  askInventoryAssistant,
);
router.get("/read/:category", readByCategory);
router.get("/users", getUsers);
router.get("/gold-rate", getGoldRate);

router.get("/orders", getOrders);
router.get("/orders/my", authenticateUser, getMyOrders);
router.post("/orders/from-cart/:itemId", authenticateUser, createOrderFromCart);

router.post("/create/:category", upload.single("img_url"), createByCategory);
router.delete("/delete/:category/:id", deleteByCategory);
router.patch(
  "/update/:category/:id",
  upload.single("img_url"),
  updateByCategory,
);

router.post("/appointment", createAppointment);

router.post("/cart/add", addToCart);
router.get("/cart", getCart);
router.delete("/cart/item/:itemId", removeCartItem);

router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", adminLogin);

module.exports = router;
