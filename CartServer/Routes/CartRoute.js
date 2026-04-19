const { addToCart, GetCartItems, deleteCartItem } = require("../Controller/Cart");
const auth = require("../Middleware/auth");

const router = require("express").Router();

//Add Items to Cart
router.post("/add", auth, addToCart);

//Get Cart Items
router.get("/get", auth, GetCartItems);

// delete Items from crat
router.delete("/delete/:productId", auth, deleteCartItem);

module.exports = router;