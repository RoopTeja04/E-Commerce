const { addToCart } = require("../Controller/Cart");

const router = require("express").Router();

//Add Items to Cart
router.post("/add", addToCart);

module.exports = router;