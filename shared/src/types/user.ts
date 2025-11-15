import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().optional(),
  isPremium: z.boolean().default(false),
  createdAt: z.date(),
  totalPoints: z.number().default(0),
  level: z.number().default(1),
  settings: z.object({
    notifications: z.boolean().default(true),
    emailReminders: z.boolean().default(true),
    theme: z.enum(['light', 'dark', 'auto']).default('auto'),
  }).optional(),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
});

export type CreateUser = z.infer<typeof CreateUserSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type Login = z.infer<typeof LoginSchema>;
