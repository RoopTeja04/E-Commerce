const ProductRepository = require("../Repository/ProductRepo");

async function FindOrder(ProductId) {
    const Product = await ProductRepository.findById(ProductId);

    if (!Product) {
        throw new Error("No Product Found");
    }

    return Product;
}

async function FindProducts(category) {
    const Products = await ProductRepository.findProductsInCategory(category);

    if (!Products)
        throw new Error("No Products Found in this Category");

    return Products;
}

async function RelatedProducts(category, ProductId) {
    const Products = await ProductRepository.findProductsInCategory(category);

    if (!Products)
        throw new Error("No Products Found in this Category");

    const FinalProducts = Products.filter((product) => product._id.toString() !== ProductId.toString());

    return FinalProducts;
}

module.exports = {
    FindOrder,
    FindProducts,
    RelatedProducts,
}