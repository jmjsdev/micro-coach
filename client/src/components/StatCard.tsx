import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from './ui';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

const StatCard = ({ icon: Icon, label, value, trend, color = 'text-primary-600' }: StatCardProps) => {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={`flex items-center mt-1 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span className="ml-1">{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center`}
        >
          <Icon className={color} size={24} />
        </motion.div>
      </div>
    </Card>
  );
};

export default StatCard;
