const CartService = require("../Services/CartService");
const { FindUser, FindProduct, GetBulkProducts } = require("../Clients/InterService");

exports.addToCart = async (req, res, next) => {

    const { productId } = req.body;
    const userId = req.user.ID;

    try {

        const findProduct = await FindProduct(productId);

        if (!findProduct) {
            return res.status(404).json({
                message: "Product Not Found"
            })
        }

        const addToCart = await CartService.AddItems(userId, productId);

        return res.status(200).json({
            message: "Product Added to Cart Successfully",
            data: addToCart
        })

    } catch (err) {
        next(err);
    }
}

exports.GetCartItems = async (req, res, next) => {

    const userId = req.user.ID;

    try {

        const GetCartItems = await CartService.GetCartItems(userId);

        const ProductIds = GetCartItems.map((item) => item.productId);

        const fetchedBulkProducts = await GetBulkProducts(ProductIds);

        return res.status(201).json({
            message: "Founded Items in Cart",
            Count: GetCartItems.length,
            Products: fetchedBulkProducts,
        })

    } catch (err) {
        next(err);
    }
}

exports.deleteCartItem = async (req, res, next) => {

    const { productId } = req.params;
    const userId = req.user.ID;

    try {

        const findProduct = await FindProduct(productId);

        if (!findProduct) {
            return res.status(404).json({
                message: "Product Not Found"
            })
        }

        const deleteCartItem = await CartService.DeleteCartItem(userId, productId);

        return res.status(200).json({
            message: "Product Deleted From Cart Successfully",
            data: deleteCartItem
        })

    } catch (err) {
        next(err);
    }
}