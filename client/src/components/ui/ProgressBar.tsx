import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProgressBar = ({
  value,
  max = 100,
  color = 'bg-primary-600',
  showLabel = true,
  size = 'md',
  className = '',
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Progression</span>
          <span className="text-sm font-semibold text-primary-600">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`${color} ${sizeClasses[size]} rounded-full`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
