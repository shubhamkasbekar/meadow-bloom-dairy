import React, { createContext, useContext, useState, useEffect } from "react";
import { Order, OrderStatus } from "../types";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import {
  getUserOrders,
  createOrder,
  updateOrderStatus,
  getOrderById,
} from "../lib/orderService";

interface OrderContextType {
  orders: Order[];
  isLoading: boolean;
  placeOrder: () => Promise<string | null>;
  getOrder: (id: string) => Promise<Order | null>;
  updateStatus: (id: string, status: OrderStatus) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { items, totalAmount, clearCart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load user orders when user changes
  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const userOrders = await getUserOrders(user.id);
          setOrders(userOrders);
        } catch (error) {
          console.error("Error loading orders:", error);
          toast.error("Failed to load your orders");
        } finally {
          setIsLoading(false);
        }
      } else {
        setOrders([]);
      }
    };

    loadOrders();
  }, [user]);

  // Place a new order
  const placeOrder = async (): Promise<string | null> => {
    if (!user) {
      toast.error("You must be logged in to place an order");
      return null;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return null;
    }

    setIsLoading(true);

    try {
      // Create new order object
      const newOrder = {
        userId: user.id,
        items: [...items],
        totalAmount,
        status: "placed" as OrderStatus,
      };

      // Save to Firestore
      const orderId = await createOrder(newOrder);

      // Add to local state
      const createdOrder = {
        id: orderId,
        ...newOrder,
        createdAt: new Date().toISOString(),
      };

      setOrders((prev) => [createdOrder, ...prev]);

      // Clear the cart after successful order
      await clearCart();

      toast.success("Order placed successfully!");
      return orderId;
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a specific order
  const getOrder = async (id: string): Promise<Order | null> => {
    setIsLoading(true);

    try {
      const order = await getOrderById(id);
      return order;
    } catch (error) {
      console.error("Error getting order:", error);
      toast.error("Failed to load order details");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update order status
  const updateStatus = async (
    id: string,
    status: OrderStatus
  ): Promise<void> => {
    setIsLoading(true);

    try {
      await updateOrderStatus(id, status);

      // Update local state
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order))
      );

      toast.success(`Order status updated to ${status}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        isLoading,
        placeOrder,
        getOrder,
        updateStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
