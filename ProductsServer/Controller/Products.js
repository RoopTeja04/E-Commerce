const Products = require("../Models/Products");

exports.addProductsInBulk = async (req, res) => {
    try {

        const products = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({
                message: "No products found",
            });
        }

        const insertedProducts = await Products.insertMany(products);

        return res.status(201).json({
            message: "Products inserted successfully",
            totalLength: insertedProducts.length,
            data: insertedProducts
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to insert products",
            error: error.message
        });
    }
}
