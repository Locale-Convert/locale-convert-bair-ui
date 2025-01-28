import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [],
  isCybex: false,
  setCartItems: (newCartItems) => set({ cartItems: newCartItems }),
  toggleCybex: (value) => set({ isCybex: value }), 
}));