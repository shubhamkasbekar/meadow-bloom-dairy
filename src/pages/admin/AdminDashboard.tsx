
import { useState } from "react";
import { Link } from "react-router-dom";
import { orders, products } from "../../data/mockData";
import { Order, OrderStatus, Product } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  Package, 
  ShoppingBag, 
  Edit, 
  Trash2, 
  Plus 
} from "lucide-react";

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [ordersList, setOrdersList] = useState<Order[]>(orders);
  const [productsList, setProductsList] = useState<Product[]>(products);
  
  // Protect admin route
  if (!user || !isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrdersList(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      )
    );
  };
  
  // Delete product
  const deleteProduct = (productId: string) => {
    setProductsList(prev => prev.filter(product => product.id !== productId));
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button asChild className="bg-dairy-accent hover:bg-dairy-brown">
            <Link to="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Link>
          </Button>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Products</CardTitle>
                <CardDescription>Manage your product inventory</CardDescription>
              </div>
              <div className="bg-dairy-green p-2 rounded-full">
                <Package className="h-6 w-6 text-dairy-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{productsList.length}</div>
              <p className="text-sm text-gray-500">Total products in catalog</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Orders</CardTitle>
                <CardDescription>Manage customer orders</CardDescription>
              </div>
              <div className="bg-dairy-peach p-2 rounded-full">
                <ShoppingBag className="h-6 w-6 text-dairy-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{ordersList.length}</div>
              <p className="text-sm text-gray-500">
                {ordersList.filter(order => order.status !== 'delivered').length} pending,{' '}
                {ordersList.filter(order => order.status === 'delivered').length} delivered
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Products Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage and update your product catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productsList.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <span>{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {product.inStock ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            In Stock
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            Out of Stock
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                          >
                            <Link to={`/admin/products/${product.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>View and manage customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersList.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id.substring(0, 8)}</TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Update Status <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "placed")}>
                              Order Placed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "processing")}>
                              Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "out-for-delivery")}>
                              Out for Delivery
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "delivered")}>
                              Delivered
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper component for order status badges
function StatusBadge({ status }: { status: OrderStatus }) {
  switch(status) {
    case "placed":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
          Order Placed
        </Badge>
      );
    case "processing":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          Processing
        </Badge>
      );
    case "out-for-delivery":
      return (
        <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
          Out for Delivery
        </Badge>
      );
    case "delivered":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          Delivered
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
          Unknown
        </Badge>
      );
  }
}
