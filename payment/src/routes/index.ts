import { Router } from 'express';
import { addPaymentMethod, payForCustomer, fetchAllCards } from '../controllers';
import { authToken } from '../middleware'

const router = Router();


router.post('/cards/add', authToken, addPaymentMethod);
router.post('/cards/pay', authToken, payForCustomer);
router.get('/cards/all', authToken, fetchAllCards);


export default router;