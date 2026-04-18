const Products = require("../Models/Products");
const ProductService = require("../Services/ProductService");


// Add Products in Bulk or single
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

// Search Bar 
exports.findItemsByCategorySearch = async (req, res) => {

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

// Find Prdouct by ID
exports.findItemsById = async (req, res) => {

    const ProductId = req.params.ProductId;

    try {
        const FindProduct = await ProductService.FindOrder(ProductId);

        return res.status(201).json({
            message: "Product Founded",
            FindProduct,
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

// Fetching the mobiles in frontend
exports.findByCategory = async (req, res) => {

    const category = req.query.category;

    try {
        const FindProduct = await ProductService.FindProducts(category);

        return res.status(201).json({
            message: "Available Products",
            totalLength: FindProduct.length,
            Products: FindProduct,
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

// Fetch Total Categories available in DB
exports.findTotalCategories = async (req, res) => {
    try {
        const Categories = await Products.distinct("category");

        return res.status(201).json({
            message: "Available Categories",
            totalLength: Categories.length,
            Categories: Categories,
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

// Fetch Related Products available in DB
exports.findRelatedProducts = async (req, res) => {

    const { category, ProductId } = req.query;

    try {
        const FindProduct = await ProductService.RelatedProducts(category, ProductId);

        return res.status(201).json({
            message: "Available Products",
            totalLength: FindProduct.length,
            Products: FindProduct,
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

// Get Bulk Products for cart
exports.findProductsForCart = async (req, res) => {
    const { ProductIds } = req.body;

    try {
        const FindProducts = await ProductService.GetBulkProducts(ProductIds);

        return res.status(201).json({
            message: "Products Fetched Successfully",
            Products: FindProducts,
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}