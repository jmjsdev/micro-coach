import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, glass = false, className = '', children, ...props }, ref) => {
    const baseClasses = 'rounded-xl p-6';
    const hoverClasses = hover ? 'card-hover cursor-pointer' : '';
    const glassClasses = glass ? 'glass shadow-lg' : 'bg-white shadow-md';

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
