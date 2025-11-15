import { Router } from 'express';
import { AIController } from '../controllers/ai.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const aiController = new AIController();

// Toutes les routes nécessitent l'authentification
router.use(authenticate);

// Routes IA
router.get('/tip', aiController.getMotivationalTip);
router.get('/analyze', aiController.analyzeHabits);
router.post('/suggest', aiController.suggestHabits);
router.post('/sentiment', aiController.analyzeSentiment);
router.post('/chat', aiController.chat);
router.post('/action-plan', aiController.generateActionPlan);
router.get('/weekly-summary', aiController.getWeeklySummary);

export default router;
