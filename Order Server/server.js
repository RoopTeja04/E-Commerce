const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const ConnectDB = require('../SharedDB/configDB');
const { errorHandler } = require("../SharedMiddleware/common");

ConnectDB(mongoose);

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);



app.get('/', (req, res) => {
  res.status(200).json({
    message: "Order Server is running"
  })
});

app.get("/healthz", (req, res) => {
  res.status(200).json({
    message: "Order Server Healthz is fine"
  })
})

const PORT = process.env.OrderServerPORT;

app.listen(PORT, ()=>{
    console.log(`Order Server is running on port ${PORT}`);
});