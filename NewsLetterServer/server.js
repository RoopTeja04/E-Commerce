const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const ConnectDB = require('../SharedDB/configDB');
const NewsLetterRoutes = require('./Routes/NewsLetterRoutes');
const { errorHandler } = require("../SharedMiddleware/common");

ConnectDB(mongoose);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/newsletter", NewsLetterRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "NewsLetterServer is running"
    })
});

app.get("/healthz", (req, res) => {
    res.status(200).json({
        message: "NewsLetterServer Healthz is fine"
    })
})

const PORT = process.env.NewsLetterServerPORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});