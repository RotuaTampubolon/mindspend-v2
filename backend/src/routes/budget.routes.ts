import { Router } from 'express';
import { createBudget, getCurrentBudget, updateBudget, getBudgetSummary } from '../controllers/budget.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Semua budget routes butuh authentication
router.use(authenticate);

router.post('/', createBudget);
router.get('/current', getCurrentBudget);
router.patch('/:id', updateBudget);
router.get('/:id/summary', getBudgetSummary);

export default router; 


