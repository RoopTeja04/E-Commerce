const { addToCart, GetCartItems } = require("../Controller/Cart");

const router = require("express").Router();

//Add Items to Cart
router.post("/add", addToCart);

//Get Cart Items
router.get("/get/:userId", GetCartItems);

module.exports = router;