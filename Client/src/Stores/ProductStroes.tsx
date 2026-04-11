import { create } from "zustand";
import { GetProductsById, GetRelatedProducts } from "../Services/Api";

interface ProductState {
  productSingle: any;
  relatedProducts: any[];

  setProductSingle: (productSingle: any) => void;
  setRelatedProducts: (relatedProducts: any[]) => void;

  getProductsById: (id: string) => Promise<void>;
  getRelatedProducts: (category: string, ProductId: string) => Promise<void>;
}

const useProductStore = create<ProductState>((set) => ({
  productSingle: {},
  relatedProducts: [],

  setProductSingle: (productSingle: object) => set({ productSingle }),
  setRelatedProducts: (relatedProducts: any[]) => set({ relatedProducts }),

  getProductsById: async (id: string) => {
    try {
      const res = await GetProductsById(id);
      set({ productSingle: res.data.FindProduct });
    } catch (error) {
      console.log(error);
    }
  },

  getRelatedProducts: async (category: string, ProductID: string) => {
    try {
      const res = await GetRelatedProducts(category, ProductID);
      set({ relatedProducts: res.data.Products });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useProductStore;
