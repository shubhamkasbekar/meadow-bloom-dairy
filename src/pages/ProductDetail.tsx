import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/mockData";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ShoppingCart, Plus, Minus } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(products.find((p) => p.id === id));

  useEffect(() => {
    if (!product) {
      navigate("/products", { replace: true });
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const increaseQuantity = () => {
    setQuantity((q) => q + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Format expiry date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <Card>
              <CardContent className="p-6">
                <Carousel className="w-full">
                  <CarouselContent>
                    {product.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <AspectRatio ratio={4 / 3}>
                          <img
                            src={image}
                            alt={`${product.name} - image ${index + 1}`}
                            className="rounded-md object-cover w-full h-full"
                          />
                        </AspectRatio>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-2">
              <Badge variant="outline" className="bg-dairy-green">
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-dairy-accent mb-4">
              ₹{product.price.toFixed(2)}
            </p>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <Separator className="my-6" />

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-medium text-gray-900">Ingredients</h3>
                <ul className="list-disc list-inside text-gray-600 mt-1">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Expiry Date</h3>
                <p className="text-gray-600 mt-1">
                  {formatDate(product.expiryDate)}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Quantity Selector and Add to Cart */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                className="flex-1 bg-dairy-accent hover:bg-dairy-brown text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
