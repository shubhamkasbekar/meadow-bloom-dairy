
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../data/mockData";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Products() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  useEffect(() => {
    let result = products;
    
    // Filter by category if selected
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-dairy-light-accent py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-dairy-primary">Our Products</h1>
        
        {/* Filters and Search */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Category filter (sidebar on desktop, top on mobile) */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-dairy-primary">Categories</h3>
            
            <RadioGroup 
              defaultValue={selectedCategory || "all"}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all">All Categories</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="milk" id="milk" />
                  <Label htmlFor="milk">Milk</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="shrikhand" id="shrikhand" />
                  <Label htmlFor="shrikhand">Shrikhand</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="drinks" id="drinks" />
                  <Label htmlFor="drinks">Drinks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="others" id="others" />
                  <Label htmlFor="others">Others</Label>
                </div>
              </div>
            </RadioGroup>
            
            <Separator className="my-6" />
            
            <h3 className="font-semibold text-lg mb-4 text-dairy-primary">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <>
                <p className="mb-4 text-gray-600">{filteredProducts.length} products found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white p-10 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2 text-dairy-primary">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
