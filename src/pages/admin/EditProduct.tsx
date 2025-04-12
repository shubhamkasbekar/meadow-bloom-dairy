
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Product } from "../../types";
import { products } from "../../data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
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
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

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
  
  useEffect(() => {
    if (!isNewProduct) {
      const existingProduct = products.find(p => p.id === id);
      if (existingProduct) {
        setProduct({
          ...existingProduct,
          expiryDate: new Date(existingProduct.expiryDate).toISOString().split("T")[0]
        });
      } else {
        navigate("/admin", { replace: true });
      }
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string) => {
    setProduct(prev => ({ ...prev, category: value as any }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setProduct(prev => ({ ...prev, inStock: checked }));
  };
  
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...product.ingredients];
    updatedIngredients[index] = value;
    setProduct(prev => ({ ...prev, ingredients: updatedIngredients }));
  };
  
  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...product.images];
    updatedImages[index] = value;
    setProduct(prev => ({ ...prev, images: updatedImages }));
  };
  
  const addIngredient = () => {
    setProduct(prev => ({ ...prev, ingredients: [...prev.ingredients, ""] }));
  };
  
  const removeIngredient = (index: number) => {
    const updatedIngredients = [...product.ingredients];
    updatedIngredients.splice(index, 1);
    setProduct(prev => ({ ...prev, ingredients: updatedIngredients }));
  };
  
  const addImage = () => {
    setProduct(prev => ({ ...prev, images: [...prev.images, ""] }));
  };
  
  const removeImage = (index: number) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);
    setProduct(prev => ({ ...prev, images: updatedImages }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (isNewProduct) {
        toast.success("Product created successfully!");
      } else {
        toast.success("Product updated successfully!");
      }
      setIsLoading(false);
      navigate("/admin");
    }, 1000);
  };

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
              <CardTitle>{isNewProduct ? "Product Details" : "Update Product"}</CardTitle>
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
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={product.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      defaultValue={product.category}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="milk">Milk</SelectItem>
                        <SelectItem value="shrikhand">Shrikhand</SelectItem>
                        <SelectItem value="drinks">Drinks</SelectItem>
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
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
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
                        onChange={(e) => handleImageChange(index, e.target.value)}
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
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Image+Error";
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
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : isNewProduct ? "Create Product" : "Update Product"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
