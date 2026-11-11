const Product = require("../models/Product");

// Escape special characters in search text
const escapeRegex = (text) => {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// 1. CREATE A PRODUCT
const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, inStock } = req.body;

        const product = await Product.create({
            name,
            price,
            description,
            category,
            inStock
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// 2. GET ALL PRODUCTS
const getProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        if (!Number.isInteger(page) || page < 1 ||
            !Number.isInteger(limit) || limit < 1 || limit > 100) {
            return res.status(400).json({
                success: false,
                message: "Page must be positive and limit must be between 1 and 100"
            });
        }

        const skip = (page - 1) * limit;

        // Search and category filtering
        const filter = {};

        const search = req.query.search || req.query.name;

        if (search) {
            filter.name = {
                $regex: escapeRegex(search),
                $options: "i"
            };
        }

        if (req.query.category) {
            filter.category = {
                $regex: `^${escapeRegex(req.query.category)}$`,
                $options: "i"
            };
        }

        // Sorting
        const allowedSortFields = [
            "price", "-price",
            "name", "-name",
            "createdAt", "-createdAt"
        ];

        const sort = req.query.sort || "-createdAt";

        if (!allowedSortFields.includes(sort)) {
            return res.status(400).json({
                success: false,
                message: "Invalid sort field"
            });
        }

        const sortField = sort.startsWith("-")
            ? sort.substring(1)
            : sort;

        const sortOrder = sort.startsWith("-") ? -1 : 1;

        // Retrieve products
        const products = await Product.find(filter)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            page,
            limit,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 3. GET A SINGLE PRODUCT
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        const status = error.name === "CastError" ? 400 : 500;

        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};


// 4. UPDATE A PRODUCT

const updateProduct = async (req, res) => {
    try {
        const allowedFields = [
            "name",
            "price",
            "description",
            "category",
            "inStock"
        ];

        // Check that the request contains valid fields
        const requestedFields = Object.keys(req.body || {});

        const invalidFields = requestedFields.filter(
            field => !allowedFields.includes(field)
        );

        if (invalidFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product fields",
                invalidFields
            });
        }

        // Prevent empty updates
        if (requestedFields.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one field to update"
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        const status = error.name === "CastError" ? 400 : 400;

        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};

            

// 5. DELETE A PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        const status = error.name === "CastError" ? 400 : 500;

        res.status(status).json({
            success: false,
            message: error.message
        });
    }
};


// Export all controller functions
module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};