import { Router } from 'express';
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from '../controllers/transaction.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', createTransaction);
router.get('/', getTransactions);
router.delete('/:id', deleteTransaction);

export default router;