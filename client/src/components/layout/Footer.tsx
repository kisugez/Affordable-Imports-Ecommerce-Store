import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-sans font-semibold mb-4">
              Affordable<span className="text-[#ffc107]">Imports</span>KE
            </h3>
            <p className="mb-4">
              Your trusted source for quality imported products at affordable prices in Kenya.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ffc107]">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ffc107]">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ffc107]">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ffc107]">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-sans font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="hover:text-[#ffc107] transition duration-200">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="hover:text-[#ffc107] transition duration-200">Products</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="hover:text-[#ffc107] transition duration-200">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-[#ffc107] transition duration-200">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="hover:text-[#ffc107] transition duration-200">FAQs</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-sans font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/electronics">
                  <a className="hover:text-[#ffc107] transition duration-200">Electronics</a>
                </Link>
              </li>
              <li>
                <Link href="/category/home-kitchen">
                  <a className="hover:text-[#ffc107] transition duration-200">Home & Kitchen</a>
                </Link>
              </li>
              <li>
                <Link href="/category/fashion">
                  <a className="hover:text-[#ffc107] transition duration-200">Fashion</a>
                </Link>
              </li>
              <li>
                <Link href="/category/beauty-personal-care">
                  <a className="hover:text-[#ffc107] transition duration-200">Beauty & Personal Care</a>
                </Link>
              </li>
              <li>
                <Link href="/category/toys-games">
                  <a className="hover:text-[#ffc107] transition duration-200">Toys & Games</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-sans font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3" />
                <span>123 Moi Avenue, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                <span>+254 712 345 678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <span>info@affordableimportske.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3" />
                <span>Mon-Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} AffordableImportsKE. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-2">
                <div className="h-8 w-12 bg-gray-600 rounded"></div>
                <div className="h-8 w-12 bg-gray-600 rounded"></div>
                <div className="h-8 w-12 bg-gray-600 rounded"></div>
                <div className="h-8 w-12 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
