const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

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

function printMongoHelp(err) {
  console.error("\n--- MongoDB connection failed ---");
  console.error(err?.message || err);
  const msg = String(err?.message || "");
  if (msg.includes("bad auth") || err?.code === 8000) {
    console.error(
      "\nAtlas said: wrong username or password in DB_URL.\n" +
        "Fix it in MongoDB Atlas:\n" +
        "  1) Database Access → your user → Edit → Reset password (or create a new user).\n" +
        "  2) Database → Connect → Drivers → copy the new connection string.\n" +
        "  3) Put it in backend/.env as DB_URL=...\n" +
        "If your password has @ # : etc., URL-encode it in the connection string.\n",
    );
  } else if (!process.env.DB_URL?.trim()) {
    console.error(
      "\nDB_URL is missing. Set DB_URL in backend/.env to your Atlas connection string.\n",
    );
  } else {
    console.error(
      "\nAlso check: Atlas → Network Access → allow your IP (or 0.0.0.0/0 for dev).\n",
    );
  }
}

async function start() {
  const dbUrl = process.env.DB_URL?.trim();
  if (!dbUrl) {
    printMongoHelp(new Error("DB_URL is not set"));
    process.exit(1);
  }

  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    printMongoHelp(err);
    process.exit(1);
  }

  const port = process.env.PORT || 5000;
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
  });
}

start();
