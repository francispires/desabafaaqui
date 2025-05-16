import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  maxValue?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  maxValue = 5,
  size = 'md',
  interactive = false,
  onChange,
  className = '',
}) => {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const sizeMap = {
    sm: { size: 16, className: 'gap-0.5' },
    md: { size: 20, className: 'gap-1' },
    lg: { size: 24, className: 'gap-1.5' },
  };

  const { size: iconSize, className: gapClass } = sizeMap[size];

  const handleClick = (rating: number) => {
    if (interactive && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (interactive) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverValue(null);
    }
  };

  const renderStar = (rating: number) => {
    const filled = (hoverValue !== null ? rating <= hoverValue : rating <= value);
    
    const colors = filled
      ? {
          fill: getColorForRating(value),
          stroke: getColorForRating(value),
        }
      : {
          fill: 'none',
          stroke: '#D1D5DB', // gray-300
        };

    return (
      <Star
        key={rating}
        size={iconSize}
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth={2}
        className={`transition-colors ${interactive ? 'cursor-pointer' : ''}`}
        onClick={() => handleClick(rating)}
        onMouseEnter={() => handleMouseEnter(rating)}
        onMouseLeave={handleMouseLeave}
      />
    );
  };

  // Return color based on rating value
  const getColorForRating = (rating: number): string => {
    if (rating <= 2) return '#EF4444'; // Red for low ratings
    if (rating <= 3) return '#F59E0B'; // Amber for medium ratings
    return '#10B981'; // Green for high ratings
  };

  return (
    <div className={`flex items-center ${gapClass} ${className}`}>
      {Array.from({ length: maxValue }, (_, i) => renderStar(i + 1))}
    </div>
  );
};