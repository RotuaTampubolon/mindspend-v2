import { Router } from 'express';
import { getCategories } from '../controllers/category.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getCategories);

export default router;