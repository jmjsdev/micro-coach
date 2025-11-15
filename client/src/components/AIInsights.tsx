import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { aiApi } from '../services/api';
import toast from 'react-hot-toast';
import { Card, Button } from './ui';

const AIInsights = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadAnalysis = async () => {
    setLoading(true);
    try {
      const response = await aiApi.analyzeHabits();
      if (response.data.success && response.data.data) {
        setAnalysis(response.data.data);
      }
    } catch (error) {
      toast.error('Erreur lors de l\'analyse');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalysis();
  }, []);

  if (loading) {
    return (
      <Card className="flex items-center justify-center py-12">
        <div className="text-center">
          <RefreshCw className="animate-spin text-primary-600 mx-auto mb-4" size={40} />
          <p className="text-gray-600">L'IA analyse vos habitudes...</p>
        </div>
      </Card>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="text-primary-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-900">Analyse IA</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadAnalysis}
          disabled={loading}
        >
          <RefreshCw size={16} className="mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Insights */}
      {analysis.insights && analysis.insights.length > 0 && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <Sparkles className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">💡 Insights</h3>
              <ul className="space-y-2">
                {analysis.insights.map((insight: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-700 flex items-start"
                  >
                    <span className="text-blue-600 mr-2">•</span>
                    {insight}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        {analysis.strengths && analysis.strengths.length > 0 && (
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-start space-x-3">
              <TrendingUp className="text-green-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">💪 Points Forts</h3>
                <ul className="space-y-2">
                  {analysis.strengths.map((strength: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-gray-700 text-sm flex items-start"
                    >
                      <span className="text-green-600 mr-2">✓</span>
                      {strength}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Areas to Improve */}
        {analysis.areasToImprove && analysis.areasToImprove.length > 0 && (
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <div className="flex items-start space-x-3">
              <Target className="text-orange-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🎯 À Améliorer</h3>
                <ul className="space-y-2">
                  {analysis.areasToImprove.map((area: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-gray-700 text-sm flex items-start"
                    >
                      <span className="text-orange-600 mr-2">→</span>
                      {area}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-purple-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">📋 Recommandations</h3>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-700 flex items-start"
                  >
                    <span className="text-purple-600 mr-2">→</span>
                    {rec}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIInsights;
