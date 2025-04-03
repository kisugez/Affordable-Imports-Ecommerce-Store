import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
    }, 1000);
  };

  return (
    <section className="py-16 bg-[#e21a22] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-sans mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Stay updated with our latest products, exclusive offers, and promotions. 
          Subscribe to our newsletter today!
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
          <Input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 rounded-full focus:outline-none text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="bg-[#333333] hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
