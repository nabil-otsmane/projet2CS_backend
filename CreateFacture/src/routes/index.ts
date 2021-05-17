import { Router } from 'express';
import {addBill,getBills} from '../controllers/Bill';

const router = Router();

router.get('/bill/all',getBills);
router.post('/bill/add',addBill);
export default router;