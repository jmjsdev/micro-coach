import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Calendar, Lightbulb, TrendingUp } from 'lucide-react';
import { aiApi } from '../services/api';
import toast from 'react-hot-toast';
import AIInsights from '../components/AIInsights';
import HabitSuggestions from '../components/HabitSuggestions';
import { Card } from '../components/ui';

const AIPage = () => {
  const [motivationalTip, setMotivationalTip] = useState('');
  const [weeklySummary, setWeeklySummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAIContent();
  }, []);

  const loadAIContent = async () => {
    try {
      const [tipRes, summaryRes] = await Promise.all([
        aiApi.getMotivationalTip(),
        aiApi.getWeeklySummary()
      ]);

      if (tipRes.data.success && tipRes.data.data) {
        setMotivationalTip(tipRes.data.data.tip);
      }

      if (summaryRes.data.success && summaryRes.data.data) {
        setWeeklySummary(summaryRes.data.data);
      }
    } catch (error) {
      console.error('Error loading AI content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 flex items-center space-x-3"
        >
          <Brain className="text-primary-600" size={36} />
          <span>Coach IA</span>
        </motion.h1>
        <p className="text-gray-600 mt-1">
          Votre assistant personnel propulsé par l'intelligence artificielle
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <HabitSuggestions />
      </div>

      {/* Motivational Tip */}
      {motivationalTip && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-primary-600 to-purple-600 text-white">
            <div className="flex items-start space-x-4">
              <Lightbulb size={32} className="flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">💡 Conseil du Jour</h3>
                <p className="text-white/90">{motivationalTip}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Weekly Summary */}
      {weeklySummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <div className="flex items-start space-x-4">
              <Calendar className="text-green-600 flex-shrink-0" size={32} />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  📊 Résumé de la Semaine
                </h3>
                <p className="text-gray-700 mb-4">{weeklySummary.summary}</p>

                {weeklySummary.stats && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">
                        {weeklySummary.stats.checkInsCount}
                      </div>
                      <div className="text-xs text-blue-900">Check-ins</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-600">
                        {weeklySummary.stats.completedHabits.length}
                      </div>
                      <div className="text-xs text-green-900">Habitudes complétées</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-orange-600">
                        {weeklySummary.stats.totalPoints}
                      </div>
                      <div className="text-xs text-orange-900">Points gagnés</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round((weeklySummary.stats.completedHabits.length / 7) * 100)}%
                      </div>
                      <div className="text-xs text-purple-900">Taux de réussite</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* AI Insights */}
      <AIInsights />
    </div>
  );
};

export default AIPage;
