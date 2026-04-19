import { create } from "zustand";
import {
  GetCartItems,
  DeleteCartItem as DeleteCartItemAPI,
  addItemsInCart as addItemsInCartAPI,
} from "../Services/Api";

interface CartState {
  cartProducts: any;
  cartCount: number;
  loading: boolean;

  setCartProducts: (cartProducts: any) => void;
  setCartCount: (cartCount: number) => void;
  setLoading: (loading: boolean) => void;

  getCartItems: () => Promise<void>;
  DeleteCartItem: (productId: string) => Promise<boolean>;
  addItemsInCart: (productId: string) => Promise<{success: boolean, message: string}>;
}

const useCartStore = create<CartState>((set) => ({

    cartProducts: [],
    cartCount: 0,
    loading: false,

    setCartProducts: (cartProducts: any) => set({ cartProducts }),
    setCartCount: (cartCount: number) => set({ cartCount }),
    setLoading: (loading: boolean) => set({ loading }),

    getCartItems: async () => {
        try {
            const res = await GetCartItems();
            set({
              cartProducts: res.data.Products.Products,
              cartCount: res.data.Count,
            });
        } catch (error) {
            console.log(error);
        }
    },

    DeleteCartItem: async (productId: string) => {
        try {
            await DeleteCartItemAPI(productId);
            return true;
        } catch (error) {
            return false;
        }
    },

    addItemsInCart: async(productId: string) => {
        try {
            const res = await addItemsInCartAPI(productId);
            return { success: true, message: res.data.message };
        } catch (error: any) {
            return { success: false, message: error.response?.data?.message || "Something went wrong" };
        }
    }

}));

export default useCartStore;