import { Product } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProductTypes = Product & {
  quantity: number;
};

interface Types {
  items: ProductTypes[];
  favoriteProducts: ProductTypes[];
  addToCart: (product: ProductTypes) => void;
  removeFromCart: (id: string) => void;
  deleteCartProduct: (id: string) => void;
  resetCart: () => void;
  getTotalCount: (product: ProductTypes) => number;
  getTotalPrice: (product: ProductTypes) => number;
  getDiscountedSubTotal: () => number;
  getSubTotal: () => number;
  addToFavorite: (product: Product) => void;
  removeFromFavorite: (id: string) => void;
  resetFavorites: () => void;
}

export const useCartStore = create<Types>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteProducts: [],
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.items?.find(
            (item) => item._id === product?._id,
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item._id === product?._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            return { items: [...state.items, { ...product, quantity: 1 }] };
          }
        });
      },
      removeFromCart: (id) => {
        set((state) => {
          const existingItem = state.items?.find((item) => item._id === id);
          if (existingItem?.quantity === 1) {
            return {
              items: state.items.filter((item) => item._id !== id),
            };
          } else {
            return {
              items: state.items.map((item) =>
                item._id === id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              ),
            };
          }
        });
      },
      deleteCartProduct: (id) => {
        set((state) => {
          return {
            items: state.items.filter((item) => item._id !== id),
          };
        });
      },
      resetCart: () => {
        set({ items: [] });
      },
      getTotalCount: (product) => {
        const items = get().items;
        const existingitem = items?.find((item) => item._id === product?._id);
        return existingitem?.quantity || 0;
      },
      getTotalPrice: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item._id === product?._id);

        if (existingItem) return existingItem.quantity * existingItem.price;
        else {
          return 0;
        }
      },
      getDiscountedSubTotal: () => {
        const items = get().items;
        return items.reduce(
          (total, item) => total + (item.price ?? 0) * item.quantity,
          0,
        );
      },
      getSubTotal: () => {
        const items = get().items;
        const finalTotal = items.reduce((acc, item) => {
          const increase =
            ((item.price as number) * (item.discount as number)) / 100;
          return acc + ((item.price as number) + increase) * item.quantity;
        }, 0);

        return finalTotal;
      },
      addToFavorite: (product) => {
        set((state) => {
          const existingItem = state.favoriteProducts.find(
            (item) => item._id === product._id,
          );
          if (existingItem) {
            return state;
          }
          return { favoriteProducts: [...state.favoriteProducts, product] };
        });
      },
      removeFromFavorite: (id) => {
        set((state) => {
          return {
            favoriteProducts: state.favoriteProducts.filter(
              (item) => item._id !== id,
            ),
          };
        });
      },
      resetFavorites: () => {
        set({ favoriteProducts: [] });
      },
    }),
    { name: "cart-store" },
  ),
);
