import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '@shared/utils/constants';
import type { AchievementType } from '@shared/types';

interface AchievementBadgeProps {
  type: AchievementType;
  unlocked: boolean;
  onClick?: () => void;
}

const AchievementBadge = ({ type, unlocked, onClick }: AchievementBadgeProps) => {
  const achievement = ACHIEVEMENTS_DATA[type];

  if (!achievement) return null;

  return (
    <motion.div
      whileHover={{ scale: unlocked ? 1.05 : 1 }}
      whileTap={{ scale: unlocked ? 0.95 : 1 }}
      onClick={unlocked ? onClick : undefined}
      className={`
        relative p-4 rounded-xl border-2 text-center
        ${
          unlocked
            ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 cursor-pointer'
            : 'bg-gray-50 border-gray-200 opacity-50'
        }
      `}
    >
      {/* Badge Icon */}
      <div
        className={`
        w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center text-3xl
        ${unlocked ? 'bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg' : 'bg-gray-300'}
      `}
      >
        {unlocked ? achievement.icon : '🔒'}
      </div>

      {/* Badge Info */}
      <h4 className={`font-semibold mb-1 ${unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
        {achievement.name}
      </h4>
      <p className={`text-xs ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
        {achievement.description}
      </p>

      {unlocked && (
        <div className="mt-2 inline-flex items-center space-x-1 text-xs font-medium text-orange-600">
          <Trophy size={12} />
          <span>+{achievement.points} pts</span>
        </div>
      )}
    </motion.div>
  );
};

export default AchievementBadge;
