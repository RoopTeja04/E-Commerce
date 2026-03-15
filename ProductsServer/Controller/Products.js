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


exports.findItemsByCategory = async (req, res) => {

    const { category, productName } = req.query;

    try {

        if (!category && !productName) {
            return res.status(400).json({
                message: "Please provide category or productName",
            });
        };

        let query = {};

        if (category && category !== "all") {
            query.category = { $regex: category, $options: "i" }
        };

        if (productName) {
            query.name = { $regex: productName, $options: "i" }
        };

        const FetchProducts = await Products.find(query);

        if (FetchProducts.length === 0) {
            return res.status(404).json({
                message: "No products found",
            });
        };

        return res.status(201).json({
            message: "Products fetched successfully",
            totalLength: FetchProducts.length,
            product: FetchProducts,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        });
    }
}

exports.findItemsById = async (req, res) => {

    const ProductId = req.params.ProductId;

    try {

        if(!ProductId){
            return res.status(400).json({
                message: "Please provide ProductId",
            });
        }

        const FetchProduct = await Products.findById(ProductId);

        if(!FetchProduct){
            return res.status(404).json({
                message: "No product found",
            });
        }

        return res.status(201).json({
            message: "Product fetched successfully",
            product: FetchProduct,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        });
    }
}