const mongoose = require("mongoose");
const CartModel = require("../Models/CartModel");

async function FindCart(productId, userId) {
    try {
        const findItem = await CartModel.findOne({ 
            productId: new mongoose.Types.ObjectId(productId), 
            userId: new mongoose.Types.ObjectId(userId) 
        });
        return findItem;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function AddToCart(userId, productId) {
    try {
        const addToCart = await CartModel.create({
            userId: new mongoose.Types.ObjectId(userId),
            productId: new mongoose.Types.ObjectId(productId)
        })
        return addToCart;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function GetCartItems(userId){
    try{
        const findCart = await CartModel.find({ 
            userId: new mongoose.Types.ObjectId(userId) 
        });
        return findCart;
    }catch(err){
        throw new Error(err.message);
    }
}

async function DeleteCartItem(userId, productId){
    try{
        const deleteCartItem = await CartModel.deleteOne({ 
            userId: new mongoose.Types.ObjectId(userId), 
            productId: new mongoose.Types.ObjectId(productId) 
        });
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