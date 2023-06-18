const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDatabase } = require("./configs/dbConfig");
const authMiddleware = require("./middlewares/authMiddleware");

// add .env config into app
require("dotenv").config();

// creating express app
const app = express();

// setting up port
const port = process.env.PORT || 3001;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// connecting to DB
connectToDatabase();

// test endpoint
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// attach controllers with specified routes
app.use("/auth", require("./controllers/auth"));
app.use("/category", authMiddleware, require("./controllers/category"));
app.use("/car", authMiddleware, require("./controllers/car"));

// listener function
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
