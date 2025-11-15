import { z } from 'zod';

export const HabitCategorySchema = z.enum([
  'health',
  'fitness',
  'mental',
  'productivity',
  'social',
  'other',
]);

export type HabitCategory = z.infer<typeof HabitCategorySchema>;

export const HabitFrequencySchema = z.enum(['daily', 'weekly', 'custom']);

export type HabitFrequency = z.infer<typeof HabitFrequencySchema>;

export const HabitSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  category: HabitCategorySchema,
  frequency: HabitFrequencySchema,
  frequencyDetails: z.object({
    daysPerWeek: z.number().min(1).max(7),
  }).optional(),
  reminderTime: z.string().optional(),
  icon: z.string(),
  color: z.string(),
  goalDays: z.number().optional(),
  isPublic: z.boolean().default(false),
  createdAt: z.date(),
  isActive: z.boolean().default(true),
});

export type Habit = z.infer<typeof HabitSchema>;

export const CreateHabitSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: HabitCategorySchema,
  frequency: HabitFrequencySchema,
  frequencyDetails: z.object({
    daysPerWeek: z.number().min(1).max(7),
  }).optional(),
  reminderTime: z.string().optional(),
  icon: z.string().default('circle'),
  color: z.string().default('#6366f1'),
  goalDays: z.number().min(1).optional(),
  isPublic: z.boolean().default(false),
});

export type CreateHabit = z.infer<typeof CreateHabitSchema>;
