import { Router } from 'express';
import { createBudget, getCurrentBudget, updateBudget } from '../controllers/budget.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Semua budget routes butuh authentication
router.use(authenticate);

router.post('/', createBudget);
router.get('/current', getCurrentBudget);
router.patch('/:id', updateBudget);

export default router;