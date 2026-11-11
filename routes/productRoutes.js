
const express = require("express");

const router = express.Router();

// Import controller functions
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// Create a product
router.post("/", createProduct);

// Get all products
router.get("/", getProducts);

// Get one product
router.get("/:id", getProductById);

// Update a product
router.put("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
