import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ACHIEVEMENTS_DATA } from '@micro-coach/shared';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export class AchievementController {
  async getAll(req: AuthRequest, res: Response) {
    try {
      const achievements = await prisma.achievement.findMany({
        where: { userId: req.userId! },
        orderBy: { unlockedAt: 'desc' }
      });

      // Enrich with metadata
      const enrichedAchievements = achievements.map(achievement => ({
        ...achievement,
        metadata: ACHIEVEMENTS_DATA[achievement.type as keyof typeof ACHIEVEMENTS_DATA]
      }));

      res.json({ success: true, data: enrichedAchievements });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des achievements'
      });
    }
  }
}
