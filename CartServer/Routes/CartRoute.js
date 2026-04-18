const { addToCart, GetCartItems, deleteCartItem } = require("../Controller/Cart");

const router = require("express").Router();

//Add Items to Cart
router.post("/add", addToCart);

//Get Cart Items
router.get("/get/:userId", GetCartItems);

// delete Items from crat
router.delete("/delete/:userId/:productId", deleteCartItem);

module.exports = router;