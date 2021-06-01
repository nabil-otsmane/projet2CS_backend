import { Router } from 'express';
import { addBill, getBills } from '../controllers/Bill';
import { authToken } from '../middleware'
const router = Router();
router.use('/bill', authToken)
router.get('/bill/all', getBills);
router.post('/bill/add', addBill);
export default router;