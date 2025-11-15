import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { CreateUserSchema, LoginSchema } from '@micro-coach/shared';
import { AuthRequest, authenticate } from '../middleware/auth';

const prisma = new PrismaClient();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const validatedData = CreateUserSchema.parse(req.body);

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email }
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Cet email est déjà utilisé'
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          name: validatedData.name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          isPremium: true,
          totalPoints: true,
          level: true,
          createdAt: true,
        }
      });

      // Generate token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '7d'
      });

      res.status(201).json({
        success: true,
        data: { user, token },
        message: 'Compte créé avec succès'
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
        error: 'Erreur lors de la création du compte'
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validatedData = LoginSchema.parse(req.body);

      // Find user
      const user = await prisma.user.findUnique({
        where: { email: validatedData.email }
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Email ou mot de passe incorrect'
        });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(
        validatedData.password,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: 'Email ou mot de passe incorrect'
        });
      }

      // Generate token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '7d'
      });

      const { password, ...userWithoutPassword } = user;

      res.json({
        success: true,
        data: { user: userWithoutPassword, token },
        message: 'Connexion réussie'
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
        error: 'Erreur lors de la connexion'
      });
    }
  }

  async me(req: AuthRequest, res: Response) {
    authenticate(req, res, async () => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: req.userId },
          select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
            isPremium: true,
            totalPoints: true,
            level: true,
            notificationsEnabled: true,
            emailReminders: true,
            theme: true,
            createdAt: true,
          }
        });

        if (!user) {
          return res.status(404).json({
            success: false,
            error: 'Utilisateur non trouvé'
          });
        }

        res.json({ success: true, data: user });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Erreur lors de la récupération du profil'
        });
      }
    });
  }
}
