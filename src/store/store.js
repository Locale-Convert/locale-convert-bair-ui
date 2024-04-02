import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [],
  activeLanguage: 'ua', 
  setCartItems: (newCartItems) => set({ cartItems: newCartItems }),
  setActiveLanguage: (language) => set({ activeLanguage: language }),
}));