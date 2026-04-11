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

export const GetProductsById = async (id: string) => {
    return await ProductAPI.get(`/get-products-by-id/${id}`);
}

export const GetRelatedProducts = async (category: string, ProductId: string) => {
    return await ProductAPI.get(`/get-related-products?category=${category}&ProductId=${ProductId}`);
}

// News Letter API

export const NewsLetterAPI = axios.create({
    baseURL: "http://localhost:5002/newsletter",
    headers: {
        "Content-Type": "application/json",
    },
});

// News Letter API calling 

export const SubscribeNewsLetter = async (email: string) => {
    return await NewsLetterAPI.post("/create-news-letter", { email });
}