import { Product } from "@shared/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  count: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      count: 0,
      
      addItem: (product: Product, quantity: number = 1) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) => item.product.id === product.id
        );

        if (existingItemIndex >= 0) {
          // Update quantity if item already exists
          const newItems = [...items];
          newItems[existingItemIndex].quantity += quantity;
          
          set({ 
            items: newItems,
            count: get().count + quantity
          });
        } else {
          // Add new item
          set({ 
            items: [...items, { product, quantity }],
            count: get().count + quantity
          });
        }
      },
      
      removeItem: (productId: number) => {
        const { items } = get();
        const itemToRemove = items.find(item => item.product.id === productId);
        
        if (itemToRemove) {
          set({ 
            items: items.filter(item => item.product.id !== productId),
            count: get().count - itemToRemove.quantity
          });
        }
      },
      
      updateQuantity: (productId: number, quantity: number) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) => item.product.id === productId
        );

        if (existingItemIndex >= 0) {
          const newItems = [...items];
          const oldQuantity = newItems[existingItemIndex].quantity;
          newItems[existingItemIndex].quantity = quantity;
          
          set({ 
            items: newItems,
            count: get().count - oldQuantity + quantity
          });
        }
      },
      
      clearCart: () => {
        set({ items: [], count: 0 });
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (parseFloat(item.product.price) * item.quantity);
        }, 0);
      },
    }),
    {
      name: "cart-storage", // unique name for localStorage
    }
  )
);
