const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

// middleware
app.use(express.json());
app.use(cors()); // ✅ allows ALL origins

// routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Book Store Server is running!");
});

// Connect to MongoDB
const dbUrl = process.env.DB_URL?.trim();
if (dbUrl) {
  mongoose
    .connect(dbUrl)
    .then(() => console.log("MongoDB connected successfully."))
    .catch((err) => console.error("MongoDB connection failed:", err));
} else {
  console.error("DB_URL is missing.");
}

module.exports = app;
