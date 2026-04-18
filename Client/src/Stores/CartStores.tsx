import { create } from "zustand";
import {
  GetCartItems,
  DeleteCartItem,
  addItemsInCart,
} from "../Services/Api";

interface CartState {
  cartProducts: any;
  cartCount: number;
  loading: boolean;

  setCartProducts: (cartProducts: any) => void;
  setCartCount: (cartCount: number) => void;
  setLoading: (loading: boolean) => void;

  getCartItems: (userId: string) => Promise<void>;
  DeleteCartItem: (userId: string, productId: string) => Promise<boolean>;
  addItemsInCart: (userId: string, productId: string) => Promise<{success: boolean, message: string}>;
}

const useCartStore = create<CartState>((set) => ({

    cartProducts: [],
    cartCount: 0,
    loading: false,

    setCartProducts: (cartProducts: any) => set({ cartProducts }),
    setCartCount: (cartCount: number) => set({ cartCount }),
    setLoading: (loading: boolean) => set({ loading }),

    getCartItems: async (userId: string) => {
        try {
            const res = await GetCartItems(userId);
            set({
              cartProducts: res.data.Products.Products,
              cartCount: res.data.Count,
            });
        } catch (error) {
            console.log(error);
        }
    },

    DeleteCartItem: async (userId: string, productId: string) => {
        try {
            const res = await DeleteCartItem(userId, productId);
            return true;
        } catch (error) {
            return false;
        }
    },

    addItemsInCart: async(userId: string, productId: string) => {
        try {
            const res = await addItemsInCart(userId, productId);
            return { success: true, message: res.data.message };
        } catch (error: any) {
            return { success: false, message: error.response?.data?.error || "Something went wrong" };
        }
    }

}));

export default useCartStore;