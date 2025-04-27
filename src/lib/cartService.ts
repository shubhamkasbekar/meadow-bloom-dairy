import {
  db,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "./firebase";
import { CartItem, Product } from "../types";

// Get user's cart
export const getUserCart = async (userId: string): Promise<CartItem[]> => {
  try {
    const cartDocRef = doc(db, "carts", userId);
    const cartDoc = await getDoc(cartDocRef);

    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      return cartData.items || [];
    } else {
      // If user doesn't have a cart document yet, return empty array
      return [];
    }
  } catch (error) {
    console.error("Error getting user cart:", error);
    throw error;
  }
};

// Update the entire cart
export const updateCart = async (
  userId: string,
  items: CartItem[]
): Promise<void> => {
  try {
    const cartDocRef = doc(db, "carts", userId);

    await setDoc(
      cartDocRef,
      {
        userId,
        items,
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
};

// Add item to cart
export const addItemToCart = async (
  userId: string,
  product: Product,
  quantity: number
): Promise<void> => {
  try {
    // Get current cart
    const currentCart = await getUserCart(userId);

    // Check if product is already in cart
    const existingItemIndex = currentCart.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if product already in cart
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      currentCart.push({ product, quantity });
    }

    // Update the entire cart
    await updateCart(userId, currentCart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

// Remove item from cart
export const removeItemFromCart = async (
  userId: string,
  productId: string
): Promise<void> => {
  try {
    // Get current cart
    const currentCart = await getUserCart(userId);

    // Filter out the item to remove
    const updatedCart = currentCart.filter(
      (item) => item.product.id !== productId
    );

    // Update the entire cart
    await updateCart(userId, updatedCart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

// Update item quantity
export const updateItemQuantity = async (
  userId: string,
  productId: string,
  quantity: number
): Promise<void> => {
  try {
    // Get current cart
    const currentCart = await getUserCart(userId);

    if (quantity <= 0) {
      // If quantity is zero or negative, remove the item
      await removeItemFromCart(userId, productId);
      return;
    }

    // Find the item and update its quantity
    const updatedCart = currentCart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );

    // Update the entire cart
    await updateCart(userId, updatedCart);
  } catch (error) {
    console.error("Error updating item quantity:", error);
    throw error;
  }
};

// Clear cart
export const clearCart = async (userId: string): Promise<void> => {
  try {
    await updateCart(userId, []);
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};
