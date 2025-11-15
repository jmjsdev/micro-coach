import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { CreateHabitSchema, type CreateHabit } from '@shared/types';
import { habitsApi } from '../services/api';
import { useHabitStore } from '../store/habitStore';
import { Button, Input, Card } from '../components/ui';
import { HABIT_CATEGORIES } from '@shared/utils/constants';

const HABIT_ICONS = ['🎯', '💪', '📚', '🧘', '🏃', '🎨', '💧', '🥗', '😴', '🎵'];
const HABIT_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f97316',
  '#10b981', '#3b82f6', '#f59e0b', '#14b8a6'
];

const NewHabit = () => {
  const navigate = useNavigate();
  const addHabit = useHabitStore((state) => state.addHabit);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('🎯');
  const [selectedColor, setSelectedColor] = useState('#6366f1');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateHabit>({
    resolver: zodResolver(CreateHabitSchema),
    defaultValues: {
      frequency: 'daily',
      icon: '🎯',
      color: '#6366f1',
    },
  });

  const frequency = watch('frequency');

  const onSubmit = async (data: CreateHabit) => {
    setIsLoading(true);
    try {
      const response = await habitsApi.create({
        ...data,
        icon: selectedIcon,
        color: selectedColor,
      });

      if (response.data.success && response.data.data) {
        addHabit(response.data.data);
        toast.success('🎉 Habitude créée avec succès !');
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erreur lors de la création');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle Habitude</h1>
          <p className="text-gray-600 mt-1">Créez une nouvelle habitude à suivre</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div>
            <Input
              label="Nom de l'habitude"
              placeholder="Ex: Méditation quotidienne"
              error={errors.name?.message}
              {...register('name')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optionnel)
            </label>
            <textarea
              placeholder="Décrivez votre habitude..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all"
              rows={3}
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(HABIT_CATEGORIES).map(([key, value]) => (
                <label
                  key={key}
                  className="cursor-pointer"
                >
                  <input
                    type="radio"
                    value={key}
                    className="sr-only peer"
                    {...register('category')}
                  />
                  <div className="p-3 rounded-lg border-2 border-gray-200 peer-checked:border-primary-600 peer-checked:bg-primary-50 hover:border-gray-300 transition-all">
                    <div className="text-2xl mb-1">{value.icon}</div>
                    <div className="text-sm font-medium">{value.label}</div>
                  </div>
                </label>
              ))}
            </div>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fréquence
            </label>
            <div className="grid grid-cols-3 gap-2">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="daily"
                  className="sr-only peer"
                  {...register('frequency')}
                />
                <div className="p-3 rounded-lg border-2 border-gray-200 peer-checked:border-primary-600 peer-checked:bg-primary-50 text-center hover:border-gray-300 transition-all">
                  <div className="font-medium">Quotidien</div>
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="weekly"
                  className="sr-only peer"
                  {...register('frequency')}
                />
                <div className="p-3 rounded-lg border-2 border-gray-200 peer-checked:border-primary-600 peer-checked:bg-primary-50 text-center hover:border-gray-300 transition-all">
                  <div className="font-medium">Hebdomadaire</div>
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="custom"
                  className="sr-only peer"
                  {...register('frequency')}
                />
                <div className="p-3 rounded-lg border-2 border-gray-200 peer-checked:border-primary-600 peer-checked:bg-primary-50 text-center hover:border-gray-300 transition-all">
                  <div className="font-medium">Personnalisé</div>
                </div>
              </label>
            </div>
          </div>

          {frequency === 'weekly' || frequency === 'custom' ? (
            <div>
              <Input
                label="Jours par semaine"
                type="number"
                min="1"
                max="7"
                defaultValue="3"
                error={errors.frequencyDetails?.daysPerWeek?.message}
                {...register('frequencyDetails.daysPerWeek', { valueAsNumber: true })}
              />
            </div>
          ) : null}

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icône
            </label>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {HABIT_ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setSelectedIcon(icon)}
                  className={`
                    p-3 text-2xl rounded-lg border-2 transition-all
                    ${selectedIcon === icon
                      ? 'border-primary-600 bg-primary-50 scale-110'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur
            </label>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {HABIT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`
                    w-full aspect-square rounded-lg transition-all
                    ${selectedColor === color
                      ? 'ring-4 ring-offset-2 ring-gray-400 scale-110'
                      : 'hover:scale-105'
                    }
                  `}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Goal Days */}
          <div>
            <Input
              label="Objectif (jours) - Optionnel"
              type="number"
              min="1"
              placeholder="Ex: 30"
              error={errors.goalDays?.message}
              {...register('goalDays', { valueAsNumber: true })}
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="flex-1"
            >
              Créer l'habitude
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewHabit;
