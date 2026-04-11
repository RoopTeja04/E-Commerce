const CartModel = require("../Models/CartModel");

async function FindCart(productId, userId) {
    try {

        const findItem = await CartModel.findOne({ productId, userId });
        return findItem;

    } catch (err) {
        throw new Error(err.message);
    }
}

async function AddToCart(userId, productId) {
    try {

        const addToCart = await CartModel.create({
            userId,
            productId
        })

        return addToCart;

    } catch (err) {
        throw new Error(err.message);
    }

}

module.exports = {
    FindCart,
    AddToCart,
}