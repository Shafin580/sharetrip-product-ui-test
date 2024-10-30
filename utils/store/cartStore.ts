import { createStore } from "zustand/vanilla"
import { persist } from "zustand/middleware"

export type CartState = {
  count: number
  items: ProductProps[]
}

export type CartActions = {
  addToCart: (item: ProductProps) => void
  removeFromCart: (itemId: number) => void
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
        clearCart: () => set(() => ({ items: [], count: 0 })),
      }),
      {
        name: "cart-storage", // unique name for the persisted data
        getStorage: () => localStorage, // specify storage type
      }
    )
  )
}
