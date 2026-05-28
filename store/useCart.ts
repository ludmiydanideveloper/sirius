import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definimos qué info guardamos de cada producto
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  cartIsOpen: boolean;
  setCartIsOpen: (isOpen: boolean) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      cartIsOpen: false,
      
      setCartIsOpen: (isOpen) => set({ cartIsOpen: isOpen }),
      
      addItem: (newItem) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find(
          (item) => item.id === newItem.id && item.size === newItem.size
        );

        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item.id === newItem.id && item.size === newItem.size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            cartIsOpen: true,
          });
        } else {
          set({ 
            cart: [...currentCart, { ...newItem, quantity: 1 }],
            cartIsOpen: true,
          });
        }
      },

      removeItem: (id, size) => set({
        cart: get().cart.filter((item) => !(item.id === id && item.size === size))
      }),

      updateQuantity: (id, size, quantity) => {
        const currentCart = get().cart;
        if (quantity <= 0) {
          set({
            cart: currentCart.filter((item) => !(item.id === id && item.size === size))
          });
        } else {
          set({
            cart: currentCart.map((item) =>
              item.id === id && item.size === size
                ? { ...item, quantity }
                : item
            ),
          });
        }
      },

      clearCart: () => set({ cart: [] }),

      totalItems: () => get().cart.reduce((acc, item) => acc + item.quantity, 0),
      
      totalPrice: () => get().cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    }),
    { name: 'sirius-cart-storage' } // Esto lo guarda en el navegador automáticamente
  )
);