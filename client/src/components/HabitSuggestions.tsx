import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Plus, Loader } from 'lucide-react';
import { aiApi, habitsApi } from '../services/api';
import { useHabitStore } from '../store/habitStore';
import toast from 'react-hot-toast';
import { Button, Input, Card, Modal } from './ui';

const HabitSuggestions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [goals, setGoals] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const addHabit = useHabitStore((state) => state.addHabit);

  const handleGetSuggestions = async () => {
    if (!goals.trim()) {
      toast.error('Veuillez décrire vos objectifs');
      return;
    }

    setLoading(true);
    try {
      const response = await aiApi.suggestHabits(goals);
      if (response.data.success && response.data.data) {
        setSuggestions(response.data.data.suggestions);
      }
    } catch (error) {
      toast.error('Erreur lors de la génération de suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHabit = async (suggestion: any) => {
    try {
      const response = await habitsApi.create({
        name: suggestion.name,
        description: suggestion.description,
        category: suggestion.category,
        frequency: suggestion.frequency,
        icon: suggestion.icon || '🎯',
        color: '#6366f1',
      });

      if (response.data.success && response.data.data) {
        addHabit(response.data.data);
        toast.success('Habitude créée avec succès !');
        setSuggestions(prev => prev.filter(s => s.name !== suggestion.name));
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erreur lors de la création');
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
      >
        <Lightbulb size={20} className="mr-2" />
        Suggestions IA
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Suggestions d'Habitudes par IA"
        size="lg"
      >
        <div className="space-y-6">
          {/* Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Décrivez vos objectifs
            </label>
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Ex: Je veux améliorer ma santé, être plus productif au travail, et réduire mon stress..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all"
              rows={4}
            />
          </div>

          <Button
            fullWidth
            onClick={handleGetSuggestions}
            isLoading={loading}
            disabled={!goals.trim()}
          >
            <Lightbulb size={20} className="mr-2" />
            Générer des suggestions
          </Button>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">
                Suggestions pour vous :
              </h3>
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">{suggestion.icon}</span>
                          <h4 className="font-semibold text-gray-900">
                            {suggestion.name}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {suggestion.description}
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                          <p className="text-xs text-blue-900">
                            <strong>Pourquoi ?</strong> {suggestion.why}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleCreateHabit(suggestion)}
                      >
                        <Plus size={16} className="mr-1" />
                        Créer
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default HabitSuggestions;
