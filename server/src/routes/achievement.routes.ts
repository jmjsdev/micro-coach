import { Router } from 'express';
import { AchievementController } from '../controllers/achievement.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const achievementController = new AchievementController();

router.use(authenticate);

router.get('/', achievementController.getAll);

export default router;
