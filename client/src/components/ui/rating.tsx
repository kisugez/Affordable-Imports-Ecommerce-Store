import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number;
  count?: number;
  showCount?: boolean;
  className?: string;
}

const Rating = ({ value, count = 0, showCount = false, className = "" }: RatingProps) => {
  // Normalize value between 0 and 5
  const normalizedValue = Math.max(0, Math.min(5, value));
  
  // Create an array of 5 elements to represent stars
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    
    if (normalizedValue >= starValue) {
      // Full star
      return <Star key={i} className="fill-yellow-400 text-yellow-400" size={16} />;
    } else if (normalizedValue >= starValue - 0.5) {
      // Half star
      return <StarHalf key={i} className="fill-yellow-400 text-yellow-400" size={16} />;
    } else {
      // Empty star
      return <Star key={i} className="text-yellow-400" size={16} />;
    }
  });
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex">{stars}</div>
      {showCount && <span className="text-gray-500 ml-2 text-sm">({count} reviews)</span>}
    </div>
  );
};

export default Rating;
