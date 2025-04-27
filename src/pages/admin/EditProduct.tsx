import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Product } from "../../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  getProductById,
  addProduct,
  updateProduct,
} from "../../lib/productService";

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const isNewProduct = id === "new";

  const [product, setProduct] = useState<Product>({
    id: isNewProduct ? `product-${Date.now()}` : id || "",
    name: "",
    description: "",
    price: 0,
    category: "milk",
    ingredients: [""],
    expiryDate: new Date().toISOString().split("T")[0],
    images: [""],
    inStock: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!isNewProduct);

  useEffect(() => {
    if (!isNewProduct && id) {
      const fetchProduct = async () => {
        setIsFetching(true);
        try {
          const productData = await getProductById(id);
          if (productData) {
            setProduct({
              ...productData,
              expiryDate: new Date(productData.expiryDate)
                .toISOString()
                .split("T")[0],
            });
          } else {
            toast.error("Product not found");
            navigate("/admin", { replace: true });
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error("Failed to load product");
          navigate("/admin", { replace: true });
        } finally {
          setIsFetching(false);
        }
      };

      fetchProduct();
    }
  }, [id, isNewProduct, navigate]);

  // Protect admin route
  if (!user || !isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You don't have permission to access this page.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSelectChange = (value: string) => {
    setProduct((prev) => ({
      ...prev,
      category: value as "milk" | "shrikhand" | "drinks" | "basundi" | "others",
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setProduct((prev) => ({ ...prev, inStock: checked }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...product.ingredients];
    updatedIngredients[index] = value;
    setProduct((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...product.images];
    updatedImages[index] = value;
    setProduct((prev) => ({ ...prev, images: updatedImages }));
  };

  const addIngredient = () => {
    setProduct((prev) => ({ ...prev, ingredients: [...prev.ingredients, ""] }));
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...product.ingredients];
    updatedIngredients.splice(index, 1);
    setProduct((prev) => ({ ...prev, ingredients: updatedIngredients }));
  };

  const addImage = () => {
    setProduct((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImage = (index: number) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);
    setProduct((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isNewProduct) {
        // Create new product
        const { id, ...productData } = product;
        await addProduct(productData);
        toast.success("Product created successfully!");
      } else {
        // Update existing product
        await updateProduct(product.id, product);
        toast.success("Product updated successfully!");
      }
      navigate("/admin");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(
        isNewProduct ? "Failed to create product" : "Failed to update product"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p>Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin")}
          className="mb-6 flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold mb-8">
          {isNewProduct ? "Add New Product" : "Edit Product"}
        </h1>

        <Card className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>
                {isNewProduct ? "Product Details" : "Update Product"}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Basic Details */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={product.price}
                      onChange={handleNumberChange}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={product.category}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="milk">Milk</SelectItem>
                        <SelectItem value="shrikhand">Shrikhand</SelectItem>
                        <SelectItem value="drinks">Drinks</SelectItem>
                        <SelectItem value="basundi">Basundi</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="date"
                      value={product.expiryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="inStock"
                    checked={product.inStock}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>
              </div>

              <Separator />

              {/* Ingredients */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Ingredients</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addIngredient}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Ingredient
                  </Button>
                </div>

                {product.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={ingredient}
                      onChange={(e) =>
                        handleIngredientChange(index, e.target.value)
                      }
                      placeholder={`Ingredient ${index + 1}`}
                      required
                    />
                    {product.ingredients.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredient(index)}
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Separator />

              {/* Images */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Product Images</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImage}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Image URL
                  </Button>
                </div>

                {product.images.map((image, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={image}
                        onChange={(e) =>
                          handleImageChange(index, e.target.value)
                        }
                        placeholder="Image URL"
                        required
                      />
                      {product.images.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeImage(index)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {image && (
                      <div className="h-20 w-20 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/150?text=Image+Error";
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-dairy-accent hover:bg-dairy-brown"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Saving...
                  </span>
                ) : isNewProduct ? (
                  "Create Product"
                ) : (
                  "Update Product"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
