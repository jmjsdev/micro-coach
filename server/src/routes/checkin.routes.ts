import { Router } from 'express';
import { CheckInController } from '../controllers/checkin.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const checkInController = new CheckInController();

router.use(authenticate);

router.post('/', checkInController.create);
router.get('/habit/:habitId', checkInController.getByHabit);
router.put('/:id', checkInController.update);
router.delete('/:id', checkInController.delete);

export default router;
