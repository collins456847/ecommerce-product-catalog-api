
const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the E-commerce Product Catalog API"
    });
});

// Product routes
app.use("/api/products", productRoutes);


// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


// Server port
const PORT = process.env.PORT || 3000;

// Start server after database connection
const startServer = async () => {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
