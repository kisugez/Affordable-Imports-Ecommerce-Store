import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [location, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMobile();
  const { toast } = useToast();

  // Cart state from local storage
  const cartCount = 0; // This would be replaced with actual cart implementation

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      toast({
        title: "Searching for products",
        description: `Showing results for: ${searchQuery}`,
      });
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <h1 className="text-[#e21a22] text-2xl md:text-3xl font-bold font-sans">
                  Affordable<span className="text-[#333333]">Imports</span>
                  <span className="text-[#ffc107]">KE</span>
                </h1>
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <a className={`text-[#333333] hover:text-[#e21a22] font-medium transition duration-200 ${location === "/" ? "text-[#e21a22]" : ""}`}>
                Home
              </a>
            </Link>
            <Link href="/products">
              <a className={`text-[#333333] hover:text-[#e21a22] font-medium transition duration-200 ${location === "/products" ? "text-[#e21a22]" : ""}`}>
                Products
              </a>
            </Link>
            <Link href="/about">
              <a className={`text-[#333333] hover:text-[#e21a22] font-medium transition duration-200 ${location === "/about" ? "text-[#e21a22]" : ""}`}>
                About Us
              </a>
            </Link>
            <Link href="/contact">
              <a className={`text-[#333333] hover:text-[#e21a22] font-medium transition duration-200 ${location === "/contact" ? "text-[#e21a22]" : ""}`}>
                Contact
              </a>
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e21a22] focus:border-transparent pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    type="submit"
                    variant="ghost" 
                    className="absolute right-0 top-0 h-full px-3 text-gray-500"
                  >
                    <Search size={18} />
                  </Button>
                </div>
              </form>
            </div>
            <Link href="/cart">
              <a className="text-[#333333] hover:text-[#e21a22] transition duration-200 relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#e21a22] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </a>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden text-[#333333]"
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-4 space-y-1">
              <Link href="/">
                <a className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:bg-gray-100">
                  Home
                </a>
              </Link>
              <Link href="/products">
                <a className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:bg-gray-100">
                  Products
                </a>
              </Link>
              <Link href="/about">
                <a className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:bg-gray-100">
                  About Us
                </a>
              </Link>
              <Link href="/contact">
                <a className="block px-3 py-2 rounded-md text-base font-medium text-[#333333] hover:bg-gray-100">
                  Contact
                </a>
              </Link>
              <form onSubmit={handleSearch} className="mt-3 px-3">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e21a22] focus:border-transparent pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button 
                    type="submit"
                    variant="ghost" 
                    className="absolute right-0 top-0 h-full px-3 text-gray-500"
                  >
                    <Search size={18} />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
