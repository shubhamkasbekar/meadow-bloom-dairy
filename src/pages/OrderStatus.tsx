import { useState, useEffect } from "react";
import { orders } from "../data/mockData";
import { Order, OrderStatus as OrderStatusType } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardCheck,
  Package,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

export default function OrderStatus() {
  const { user } = useAuth();
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  useEffect(() => {
    // In a real app, this would fetch the user's orders from the backend
    // For demo purposes, we'll create a mock order if none exist
    if (user) {
      if (orders.some((order) => order.userId === user.id)) {
        setUserOrders(orders.filter((order) => order.userId === user.id));
      } else {
        // Create a mock order for demo purposes
        const mockOrder: Order = {
          id: `order-${Date.now()}`,
          userId: user.id,
          items: [{ product: orders[0].items[0].product, quantity: 1 }],
          totalAmount: orders[0].items[0].product.price,
          status: "placed",
          createdAt: new Date().toISOString(),
        };

        setUserOrders([
          mockOrder,
          ...orders.filter((order) => order.status !== "placed"),
        ]);
      }
    }
  }, [user]);

  // Helper functions to determine the status display
  const getStatusIcon = (status: OrderStatusType) => {
    switch (status) {
      case "placed":
        return <ClipboardCheck className="h-6 w-6" />;
      case "processing":
        return <Package className="h-6 w-6" />;
      case "out-for-delivery":
        return <Truck className="h-6 w-6" />;
      case "delivered":
        return <CheckCircle className="h-6 w-6" />;
      default:
        return <Clock className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status: OrderStatusType) => {
    switch (status) {
      case "placed":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      case "out-for-delivery":
        return "bg-violet-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: OrderStatusType) => {
    switch (status) {
      case "placed":
        return "Order Placed";
      case "processing":
        return "Processing";
      case "out-for-delivery":
        return "Out for Delivery";
      case "delivered":
        return "Delivered";
      default:
        return "Unknown Status";
    }
  };

  const getProgressValue = (status: OrderStatusType) => {
    switch (status) {
      case "placed":
        return 25;
      case "processing":
        return 50;
      case "out-for-delivery":
        return 75;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Orders</h1>

        {userOrders.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {userOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Order #{order.id.substring(0, 8)}
                    </CardTitle>
                    <Badge
                      className={getStatusColor(order.status) + " text-white"}
                    >
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Progress tracker */}
                  <div className="mb-8">
                    <Progress
                      value={getProgressValue(order.status)}
                      className="h-2"
                    />
                    <div className="flex justify-between mt-2">
                      <div
                        className={`text-xs ${
                          order.status === "placed" ||
                          order.status === "processing" ||
                          order.status === "out-for-delivery" ||
                          order.status === "delivered"
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      >
                        Order Placed
                      </div>
                      <div
                        className={`text-xs ${
                          order.status === "processing" ||
                          order.status === "out-for-delivery" ||
                          order.status === "delivered"
                            ? "text-yellow-600"
                            : "text-gray-400"
                        }`}
                      >
                        Processing
                      </div>
                      <div
                        className={`text-xs ${
                          order.status === "out-for-delivery" ||
                          order.status === "delivered"
                            ? "text-violet-600"
                            : "text-gray-400"
                        }`}
                      >
                        Out for Delivery
                      </div>
                      <div
                        className={`text-xs ${
                          order.status === "delivered"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        Delivered
                      </div>
                    </div>
                  </div>

                  <h3 className="font-medium mb-4">Order Items</h3>

                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ₹{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center font-medium">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-6 flex justify-center">
              <Package className="h-20 w-20 text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
            <p className="text-gray-600 mb-6">
              You don't have any orders yet. Start shopping to place your first
              order!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
