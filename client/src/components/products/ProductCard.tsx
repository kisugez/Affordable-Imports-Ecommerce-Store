import { useState } from "react";
import { Link } from "wouter";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Rating from "@/components/ui/rating";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }, 1000);
  };

  return (
    <Card className="product-card bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/products/${product.slug}`}>
        <a className="block">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-60 object-cover"
            />
            {product.isNew && (
              <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">New</Badge>
            )}
            {product.isSale && (
              <Badge className="absolute top-2 right-2 bg-[#ffc107] hover:bg-amber-500 text-black">Sale</Badge>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-sans font-semibold text-xl mb-2">{product.name}</h3>
            <Rating 
              value={parseFloat(product.rating)} 
              count={product.reviewCount} 
              showCount 
              className="mb-2"
            />
            <div className="flex justify-between items-center">
              <div>
                {product.originalPrice && (
                  <span className="text-gray-500 line-through">
                    KSh {parseInt(product.originalPrice).toLocaleString()}
                  </span>
                )}
                <span className="text-[#e21a22] font-bold text-xl block">
                  KSh {parseInt(product.price).toLocaleString()}
                </span>
              </div>
              <Button
                className="bg-[#e21a22] hover:bg-red-700 text-white p-2 rounded-full h-10 w-10"
                onClick={handleAddToCart}
              >
                {isAddingToCart ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <ShoppingCart className="h-5 w-5" />
                )}
              </Button>
            </div>
          </CardContent>
        </a>
      </Link>
    </Card>
  );
};

export default ProductCard;
