import { createStore } from "zustand/vanilla"
import { persist } from "zustand/middleware"

export type CartState = {
  count: number
  items: ProductProps[]
}

export type CartActions = {
  addToCart: (item: ProductProps) => void
  removeFromCart: (itemId: number) => void
  removeItem: (itemId: number) => void
  clearCart: () => void
}

export type CartStore = CartState & CartActions

export const initCartStore = (): CartState => {
  return { count: 0, items: [] }
}

export const defaultInitState: CartState = {
  count: 0,
  items: [],
}

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set) => ({
        ...initState,
        addToCart: (item) =>
          set((state) => ({
            items: [...state.items, item],
            count: [...state.items, item].length,
          })),
        removeFromCart: (itemId: number) =>
          set((state) => ({
            items: state.items.filter((item) => item.id !== itemId),
            count: state.items.filter((item) => item.id !== itemId).length,
          })),
          removeItem: (itemId: number) =>
            set((state) => {
              const index = state.items.findIndex((item) => item.id === itemId);
              if (index === -1) return state; // If no item with that ID, return the state unchanged
              const newItems = [...state.items];
              newItems.splice(index, 1); // Remove the first matching item
              return {
                items: newItems,
                count: newItems.length,
              };
            }),
        clearCart: () => set(() => ({ items: [], count: 0 })),
      }),
      {
        name: "cart-storage", // unique name for the persisted data
        getStorage: () => localStorage, // specify storage type
      }
    )
  )
}
