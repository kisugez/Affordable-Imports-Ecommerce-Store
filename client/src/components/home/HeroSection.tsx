import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="h-[500px] flex items-center justify-center text-white relative">
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1555529771-7888783a18d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold font-sans mb-4">Quality Imported Products</h1>
        <p className="text-xl md:text-2xl mb-8">Discover our wide range of affordable imports</p>
        <Link href="/products">
          <Button className="bg-[#e21a22] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full">
            Shop Now
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
