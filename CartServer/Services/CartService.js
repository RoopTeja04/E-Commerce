const CartRepository = require("../Repository/CartRepository");

async function AddItems(userId, productId) {
    try {

        const findCart = await CartRepository.FindCart(productId, userId);

        if (findCart) {
            throw new Error("Item already added to your cart");
        }

        const addToCart = await CartRepository.AddToCart(userId, productId);

        return addToCart;

    } catch (err) {
        throw new Error(err.message);
    }
}

async function GetCartItems(userId){
    try{

        const findCart = await CartRepository.GetCartItems(userId);

        if(!findCart){
            throw new Error("No Items Found in your Cart");
        }

        return findCart;

    }catch(err){
        throw new Error(err.message);
    }
}

module.exports = {
    AddItems,
    GetCartItems
}