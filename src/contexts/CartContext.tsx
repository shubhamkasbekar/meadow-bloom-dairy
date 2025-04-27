import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "../types";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import {
  getUserCart,
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart as clearFirestoreCart,
} from "../lib/cartService";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalAmount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load cart data
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        // If user is logged in, load from Firestore
        setIsLoading(true);
        try {
          const cartItems = await getUserCart(user.id);
          setItems(cartItems);
        } catch (error) {
          console.error("Error loading cart from Firestore:", error);
          toast.error("Failed to load your cart");
        } finally {
          setIsLoading(false);
        }
      } else {
        // If no user, try to load from localStorage
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart));
          } catch (error) {
            console.error("Failed to parse stored cart:", error);
          }
        }
      }
    };

    loadCart();
  }, [user]);

  // Save cart to localStorage when items change (for non-logged in users)
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, user]);

  const addToCart = async (product: Product, quantity: number) => {
    try {
      if (user) {
        // If user is logged in, save to Firestore
        setIsLoading(true);
        await addItemToCart(user.id, product, quantity);

        // Update local state
        const currentItems = [...items];
        const existingItem = currentItems.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          setItems(
            currentItems.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          );
        } else {
          setItems([...currentItems, { product, quantity }]);
        }

        toast.success(`Added ${product.name} to your cart`);
      } else {
        // If no user, use local state only
        setItems((prevItems) => {
          const existingItem = prevItems.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            toast.success(`Updated quantity of ${product.name} in your cart`);
            return prevItems.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            toast.success(`Added ${product.name} to your cart`);
            return [...prevItems, { product, quantity }];
          }
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      if (user) {
        setIsLoading(false);
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const product = items.find((item) => item.product.id === productId);

      if (user) {
        // If user is logged in, remove from Firestore
        setIsLoading(true);
        await removeItemFromCart(user.id, productId);

        // Update local state
        setItems((prevItems) =>
          prevItems.filter((item) => item.product.id !== productId)
        );
      } else {
        // If no user, use local state only
        setItems((prevItems) =>
          prevItems.filter((item) => item.product.id !== productId)
        );
      }

      if (product) {
        toast.info(`Removed ${product.product.name} from your cart`);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");
    } finally {
      if (user) {
        setIsLoading(false);
      }
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      if (user) {
        // If user is logged in, update in Firestore
        setIsLoading(true);
        await updateItemQuantity(user.id, productId, quantity);

        // Update local state
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        );
      } else {
        // If no user, use local state only
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update item quantity");
    } finally {
      if (user) {
        setIsLoading(false);
      }
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        // If user is logged in, clear Firestore cart
        setIsLoading(true);
        await clearFirestoreCart(user.id);
      }

      // Clear local state regardless
      setItems([]);
      toast.info("Cart has been cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    } finally {
      if (user) {
        setIsLoading(false);
      }
    }
  };

  // Calculate total items and amount
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        totalAmount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
