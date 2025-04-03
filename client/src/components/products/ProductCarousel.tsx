import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";
import ProductCard from "./ProductCard";
import { useMobile } from "@/hooks/use-mobile";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  
  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    if (isMobile) return 1;
    // Access window width directly for more specific breakpoints
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return 4;
  };
  
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  
  // Update items per view on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate max position based on number of items and items per view
  const maxPosition = Math.max(0, products.length - itemsPerView);
  
  const goToNext = () => {
    setCurrentPosition(prev => Math.min(prev + 1, maxPosition));
  };
  
  const goToPrev = () => {
    setCurrentPosition(prev => Math.max(prev - 1, 0));
  };
  
  return (
    <div className="relative" id="carousel">
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentPosition * (100 / itemsPerView)}%)` }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`carousel-item w-full${
                itemsPerView === 1 ? '' : 
                itemsPerView === 2 ? ' sm:w-1/2' : 
                itemsPerView === 3 ? ' sm:w-1/2 md:w-1/3' : 
                ' sm:w-1/2 md:w-1/3 lg:w-1/4'
              } p-4`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      
      {products.length > itemsPerView && (
        <>
          <Button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md text-[#e21a22] hover:text-red-700 hidden md:flex"
            onClick={goToPrev}
            disabled={currentPosition === 0}
            variant="ghost"
            size="icon"
          >
            <ChevronLeft />
          </Button>
          <Button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md text-[#e21a22] hover:text-red-700 hidden md:flex"
            onClick={goToNext}
            disabled={currentPosition >= maxPosition}
            variant="ghost"
            size="icon"
          >
            <ChevronRight />
          </Button>
        </>
      )}
    </div>
  );
};

export default ProductCarousel;
