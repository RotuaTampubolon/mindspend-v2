import { Router } from 'express';
import {
  createCheckIn,
  getLatestCheckIn,
  getCheckIns,
} from '../controllers/checkin.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', createCheckIn);
router.get('/latest', getLatestCheckIn);
router.get('/', getCheckIns);

export default router;