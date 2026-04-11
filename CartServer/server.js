const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const cors = require('cors');
const ConnectDB = require('../SharedDB/configDB');
const CartRoute = require("./Routes/CartRoute");

const app = express();
ConnectDB(mongoose);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "CartServer is running"
    })
});

app.get("/healthz", (req, res) => {
    res.status(200).json({
        message: "CartServer Healthz is fine"
    })
})

app.use("/cart", CartRoute);

const PORT = process.env.CartServerPORT;
app.listen(PORT, () => {
    console.log(`Cart Server is running on port ${PORT}`);
});