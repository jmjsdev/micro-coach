import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { habitsApi } from '../services/api';
import { useHabitStore } from '../store/habitStore';
import HabitCard from '../components/HabitCard';
import { Button } from '../components/ui';
import type { HabitCategory } from '@shared/types';
import { HABIT_CATEGORIES } from '@shared/utils/constants';

const Habits = () => {
  const navigate = useNavigate();
  const { habits, setHabits } = useHabitStore();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<HabitCategory | 'all'>('all');

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const response = await habitsApi.getAll();
      if (response.data.success) {
        setHabits(response.data.data || []);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des habitudes');
    } finally {
      setLoading(false);
    }
  };

  const filteredHabits = filter === 'all'
    ? habits
    : habits.filter(h => h.category === filter);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Habitudes</h1>
          <p className="text-gray-600 mt-1">
            Gérez et suivez toutes vos habitudes
          </p>
        </div>
        <Button onClick={() => navigate('/habits/new')}>
          <Plus size={20} className="mr-2" />
          Nouvelle habitude
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === 'all'
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Toutes ({habits.length})
        </button>
        {Object.entries(HABIT_CATEGORIES).map(([key, value]) => {
          const count = habits.filter(h => h.category === key).length;
          if (count === 0) return null;

          return (
            <button
              key={key}
              onClick={() => setFilter(key as HabitCategory)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                filter === key
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {value.icon} {value.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Habits List */}
      {filteredHabits.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-xl p-12 text-center"
        >
          <Filter className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {filter === 'all' ? 'Aucune habitude' : 'Aucune habitude dans cette catégorie'}
          </h3>
          <p className="text-gray-600 mb-6">
            Créez votre première habitude pour commencer !
          </p>
          <Button onClick={() => navigate('/habits/new')}>
            <Plus size={20} className="mr-2" />
            Créer une habitude
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onClick={() => navigate(`/habits/${habit.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Habits;
