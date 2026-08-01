import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

import { useAuth } from "./AuthContext";

import {
  addToWishlist as addToWishlistApi,
  getWishlist,
  removeFromWishlist as removeFromWishlistApi,
} from "../api/WishlistApi";

export type WishlistItem = {
  wishlistId: number;

  productId: number;

  name: string;

  image: string;

  price: number;
};

type Product = {
  id: number;

  name: string;

  image: string;

  price: number;
};

type WishlistContextType = {
  wishlist: WishlistItem[];

  addToWishlist: (
    product: Product
  ) => Promise<void>;

  removeFromWishlist: (
    wishlistId: number
  ) => Promise<void>;

  isWishlisted: (
    productId: number
  ) => boolean;

  loadWishlist: () => Promise<void>;
};

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const {
    user,
    isLoading: authLoading,
  } = useAuth();

  const [
    wishlist,
    setWishlist,
  ] = useState<WishlistItem[]>(
    []
  );

  // Load wishlist from database
  async function loadWishlist() {
    // If user is not logged in
    if (!user) {
      setWishlist([]);
      return;
    }

    try {
      const data =
        await getWishlist(user.id);

      const formatted: WishlistItem[] =
        data.map((item: any) => ({
          wishlistId:
            item.id,

          productId:
            item.products.id,

          name:
            item.products.name,

          image:
            `/images/products/${item.products.image}`,

          price:
            item.products.price,
        }));

      setWishlist(
        formatted
      );
    } catch (error) {
      console.error(
        "Failed to load wishlist:",
        error
      );

      setWishlist([]);
    }
  }

  // Load wishlist only after authentication
  // has finished loading
  useEffect(() => {
    if (authLoading) {
      return;
    }

    loadWishlist();
  }, [
    user,
    authLoading,
  ]);

  // Add product to wishlist
  async function addToWishlist(
    product: Product
  ) {
    if (!user) {
      return;
    }

    try {
      await addToWishlistApi(
        user.id,
        product.id
      );

      await loadWishlist();
    } catch (error) {
      console.error(
        "Failed to add to wishlist:",
        error
      );
    }
  }

  // Remove product from wishlist
  async function removeFromWishlist(
    wishlistId: number
  ) {
    if (!user) {
      return;
    }

    try {
      await removeFromWishlistApi(
        wishlistId
      );

      await loadWishlist();
    } catch (error) {
      console.error(
        "Failed to remove from wishlist:",
        error
      );
    }
  }

  // Check whether product is in wishlist
  function isWishlisted(
    productId: number
  ) {
    return wishlist.some(
      (item) =>
        item.productId ===
        productId
    );
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context =
    useContext(
      WishlistContext
    );

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}