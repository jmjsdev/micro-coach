import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateHabitSchema, MAX_FREE_HABITS } from '@micro-coach/shared';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export class HabitController {
  async getAll(req: AuthRequest, res: Response) {
    try {
      const habits = await prisma.habit.findMany({
        where: {
          userId: req.userId!,
          isActive: true
        },
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { checkIns: true }
          }
        }
      });

      res.json({ success: true, data: habits });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des habitudes'
      });
    }
  }

  async getById(req: AuthRequest, res: Response) {
    try {
      const habit = await prisma.habit.findFirst({
        where: {
          id: req.params.id,
          userId: req.userId!
        },
        include: {
          checkIns: {
            orderBy: { date: 'desc' },
            take: 90 // Last 90 days
          }
        }
      });

      if (!habit) {
        return res.status(404).json({
          success: false,
          error: 'Habitude non trouvée'
        });
      }

      res.json({ success: true, data: habit });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération de l\'habitude'
      });
    }
  }

  async create(req: AuthRequest, res: Response) {
    try {
      const validatedData = CreateHabitSchema.parse(req.body);

      // Check user's habit limit (free users: 3 habits)
      const user = await prisma.user.findUnique({
        where: { id: req.userId! }
      });

      if (!user?.isPremium) {
        const habitCount = await prisma.habit.count({
          where: {
            userId: req.userId!,
            isActive: true
          }
        });

        if (habitCount >= MAX_FREE_HABITS) {
          return res.status(403).json({
            success: false,
            error: `Limite atteinte. Passez à Premium pour créer plus de ${MAX_FREE_HABITS} habitudes.`
          });
        }
      }

      const habit = await prisma.habit.create({
        data: {
          ...validatedData,
          daysPerWeek: validatedData.frequencyDetails?.daysPerWeek,
          userId: req.userId!
        }
      });

      // Check for first habit achievement
      const habitCount = await prisma.habit.count({
        where: { userId: req.userId! }
      });

      if (habitCount === 1) {
        await prisma.achievement.create({
          data: {
            userId: req.userId!,
            type: 'first_habit',
            habitId: habit.id
          }
        });

        await prisma.user.update({
          where: { id: req.userId! },
          data: { totalPoints: { increment: 10 } }
        });
      }

      res.status(201).json({
        success: true,
        data: habit,
        message: 'Habitude créée avec succès'
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Données invalides',
          details: error.errors
        });
      }
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la création de l\'habitude'
      });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const habit = await prisma.habit.findFirst({
        where: {
          id: req.params.id,
          userId: req.userId!
        }
      });

      if (!habit) {
        return res.status(404).json({
          success: false,
          error: 'Habitude non trouvée'
        });
      }

      const updatedHabit = await prisma.habit.update({
        where: { id: req.params.id },
        data: req.body
      });

      res.json({
        success: true,
        data: updatedHabit,
        message: 'Habitude modifiée avec succès'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la modification de l\'habitude'
      });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const habit = await prisma.habit.findFirst({
        where: {
          id: req.params.id,
          userId: req.userId!
        }
      });

      if (!habit) {
        return res.status(404).json({
          success: false,
          error: 'Habitude non trouvée'
        });
      }

      // Soft delete
      await prisma.habit.update({
        where: { id: req.params.id },
        data: { isActive: false }
      });

      res.json({
        success: true,
        message: 'Habitude supprimée avec succès'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la suppression de l\'habitude'
      });
    }
  }

  async getStats(req: AuthRequest, res: Response) {
    try {
      const habit = await prisma.habit.findFirst({
        where: {
          id: req.params.id,
          userId: req.userId!
        },
        include: {
          checkIns: {
            where: { completed: true },
            orderBy: { date: 'desc' }
          }
        }
      });

      if (!habit) {
        return res.status(404).json({
          success: false,
          error: 'Habitude non trouvée'
        });
      }

      // Calculate streak
      let currentStreak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const sortedCheckIns = habit.checkIns.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      for (let i = 0; i < sortedCheckIns.length; i++) {
        const checkInDate = new Date(sortedCheckIns[i].date);
        checkInDate.setHours(0, 0, 0, 0);

        const expectedDate = new Date(today);
        expectedDate.setDate(expectedDate.getDate() - i);

        if (checkInDate.getTime() === expectedDate.getTime()) {
          currentStreak++;
        } else {
          break;
        }
      }

      const stats = {
        totalCheckIns: habit.checkIns.length,
        currentStreak,
        longestStreak: currentStreak, // TODO: Calculate actual longest streak
        completionRate: 0, // TODO: Calculate based on frequency
      };

      res.json({ success: true, data: stats });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des statistiques'
      });
    }
  }
}
