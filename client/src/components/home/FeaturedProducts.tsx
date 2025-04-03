import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import ProductCarousel from "@/components/products/ProductCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@shared/schema";

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products?featured=true"],
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold font-sans text-[#333333]">Featured Products</h2>
          <Link href="/products">
            <a className="text-[#e21a22] hover:text-red-700 font-medium flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-60 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>Failed to load featured products. Please try again later.</p>
          </div>
        ) : products && products.length > 0 ? (
          <ProductCarousel products={products} />
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No featured products found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
