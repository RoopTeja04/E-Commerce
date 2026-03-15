const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true,
    },
    Specifications: {
        type: Map,
        of: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Products", ProductSchema);