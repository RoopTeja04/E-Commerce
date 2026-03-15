const Router = require("express").Router();
const { addProductsInBulk } = require("../Controller/Products");

Router.post("/add-products-in-bulk", addProductsInBulk);

module.exports = Router;