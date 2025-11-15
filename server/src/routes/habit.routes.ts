import { Router } from 'express';
import { HabitController } from '../controllers/habit.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const habitController = new HabitController();

router.use(authenticate);

router.get('/', habitController.getAll);
router.get('/:id', habitController.getById);
router.post('/', habitController.create);
router.put('/:id', habitController.update);
router.delete('/:id', habitController.delete);
router.get('/:id/stats', habitController.getStats);

export default router;
