import { motion } from 'framer-motion';
import { Check, Target, TrendingUp } from 'lucide-react';
import { format, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Habit } from '@shared/types';
import { HABIT_CATEGORIES } from '@shared/utils/constants';
import { Card, Badge } from './ui';

interface HabitCardProps {
  habit: Habit;
  onCheck?: () => void;
  isCheckedToday?: boolean;
  streak?: number;
  onClick?: () => void;
}

const HabitCard = ({
  habit,
  onCheck,
  isCheckedToday = false,
  streak = 0,
  onClick,
}: HabitCardProps) => {
  const category = HABIT_CATEGORIES[habit.category as keyof typeof HABIT_CATEGORIES];

  return (
    <Card hover className="cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${habit.color}20` }}
          >
            {habit.icon}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900">{habit.name}</h3>
              <Badge variant="gray" size="sm">
                {category.icon} {category.label}
              </Badge>
            </div>

            {habit.description && (
              <p className="text-sm text-gray-600 mb-2">{habit.description}</p>
            )}

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              {streak > 0 && (
                <div className="flex items-center space-x-1">
                  <TrendingUp size={14} />
                  <span>{streak} jours</span>
                </div>
              )}
              {habit.goalDays && (
                <div className="flex items-center space-x-1">
                  <Target size={14} />
                  <span>Objectif: {habit.goalDays}j</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Check button */}
        {onCheck && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onCheck();
            }}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center
              transition-all duration-200
              ${
                isCheckedToday
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                  : 'border-2 border-gray-300 text-gray-400 hover:border-primary-500 hover:text-primary-500'
              }
            `}
          >
            {isCheckedToday && <Check size={20} />}
          </motion.button>
        )}
      </div>
    </Card>
  );
};

export default HabitCard;
