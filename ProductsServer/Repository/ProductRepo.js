const Products = require("../Models/Products");

async function findById(ProductId) {
    const FindProduct = await Products.findById(ProductId);

    return FindProduct;
}

async function findProductsInCategory(category){
    const findProducts = await Products.find({ category: category });

    return findProducts;
}

async function findProductsByIds(ProductIds){
    const foundProducts = await Products.find({ _id: { $in: ProductIds } });

    return foundProducts;
}

module.exports = {
    findById,
    findProductsInCategory,
    findProductsByIds,
}