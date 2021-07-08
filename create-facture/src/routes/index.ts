import { Router } from 'express';
import { addBill, getBills, getAllBills, downloadFacture, createBillToken } from '../controllers/Bill';
import { authToken } from '../middleware'
const router = Router();
router.get('/download/bill/:token', downloadFacture);
router.use('/bill', authToken)
router.get('/bill/all', getBills);
router.get('/bill/admin/all', getAllBills);
router.post('/bill/add', addBill);
router.get('/bill/download/:idBill', createBillToken);
export default router;
