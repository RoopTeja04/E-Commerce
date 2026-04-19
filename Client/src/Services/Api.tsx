import axios from "axios";
import { useAuthStore } from "../Stores/AuthStore";

export const AuthAPI = axios.create({
    baseURL: "http://localhost:5000/auth",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add access token
AuthAPI.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

AuthAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isAuthEndpoint = originalRequest.url.includes("/login") || 
                              originalRequest.url.includes("/register") || 
                              originalRequest.url.includes("/verify-otp") ||
                              originalRequest.url.includes("/refresh-token");

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true;
            try {
                const res = await axios.post("http://localhost:5000/auth/refresh-token", {}, { withCredentials: true });
                const { accessToken, user } = res.data;
                useAuthStore.getState().setAuth(user, accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return AuthAPI(originalRequest);
            } catch (err) {
                useAuthStore.getState().logout();
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

// Auth API Calling
export const RegisterUser = async (data: any) => {
    return await AuthAPI.post("/register", data);
}

export const LoginUser = async (data: any) => {
    return await AuthAPI.post("/login", data);
}

export const VerifyOTPUser = async (data: any) => {
    return await AuthAPI.post("/verify-otp", data);
}

export const ResendOTP = async (email: string) => {
    return await AuthAPI.post("/resend-otp", { email });
}

export const FindUserById = async (userId: string) => {
    return await AuthAPI.get(`/find-user/${userId}`);
}

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

// Cart API

export const CartAPI = axios.create({
    baseURL: "http://localhost:5003/cart",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Reuse interceptors for CartAPI
CartAPI.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

CartAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post("http://localhost:5000/auth/refresh-token", {}, { withCredentials: true });
                const { accessToken, user } = res.data;
                useAuthStore.getState().setAuth(user, accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return CartAPI(originalRequest);
            } catch (err) {
                useAuthStore.getState().logout();
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

// Cart API Calling

export const GetCartItems = async () => {
    return await CartAPI.get("/get");
}

export const DeleteCartItem = async (productId: string) => {
    return await CartAPI.delete(`/delete/${productId}`);
}

export const addItemsInCart = async (productId: string) => {
    return await CartAPI.post("/add", { productId });
}