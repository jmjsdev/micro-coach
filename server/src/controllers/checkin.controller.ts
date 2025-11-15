import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateCheckInSchema, POINTS_PER_CHECKIN } from '@micro-coach/shared';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export class CheckInController {
  async create(req: AuthRequest, res: Response) {
    try {
      const validatedData = CreateCheckInSchema.parse(req.body);

      // Verify habit belongs to user
      const habit = await prisma.habit.findFirst({
        where: {
          id: validatedData.habitId,
          userId: req.userId!
        }
      });

      if (!habit) {
        return res.status(404).json({
          success: false,
          error: 'Habitude non trouvée'
        });
      }

      // Check if check-in already exists for this date
      const existingCheckIn = await prisma.checkIn.findUnique({
        where: {
          habitId_date: {
            habitId: validatedData.habitId,
            date: new Date(validatedData.date)
          }
        }
      });

      if (existingCheckIn) {
        return res.status(400).json({
          success: false,
          error: 'Un check-in existe déjà pour cette date'
        });
      }

      const checkIn = await prisma.checkIn.create({
        data: {
          habitId: validatedData.habitId,
          userId: req.userId!,
          date: new Date(validatedData.date),
          completed: validatedData.completed,
          note: validatedData.note,
          mood: validatedData.mood,
          duration: validatedData.duration
        }
      });

      // Award points
      if (validatedData.completed) {
        const updatedUser = await prisma.user.update({
          where: { id: req.userId! },
          data: {
            totalPoints: { increment: POINTS_PER_CHECKIN }
          }
        });

        // Check for level up (every 100 points = 1 level)
        const newLevel = Math.floor(updatedUser.totalPoints / 100) + 1;
        if (newLevel > updatedUser.level) {
          await prisma.user.update({
            where: { id: req.userId! },
            data: { level: newLevel }
          });

          // Award level achievements
          if (newLevel === 5) {
            await prisma.achievement.create({
              data: {
                userId: req.userId!,
                type: 'level_5'
              }
            }).catch(() => {}); // Ignore if already exists
          } else if (newLevel === 10) {
            await prisma.achievement.create({
              data: {
                userId: req.userId!,
                type: 'level_10'
              }
            }).catch(() => {});
          }
        }

        // Check for streak achievements
        await this.checkStreakAchievements(req.userId!, validatedData.habitId);
      }

      res.status(201).json({
        success: true,
        data: checkIn,
        message: 'Check-in enregistré avec succès'
      });
    } catch (error: any) {
      console.error('CheckIn error:', error);
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Données invalides',
          details: error.errors
        });
      }
      res.status(500).json({
        success: false,
        error: 'Erreur lors de l\'enregistrement du check-in'
      });
    }
  }

  async getByHabit(req: AuthRequest, res: Response) {
    try {
      const checkIns = await prisma.checkIn.findMany({
        where: {
          habitId: req.params.habitId,
          userId: req.userId!
        },
        orderBy: { date: 'desc' }
      });

      res.json({ success: true, data: checkIns });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des check-ins'
      });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const checkIn = await prisma.checkIn.findFirst({
        where: {
          id: req.params.id,
          userId: req.userId!
        }
      });

      if (!checkIn) {
        return res.status(404).json({
          success: false,
          error: 'Check-in non trouvé'
        });
      }

      const updatedCheckIn = await prisma.checkIn.update({
        where: { id: req.params.id },
        data: req.body
      });

      res.json({
        success: true,
        data: updatedCheckIn,
        message: 'Check-in modifié avec succès'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la modification du check-in'
      });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const checkIn = await prisma.checkIn.findFirst({
        where: {
          id: req.params.id,
          userId: req.userId!
        }
      });

      if (!checkIn) {
        return res.status(404).json({
          success: false,
          error: 'Check-in non trouvé'
        });
      }

      await prisma.checkIn.delete({
        where: { id: req.params.id }
      });

      res.json({
        success: true,
        message: 'Check-in supprimé avec succès'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la suppression du check-in'
      });
    }
  }

  private async checkStreakAchievements(userId: string, habitId: string) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        habitId,
        completed: true
      },
      orderBy: { date: 'desc' }
    });

    // Calculate current streak
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedCheckIns = checkIns.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    for (let i = 0; i < sortedCheckIns.length; i++) {
      const checkInDate = new Date(sortedCheckIns[i].date);
      checkInDate.setHours(0, 0, 0, 0);

      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);

      if (checkInDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    // Award achievements based on streak
    const achievements = [];
    if (streak >= 7) achievements.push('streak_7');
    if (streak >= 30) achievements.push('streak_30');
    if (streak >= 100) achievements.push('streak_100');

    for (const type of achievements) {
      await prisma.achievement.create({
        data: {
          userId,
          type,
          habitId
        }
      }).catch(() => {}); // Ignore if already exists
    }
  }
}
