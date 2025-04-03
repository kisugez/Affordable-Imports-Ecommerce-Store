import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Product, Category } from "@shared/schema";
import ProductCard from "@/components/products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductsPage = () => {
  const [location] = useLocation();
  const [searchParams, setSearchParams] = useState<URLSearchParams>();
  const [sortBy, setSortBy] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: "", max: "" });
  const [filterCategories, setFilterCategories] = useState<number[]>([]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showSaleOnly, setShowSaleOnly] = useState(false);

  // Parse URL search params once on component mount
  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, [location]);

  // Extract search query from URL if present
  const searchQuery = searchParams?.get("search") || "";
  const newParam = searchParams?.get("new") === "true";
  const saleParam = searchParams?.get("sale") === "true";
  const categoryParam = searchParams?.get("category") || "";

  // Set filter states based on URL params
  useEffect(() => {
    if (newParam) setShowNewOnly(true);
    if (saleParam) setShowSaleOnly(true);
  }, [newParam, saleParam]);

  // Fetch all products
  const { data: products, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: [
      `/api/products${searchQuery ? `?search=${searchQuery}` : ""}${
        newParam ? "?new=true" : ""
      }${saleParam ? "?sale=true" : ""}${
        categoryParam ? `?category=${categoryParam}` : ""
      }`,
    ],
  });

  // Fetch all categories for filtering
  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Filter and sort products
  const filteredProducts = products
    ? products
        .filter((product) => {
          // Category filter
          if (filterCategories.length > 0 && !filterCategories.includes(product.categoryId || 0)) {
            return false;
          }
          
          // New filter
          if (showNewOnly && !product.isNew) {
            return false;
          }
          
          // Sale filter
          if (showSaleOnly && !product.isSale) {
            return false;
          }
          
          // Price range filter
          const price = parseFloat(product.price);
          if (priceRange.min && price < parseFloat(priceRange.min)) {
            return false;
          }
          if (priceRange.max && price > parseFloat(priceRange.max)) {
            return false;
          }
          
          return true;
        })
        .sort((a, b) => {
          switch (sortBy) {
            case "price-low":
              return parseFloat(a.price) - parseFloat(b.price);
            case "price-high":
              return parseFloat(b.price) - parseFloat(a.price);
            case "name-asc":
              return a.name.localeCompare(b.name);
            case "name-desc":
              return b.name.localeCompare(a.name);
            case "newest":
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default:
              return b.featured ? 1 : -1;
          }
        })
    : [];

  // Handle category filter change
  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      setFilterCategories([...filterCategories, categoryId]);
    } else {
      setFilterCategories(filterCategories.filter((id) => id !== categoryId));
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilterCategories([]);
    setShowNewOnly(false);
    setShowSaleOnly(false);
    setPriceRange({ min: "", max: "" });
    setSortBy("featured");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with filters */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Categories</h3>
            {isLoadingCategories ? (
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {categories?.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filterCategories.includes(category.id)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category.id, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm font-medium"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator className="my-4" />

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                className="w-1/2"
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
                className="w-1/2"
              />
            </div>
          </div>

          <Separator className="my-4" />

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Product Status</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Checkbox
                  id="new-only"
                  checked={showNewOnly}
                  onCheckedChange={(checked) => setShowNewOnly(checked === true)}
                />
                <Label htmlFor="new-only" className="ml-2 text-sm font-medium">
                  New Arrivals
                </Label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="sale-only"
                  checked={showSaleOnly}
                  onCheckedChange={(checked) => setShowSaleOnly(checked === true)}
                />
                <Label htmlFor="sale-only" className="ml-2 text-sm font-medium">
                  On Sale
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {searchQuery
                  ? `Search results for: "${searchQuery}"`
                  : categoryParam
                  ? `Category: ${categoryParam}`
                  : "All Products"}
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <div className="mt-4 sm:mt-0 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
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
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
