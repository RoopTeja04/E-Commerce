const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const AuthServerBaseURL = `http://localhost:${process.env.AuthServerPORT || 5000}`;
const ProductsServerBaseURL = `http://localhost:${process.env.ProductsServerPORT || 5001}`;

const AuthAPI = axios.create({
    baseURL: AuthServerBaseURL
});

const ProductsAPI = axios.create({
    baseURL: ProductsServerBaseURL
});

// Inter-service functions

const FindUser = async (userId) => {
    try {
        const response = await AuthAPI.get(`/auth/find-user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error finding user:", error.message);
        throw error;
    }
};

const FindProduct = async (productId) => {
    try {
        const response = await ProductsAPI.get(`/products/get-products-by-id/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error finding product:", error.message);
        throw error;
    }
};

module.exports = {
    FindUser,
    FindProduct
};
