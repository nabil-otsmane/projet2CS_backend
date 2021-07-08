import { Router } from 'express';
import {addBill,getBills,getBillTenant} from '../controllers/Bill';

const router = Router();

router.get('/bill/all',getBills);
router.post('/bill/add',addBill);
router.get('/bill/getbill',getBillTenant)
export default router;