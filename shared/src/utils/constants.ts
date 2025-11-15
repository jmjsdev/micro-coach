export const HABIT_CATEGORIES = {
  health: { label: 'Santé', icon: '❤️', color: '#ef4444' },
  fitness: { label: 'Fitness', icon: '💪', color: '#f97316' },
  mental: { label: 'Mental', icon: '🧠', color: '#8b5cf6' },
  productivity: { label: 'Productivité', icon: '🚀', color: '#3b82f6' },
  social: { label: 'Social', icon: '👥', color: '#10b981' },
  other: { label: 'Autre', icon: '✨', color: '#6b7280' },
};

export const ACHIEVEMENTS_DATA = {
  first_habit: {
    name: 'Premier Pas',
    description: 'Créer votre première habitude',
    icon: '🎯',
    points: 10,
  },
  streak_7: {
    name: 'Une Semaine',
    description: '7 jours consécutifs',
    icon: '🔥',
    points: 50,
  },
  streak_30: {
    name: 'Un Mois',
    description: '30 jours consécutifs',
    icon: '⭐',
    points: 200,
  },
  streak_100: {
    name: 'Centenaire',
    description: '100 jours consécutifs',
    icon: '👑',
    points: 1000,
  },
  five_habits: {
    name: 'Multi-tâches',
    description: '5 habitudes actives simultanément',
    icon: '🎨',
    points: 100,
  },
  level_5: {
    name: 'Niveau 5',
    description: 'Atteindre le niveau 5',
    icon: '🏆',
    points: 250,
  },
  level_10: {
    name: 'Niveau 10',
    description: 'Atteindre le niveau 10',
    icon: '💎',
    points: 500,
  },
  perfect_week: {
    name: 'Semaine Parfaite',
    description: 'Toutes les habitudes validées pendant 7 jours',
    icon: '✨',
    points: 150,
  },
  perfect_month: {
    name: 'Mois Parfait',
    description: 'Toutes les habitudes validées pendant 30 jours',
    icon: '🌟',
    points: 750,
  },
};

export const POINTS_PER_CHECKIN = 10;
export const POINTS_PER_LEVEL = 100;
export const MAX_FREE_HABITS = 3;
