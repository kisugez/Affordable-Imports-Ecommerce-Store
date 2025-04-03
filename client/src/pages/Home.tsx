import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import NewArrivals from "@/components/home/NewArrivals";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <Categories />
      <NewArrivals />
      <Features />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
