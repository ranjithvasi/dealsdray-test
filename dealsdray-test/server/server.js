require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const path = require("path");

const app = express();
const employeeRoutes = require("./routes/employee");

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/employees", employeeRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// Define Routes
app.get("/", (req, res) => res.send("API is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
