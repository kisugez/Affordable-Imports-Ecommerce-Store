import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const gradientClasses = category.gradientFrom && category.gradientTo 
    ? `bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo}`
    : "bg-gradient-to-r from-[#e21a22] to-red-700";

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      <Link href={`/category/${category.slug}`}>
        <a className="block">
          <div className="h-48 overflow-hidden">
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
          <div className={`p-4 ${gradientClasses} text-white`}>
            <h3 className="font-sans font-semibold text-xl">{category.name}</h3>
            <p className="mt-2 flex justify-between items-center">
              <span>View Products</span>
              <ArrowRight size={16} />
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CategoryCard;
