const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const cors = require('cors');
const ConnectDB = require('../SharedDB/configDB');
const ProductsRoute = require("./Routes/ProductRoutes");

const app = express();
ConnectDB(mongoose);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "ProductsServer is running"
    })
});

app.get("/healthz", (req, res) => {
    res.status(200).json({
        message: "ProductsServer Healthz is fine"
    })
})

app.use("/products", ProductsRoute);

const PORT = process.env.ProductsServerPORT;
app.listen(PORT, () => {
    console.log(`Products Server is running on port ${PORT}`);
});