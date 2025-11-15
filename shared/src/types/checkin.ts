import { z } from 'zod';

export const MoodSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

export type Mood = z.infer<typeof MoodSchema>;

export const CheckInSchema = z.object({
  id: z.string(),
  habitId: z.string(),
  userId: z.string(),
  date: z.date(),
  completed: z.boolean(),
  note: z.string().optional(),
  mood: MoodSchema.optional(),
  duration: z.number().optional(), // in minutes
  createdAt: z.date(),
});

export type CheckIn = z.infer<typeof CheckInSchema>;

export const CreateCheckInSchema = z.object({
  habitId: z.string(),
  date: z.string(),
  completed: z.boolean().default(true),
  note: z.string().max(500).optional(),
  mood: MoodSchema.optional(),
  duration: z.number().min(0).optional(),
});

export type CreateCheckIn = z.infer<typeof CreateCheckInSchema>;
