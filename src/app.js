const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");

require('dotenv').config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/attendance", require("./routes/attendance"));

// Root Endpoint
app.get("/", (req, res) => {
    res.send("API Running...");
});

module.exports = app;