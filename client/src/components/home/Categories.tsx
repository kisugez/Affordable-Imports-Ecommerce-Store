import { useQuery } from "@tanstack/react-query";
import CategoryCard from "@/components/products/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Category } from "@shared/schema";

const Categories = () => {
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-sans text-[#333333] mb-10 text-center">
          Shop by Category
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>Failed to load categories. Please try again later.</p>
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No categories found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
