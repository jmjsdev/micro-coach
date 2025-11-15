import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Trophy, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { habitsApi, checkInsApi, userApi } from '../services/api';
import { useHabitStore } from '../store/habitStore';
import { useAuthStore } from '../store/authStore';
import HabitCard from '../components/HabitCard';
import StatCard from '../components/StatCard';
import { Button } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { habits, setHabits } = useHabitStore();
  const [stats, setStats] = useState<any>(null);
  const [checkedToday, setCheckedToday] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [habitsRes, statsRes] = await Promise.all([
        habitsApi.getAll(),
        userApi.getStats(),
      ]);

      if (habitsRes.data.success) {
        setHabits(habitsRes.data.data || []);
      }

      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (habitId: string) => {
    try {
      if (checkedToday.has(habitId)) {
        toast.error('Habitude déjà validée aujourd\'hui');
        return;
      }

      await checkInsApi.create({
        habitId,
        date: format(new Date(), 'yyyy-MM-dd'),
        completed: true,
      });

      setCheckedToday(new Set(checkedToday).add(habitId));

      // Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      toast.success('🎉 Bravo ! Habitude validée !');

      // Reload stats
      loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erreur lors de la validation');
    }
  };

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
          Bonjour {user?.name} ! 👋
        </motion.h1>
        <p className="text-gray-600 mt-1">
          Continuez sur votre lancée, vous faites du super boulot !
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Target}
          label="Habitudes actives"
          value={stats?.totalHabits || 0}
          color="text-blue-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Check-ins cette semaine"
          value={stats?.thisWeekCheckIns || 0}
          color="text-green-600"
        />
        <StatCard
          icon={Trophy}
          label="Achievements"
          value={stats?.totalAchievements || 0}
          color="text-yellow-600"
        />
        <StatCard
          icon={Flame}
          label="Points totaux"
          value={stats?.totalPoints || 0}
          color="text-orange-600"
        />
      </div>

      {/* Today's Habits */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Aujourd'hui
          </h2>
          <Button onClick={() => navigate('/habits/new')}>
            + Nouvelle habitude
          </Button>
        </div>

        {habits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-xl p-12 text-center"
          >
            <Target className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucune habitude pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Créez votre première habitude pour commencer votre transformation !
            </p>
            <Button onClick={() => navigate('/habits/new')}>
              Créer ma première habitude
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onCheck={() => handleCheckIn(habit.id)}
                isCheckedToday={checkedToday.has(habit.id)}
                onClick={() => navigate(`/habits/${habit.id}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          💡 Conseil du jour
        </h3>
        <p className="text-gray-600">
          La constance bat la perfection. Même 5 minutes comptent !
          Ne brisez pas votre série.
        </p>
      </motion.div>
    </div>
  );
};

export default Dashboard;
