
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },

        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price cannot be negative"]
        },

        description: {
            type: String,
            trim: true
        },

        category: {
            type: String,
            required: [true, "Product category is required"],
            trim: true
        },

        inStock: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

// Text index for product name searching
productSchema.index({ name: "text" });

// Create and export Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
