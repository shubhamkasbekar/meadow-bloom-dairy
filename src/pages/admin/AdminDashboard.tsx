import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Order, OrderStatus, Product, ContactMessage } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  ChevronDown,
  Package,
  ShoppingBag,
  Edit,
  Trash2,
  Plus,
  LogOut,
  Search,
  Filter,
  Database,
  Loader2,
  MessageSquare,
} from "lucide-react";
import InitializeFirestoreButton from "../../components/admin/InitializeFirestoreButton";
import {
  getAllProducts,
  deleteProduct as deleteFirestoreProduct,
} from "../../lib/productService";
import {
  getAllOrders,
  updateOrderStatus as updateFirestoreOrderStatus,
} from "../../lib/orderService";
import { getAllContactMessages } from "../../lib/contactService";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, isAdmin, logout } = useAuth();
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      if (user && isAdmin()) {
        setIsLoading(true);
        try {
          // Fetch products
          const productsData = await getAllProducts();
          setProductsList(productsData);
          setFilteredProducts(
            filterProducts(productsData, searchTerm, categoryFilter)
          );

          // Fetch orders
          const ordersData = await getAllOrders();
          setOrdersList(ordersData);

          // Fetch contact messages
          const messagesData = await getAllContactMessages();
          setMessagesList(messagesData);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Failed to load data from Firestore");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [user, isAdmin]);

  // Apply filters when search term or category changes
  useEffect(() => {
    if (user && isAdmin()) {
      setFilteredProducts(
        filterProducts(productsList, searchTerm, categoryFilter)
      );
    }
  }, [searchTerm, categoryFilter, productsList, user, isAdmin]);

  // Protect admin route - IMPORTANT: Move this after all hooks are called
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

  // Count new messages
  const newMessagesCount = messagesList.filter(
    (message) => message.status === "new"
  ).length;

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Update order status
  const handleUpdateOrderStatus = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      // Update in Firestore
      await updateFirestoreOrderStatus(orderId, newStatus);

      // Update local state
      setOrdersList((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        // Delete from Firestore
        await deleteFirestoreProduct(productId);

        // Update local state
        const updatedProducts = productsList.filter(
          (product) => product.id !== productId
        );
        setProductsList(updatedProducts);
        setFilteredProducts(
          filterProducts(updatedProducts, searchTerm, categoryFilter)
        );

        toast.success("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Filter and search products
  const filterProducts = (
    products: Product[],
    term: string,
    category: string
  ) => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase());
      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
            <Button asChild className="bg-dairy-accent hover:bg-dairy-brown">
              <Link to="/admin/products/edit/new">
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Link>
            </Button>
          </div>
        </div>

        {/* Initialize Firestore */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Database Management</CardTitle>
              <CardDescription>
                Initialize and manage Firestore database
              </CardDescription>
            </div>
            <div className="bg-dairy-green p-2 rounded-full">
              <Database className="h-6 w-6 text-dairy-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              This will populate the Firestore database with mock data from the
              application. Use this only once when setting up the database.
            </p>
            <InitializeFirestoreButton />
          </CardContent>
        </Card>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                Total Products
              </CardTitle>
              <Package className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{productsList.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{ordersList.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                Contact Messages
              </CardTitle>
              <MessageSquare className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{messagesList.length}</div>
              {newMessagesCount > 0 && (
                <div className="mt-2">
                  <Badge className="bg-yellow-500">
                    {newMessagesCount} new{" "}
                    {newMessagesCount === 1 ? "message" : "messages"}
                  </Badge>
                </div>
              )}
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/admin/messages">View Messages</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Products Management</CardTitle>
            <CardDescription>Manage your product catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sm:w-48 flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="milk">Milk</SelectItem>
                    <SelectItem value="shrikhand">Shrikhand</SelectItem>
                    <SelectItem value="drinks">Drinks</SelectItem>
                    <SelectItem value="basundi">Basundi</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-center py-8 text-gray-500">
                {productsList.length === 0
                  ? "No products found. Add a product to get started."
                  : "No products match your search criteria."}
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {product.inStock ? (
                          <Badge className="bg-green-500">In Stock</Badge>
                        ) : (
                          <Badge className="bg-red-500">Out of Stock</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" asChild>
                            <Link to={`/admin/products/edit/${product.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Monitor and manage customer orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            {ordersList.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No orders found</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersList.slice(0, 5).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <span>Update Status</span>
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateOrderStatus(order.id, "placed")
                              }
                            >
                              Placed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateOrderStatus(order.id, "processing")
                              }
                            >
                              Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateOrderStatus(
                                  order.id,
                                  "out-for-delivery"
                                )
                              }
                            >
                              Out for Delivery
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateOrderStatus(order.id, "delivered")
                              }
                            >
                              Delivered
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  switch (status) {
    case "placed":
      return <Badge className="bg-blue-500">Placed</Badge>;
    case "processing":
      return <Badge className="bg-yellow-500">Processing</Badge>;
    case "out-for-delivery":
      return <Badge className="bg-orange-500">Out for Delivery</Badge>;
    case "delivered":
      return <Badge className="bg-green-500">Delivered</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}
