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

async function GetCartItems(userId){
    try{

        const findCart = await CartModel.find({ userId });
        return findCart;

    }catch(err){
        throw new Error(err.message);
    }
}

async function DeleteCartItem(userId, productId){
    try{

        const deleteCartItem = await CartModel.deleteOne({ userId, productId });
        return deleteCartItem;

    }catch(err){
        throw new Error(err.message);
    }
}

module.exports = {
    FindCart,
    AddToCart,
    GetCartItems,
    DeleteCartItem
}