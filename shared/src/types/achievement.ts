import { z } from 'zod';

export const AchievementTypeSchema = z.enum([
  'first_habit',
  'streak_7',
  'streak_30',
  'streak_100',
  'five_habits',
  'level_5',
  'level_10',
  'perfect_week',
  'perfect_month',
]);

export type AchievementType = z.infer<typeof AchievementTypeSchema>;

export const AchievementSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: AchievementTypeSchema,
  unlockedAt: z.date(),
  habitId: z.string().optional(),
});

export type Achievement = z.infer<typeof AchievementSchema>;

export const AchievementMetadataSchema = z.object({
  type: AchievementTypeSchema,
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  points: z.number(),
});

export type AchievementMetadata = z.infer<typeof AchievementMetadataSchema>;
