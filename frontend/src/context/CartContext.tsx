import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

import { useAuth } from "./AuthContext";

import {
  addToCart as addToCartApi,
  getCart,
  removeFromCart as removeFromCartApi,
  updateQuantity,
} from "../api/CartApi";

export type CartItem = {
  cartId: number;
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type CartContextType = {
  cart: CartItem[];

  loadCart: () => Promise<void>;

  addToCart: (
    product: Product
  ) => Promise<void>;

  removeFromCart: (
    cartId: number
  ) => Promise<void>;

  increaseQuantity: (
    cartId: number
  ) => Promise<void>;

  decreaseQuantity: (
    cartId: number
  ) => Promise<void>;

  clearCart: () => void;
};

const CartContext = createContext<
  CartContextType | undefined
>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const {
    user,
    isLoading: authLoading,
  } = useAuth();

  const [cart, setCart] = useState<
    CartItem[]
  >([]);

  // Load cart from database
  async function loadCart() {
    // If user is not logged in
    if (!user) {
      setCart([]);
      return;
    }

    try {
      const data = await getCart(user.id);

      const formatted: CartItem[] =
        data.map((item: any) => ({
          cartId: item.id,

          productId:
            item.products.id,

          name:
            item.products.name,

          image:
            `/images/products/${item.products.image}`,

          price:
            item.products.price,

          quantity:
            item.quantity,
        }));

      setCart(formatted);
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      setCart([]);
    }
  }

  // Load cart only after authentication
  // has finished loading
  useEffect(() => {
    if (authLoading) {
      return;
    }

    loadCart();
  }, [
    user,
    authLoading,
  ]);

  // Add product to cart
  async function addToCart(
    product: Product
  ) {
    if (!user) {
      return;
    }

    try {
      await addToCartApi(
        user.id,
        product.id,
        1
      );

      await loadCart();
    } catch (error) {
      console.error(
        "Failed to add to cart:",
        error
      );
    }
  }

  // Remove product from cart
  async function removeFromCart(
    cartId: number
  ) {
    if (!user) {
      return;
    }

    try {
      await removeFromCartApi(
        cartId
      );

      await loadCart();
    } catch (error) {
      console.error(
        "Failed to remove from cart:",
        error
      );
    }
  }

  // Increase quantity
  async function increaseQuantity(
    cartId: number
  ) {
    const item = cart.find(
      (item) =>
        item.cartId === cartId
    );

    if (!item) {
      return;
    }

    try {
      await updateQuantity(
        cartId,
        item.quantity + 1
      );

      await loadCart();
    } catch (error) {
      console.error(
        "Failed to increase quantity:",
        error
      );
    }
  }

  // Decrease quantity
  async function decreaseQuantity(
    cartId: number
  ) {
    const item = cart.find(
      (item) =>
        item.cartId === cartId
    );

    if (!item) {
      return;
    }

    try {
      await updateQuantity(
        cartId,
        item.quantity - 1
      );

      await loadCart();
    } catch (error) {
      console.error(
        "Failed to decrease quantity:",
        error
      );
    }
  }

  // Clear cart after successful order
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loadCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}