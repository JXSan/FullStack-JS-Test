require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");
const creditorRoutes = require("./routes/creditorRoutes");

// Connect to MongoDB
connectDB();

// Create instance of express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/creditor", creditorRoutes);

module.exports = app;
