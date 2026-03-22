import axios from "axios";

export const AuthAPI = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// products API 

export const ProductAPI = axios.create({
    baseURL: "http://localhost:5001/products",
    headers: {
        "Content-Type": "application/json",
    },
});

// products API Calling

export const GetProductsForCategory = async (category: string) => {
    return await ProductAPI.get(`/get-products-by-category?category=${category}`);
}