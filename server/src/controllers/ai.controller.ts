import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { openaiService } from '../services/openai.service';

const prisma = new PrismaClient();

export class AIController {
  /**
   * Obtenir un conseil motivationnel
   */
  async getMotivationalTip(req: AuthRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId! },
        include: {
          habits: {
            where: { isActive: true }
          }
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }

      const tip = await openaiService.generateMotivationalTip(user.name, user.habits);

      res.json({
        success: true,
        data: { tip }
      });
    } catch (error) {
      console.error('Error generating tip:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la génération du conseil'
      });
    }
  }

  /**
   * Analyser les habitudes
   */
  async analyzeHabits(req: AuthRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId! },
        include: {
          habits: {
            where: { isActive: true }
          },
          checkIns: {
            where: {
              completed: true,
              date: {
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
              }
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }

      const analysis = await openaiService.analyzeHabits(user.habits, user.checkIns);

      res.json({
        success: true,
        data: analysis
      });
    } catch (error) {
      console.error('Error analyzing habits:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de l\'analyse'
      });
    }
  }

  /**
   * Suggérer de nouvelles habitudes
   */
  async suggestHabits(req: AuthRequest, res: Response) {
    try {
      const { goals } = req.body;

      if (!goals) {
        return res.status(400).json({
          success: false,
          error: 'Veuillez fournir vos objectifs'
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: req.userId! },
        include: {
          habits: {
            where: { isActive: true }
          }
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }

      const existingHabits = user.habits.map(h => h.name);
      const suggestions = await openaiService.suggestHabits(goals, existingHabits);

      res.json({
        success: true,
        data: { suggestions }
      });
    } catch (error) {
      console.error('Error suggesting habits:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la génération de suggestions'
      });
    }
  }

  /**
   * Analyser le sentiment d'une note
   */
  async analyzeSentiment(req: AuthRequest, res: Response) {
    try {
      const { note } = req.body;

      if (!note) {
        return res.status(400).json({
          success: false,
          error: 'Veuillez fournir une note'
        });
      }

      const sentiment = await openaiService.analyzeSentiment(note);

      res.json({
        success: true,
        data: sentiment
      });
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de l\'analyse'
      });
    }
  }

  /**
   * Chatbot
   */
  async chat(req: AuthRequest, res: Response) {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({
          success: false,
          error: 'Messages invalides'
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: req.userId! },
        include: {
          _count: {
            select: { habits: true }
          }
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }

      const userContext = {
        userName: user.name,
        level: user.level,
        habitCount: user._count.habits,
        totalPoints: user.totalPoints
      };

      const response = await openaiService.chat(messages, userContext);

      res.json({
        success: true,
        data: { message: response }
      });
    } catch (error) {
      console.error('Error in chat:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la conversation'
      });
    }
  }

  /**
   * Générer un plan d'action
   */
  async generateActionPlan(req: AuthRequest, res: Response) {
    try {
      const { goal, timeframe } = req.body;

      if (!goal || !timeframe) {
        return res.status(400).json({
          success: false,
          error: 'Veuillez fournir un objectif et une durée'
        });
      }

      const plan = await openaiService.generateActionPlan(goal, timeframe);

      res.json({
        success: true,
        data: plan
      });
    } catch (error) {
      console.error('Error generating action plan:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la génération du plan'
      });
    }
  }

  /**
   * Résumé hebdomadaire
   */
  async getWeeklySummary(req: AuthRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId! },
        include: {
          habits: {
            where: { isActive: true }
          },
          checkIns: {
            where: {
              date: {
                gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              }
            }
          }
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }

      const completedHabits = [...new Set(
        user.checkIns
          .filter(c => c.completed)
          .map(c => user.habits.find(h => h.id === c.habitId)?.name)
          .filter(Boolean)
      )] as string[];

      const allHabitNames = user.habits.map(h => h.name);
      const missedHabits = allHabitNames.filter(h => !completedHabits.includes(h));

      const weekData = {
        checkInsCount: user.checkIns.filter(c => c.completed).length,
        completedHabits,
        missedHabits,
        totalPoints: user.checkIns.filter(c => c.completed).length * 10
      };

      const summary = await openaiService.generateWeeklySummary(weekData);

      res.json({
        success: true,
        data: { summary, stats: weekData }
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la génération du résumé'
      });
    }
  }
}
