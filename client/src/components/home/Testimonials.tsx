import { useQuery } from "@tanstack/react-query";
import Rating from "@/components/ui/rating";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Testimonial } from "@shared/schema";

const Testimonials = () => {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-sans text-[#333333] mb-10 text-center">
          What Our Customers Say
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-[#f8f9fa] p-6 rounded-lg shadow border border-gray-200">
                <CardContent className="p-0 space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-24 w-full" />
                  <div className="flex items-center">
                    <Skeleton className="h-12 w-12 rounded-full mr-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>Failed to load testimonials. Please try again later.</p>
          </div>
        ) : testimonials && testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card 
                key={testimonial.id} 
                className="bg-[#f8f9fa] p-6 rounded-lg shadow border border-gray-200"
              >
                <CardContent className="p-0">
                  <Rating value={testimonial.rating} className="mb-4" />
                  <p className="text-gray-600 italic mb-4">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.customerName} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-medium">{testimonial.customerName}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No testimonials found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
