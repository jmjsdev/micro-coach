import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const userController = new UserController();

router.use(authenticate);

router.get('/stats', userController.getStats);
router.put('/profile', userController.updateProfile);
router.put('/settings', userController.updateSettings);

export default router;
