import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, ShoppingCart, Check, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Rating from "@/components/ui/rating";
import { useToast } from "@/hooks/use-toast";
import { Product, Category } from "@shared/schema";

const ProductDetail = () => {
  const [_, params] = useRoute("/products/:slug");
  const slug = params?.slug;
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();

  const { data: product, isLoading: isLoadingProduct } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
    enabled: !!slug,
  });

  const { data: category, isLoading: isLoadingCategory } = useQuery<Category>({
    queryKey: [`/api/categories/${product?.categoryId}`],
    enabled: !!product?.categoryId,
  });

  const { data: relatedProducts, isLoading: isLoadingRelated } = useQuery<Product[]>({
    queryKey: [`/api/products?category=${category?.slug}`],
    enabled: !!category?.slug,
  });

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < (product?.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    setIsAddingToCart(true);

    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false);
      toast({
        title: "Added to cart",
        description: `${quantity}x ${product.name} added to your cart`,
      });
    }, 1000);
  };

  if (isLoadingProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-48" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/products">
          <Button variant="ghost" className="text-gray-600">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg"
            />
            {product.isNew && (
              <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
                New
              </Badge>
            )}
            {product.isSale && (
              <Badge className="absolute top-4 right-4 bg-[#ffc107] hover:bg-amber-500 text-black">
                Sale
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <Rating 
                value={parseFloat(product.rating)} 
                count={product.reviewCount} 
                showCount 
              />
            </div>
            
            <div className="mb-4">
              {product.originalPrice && (
                <span className="text-gray-500 line-through text-lg block">
                  KSh {parseInt(product.originalPrice).toLocaleString()}
                </span>
              )}
              <span className="text-[#e21a22] font-bold text-3xl">
                KSh {parseInt(product.price).toLocaleString()}
              </span>
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="text-green-600 mr-2">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-green-600 font-medium">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              {category && (
                <div className="text-gray-600">
                  Category:{" "}
                  <Link href={`/category/${category.slug}`}>
                    <a className="text-[#e21a22] hover:underline">{category.name}</a>
                  </Link>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  className="h-10 px-3"
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  className="h-10 px-3"
                  onClick={handleIncrease}
                  disabled={quantity >= (product.stock || 10)}
                >
                  +
                </Button>
              </div>
              <Button
                className="bg-[#e21a22] hover:bg-red-700 text-white flex-1 h-10"
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock <= 0}
              >
                {isAddingToCart ? (
                  "Adding..."
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </>
                )}
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Truck className="h-5 w-5 mr-2" />
                <span>Free delivery on orders over KSh 10,000</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Shield className="h-5 w-5 mr-2" />
                <span>1 year warranty on all products</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <Tabs defaultValue="description">
          <TabsList className="mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <div className="prose max-w-none">
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-700 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                auctor, nisl eget ultricies tincidunt, nisl nisl aliquam
                nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl
                eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies
                nisl nisl eget nisl.
              </p>
              <ul className="mt-4">
                <li>High-quality materials</li>
                <li>Durable and long-lasting</li>
                <li>Easy to use and maintain</li>
                <li>Modern design that fits any style</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-6">
              {product.reviewCount > 0 ? (
                <>
                  <div className="flex items-center mb-4">
                    <div className="text-4xl font-bold mr-4">{product.rating}</div>
                    <div>
                      <Rating value={parseFloat(product.rating)} className="mb-1" />
                      <div className="text-sm text-gray-600">
                        Based on {product.reviewCount} reviews
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {/* Sample reviews - would be replaced with actual data */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">John Doe</div>
                          <div className="text-gray-500 text-sm">1 month ago</div>
                        </div>
                        <Rating value={5} className="mb-2" />
                        <p className="text-gray-700">
                          Great product! Exactly as described and arrived quickly.
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">Jane Smith</div>
                          <div className="text-gray-500 text-sm">2 weeks ago</div>
                        </div>
                        <Rating value={4} className="mb-2" />
                        <p className="text-gray-700">
                          Good quality for the price. Would recommend.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="shipping">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
              <p className="text-gray-700">
                We ship to all major cities in Kenya. Standard delivery takes 2-5 business days.
              </p>
              <ul className="mt-4">
                <li>Nairobi: 1-2 business days</li>
                <li>Mombasa: 2-3 business days</li>
                <li>Kisumu: 2-3 business days</li>
                <li>Other cities: 3-5 business days</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-4">Return Policy</h3>
              <p className="text-gray-700">
                We accept returns within 14 days of delivery. Items must be unused and in their original packaging.
              </p>
              <p className="text-gray-700 mt-2">
                To initiate a return, please contact our customer service team.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {!isLoadingRelated && relatedProducts && relatedProducts.length > 1 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <div key={relatedProduct.id}>
                  <Link href={`/products/${relatedProduct.slug}`}>
                    <a>
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-medium">{relatedProduct.name}</h3>
                      <div className="text-[#e21a22] font-bold">
                        KSh {parseInt(relatedProduct.price).toLocaleString()}
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
