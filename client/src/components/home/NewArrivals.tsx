import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@shared/schema";

const NewArrivals = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products?new=true"],
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-sans text-[#333333] mb-10">New Arrivals</h2>

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
            <p>Failed to load new arrivals. Please try again later.</p>
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No new arrivals found.</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/products?new=true">
            <Button className="bg-[#e21a22] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full">
              View All New Arrivals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
