import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import toast from 'react-hot-toast';
import { achievementsApi } from '../services/api';
import AchievementBadge from '../components/AchievementBadge';
import { ACHIEVEMENTS_DATA } from '@shared/utils/constants';
import type { AchievementType } from '@shared/types';

const Achievements = () => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const response = await achievementsApi.getAll();
      if (response.data.success) {
        setAchievements(response.data.data || []);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des succès');
    } finally {
      setLoading(false);
    }
  };

  const unlockedTypes = new Set(achievements.map(a => a.type));
  const allTypes = Object.keys(ACHIEVEMENTS_DATA) as AchievementType[];

  const unlockedCount = achievements.length;
  const totalCount = allTypes.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900"
        >
          Mes Succès 🏆
        </motion.h1>
        <p className="text-gray-600 mt-1">
          Débloquez tous les badges en restant constant dans vos habitudes
        </p>
      </div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Trophy className="text-yellow-600" size={32} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Progression des succès
              </h3>
              <p className="text-sm text-gray-600">
                {unlockedCount} sur {totalCount} débloqués
              </p>
            </div>
          </div>
          <div className="text-3xl font-bold text-primary-600">
            {Math.round((unlockedCount / totalCount) * 100)}%
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
          />
        </div>
      </motion.div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allTypes.map((type, index) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <AchievementBadge
              type={type}
              unlocked={unlockedTypes.has(type)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
