import { Router } from 'express';
import { addPaymentMethod, payForCustomer, fetchAllCards } from '../controllers';
import { authToken } from '../middleware'

const router = Router();


router.post('/payment/cards/add', authToken, addPaymentMethod);
router.post('/payment/cards/pay', authToken, payForCustomer);
router.get('/payment/cards/all', authToken, fetchAllCards);


export default router;