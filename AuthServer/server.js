const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ConnectDB = require('../SharedDB/configDB');
const AuthRouter = require("./Routes/Routes")

ConnectDB(mongoose);

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "AuthServer is running"
    })
});

app.get("/healthz", (req, res) => {
    res.status(200).json({
        message: "AuthServer Healthz is fine"
    })
})

app.use("/auth", AuthRouter);

const PORT = process.env.AuthServerPORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});