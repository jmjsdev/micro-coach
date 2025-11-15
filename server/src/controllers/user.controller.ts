import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export class UserController {
  async getStats(req: AuthRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId! },
        include: {
          habits: {
            where: { isActive: true }
          },
          checkIns: {
            where: { completed: true }
          },
          achievements: true
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }

      const stats = {
        totalHabits: user.habits.length,
        totalCheckIns: user.checkIns.length,
        totalAchievements: user.achievements.length,
        totalPoints: user.totalPoints,
        level: user.level,
        // Calculate this week's check-ins
        thisWeekCheckIns: user.checkIns.filter(c => {
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return new Date(c.date) >= weekAgo;
        }).length
      };

      res.json({ success: true, data: stats });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des statistiques'
      });
    }
  }

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      const { name, avatar } = req.body;

      const user = await prisma.user.update({
        where: { id: req.userId! },
        data: { name, avatar },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          isPremium: true,
          totalPoints: true,
          level: true,
        }
      });

      res.json({
        success: true,
        data: user,
        message: 'Profil mis à jour avec succès'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la mise à jour du profil'
      });
    }
  }

  async updateSettings(req: AuthRequest, res: Response) {
    try {
      const { notificationsEnabled, emailReminders, theme } = req.body;

      const user = await prisma.user.update({
        where: { id: req.userId! },
        data: {
          notificationsEnabled,
          emailReminders,
          theme
        },
        select: {
          notificationsEnabled: true,
          emailReminders: true,
          theme: true,
        }
      });

      res.json({
        success: true,
        data: user,
        message: 'Paramètres mis à jour avec succès'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la mise à jour des paramètres'
      });
    }
  }
}
