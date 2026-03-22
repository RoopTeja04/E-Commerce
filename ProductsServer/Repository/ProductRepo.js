const Products = require("../Models/Products");

async function findById(ProductId) {
    const FindProduct = await Products.findById(ProductId);

    return FindProduct;
}

async function findProductsInCategory(category){
    const findProducts = await Products.find({ category: category });

    return findProducts;
}

module.exports = {
    findById,
    findProductsInCategory,
}