const express = require("express");
const cors = require("cors");
require("./config/db");

const { seedDefaultAdmin } = require("./controllers/authController");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use("/uploads", express.static("uploads"));

/*seedDefaultAdmin();*/

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
