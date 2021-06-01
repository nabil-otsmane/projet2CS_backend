import { Router } from 'express';
import { addPaymentMethod, payForCustomer, fetchAllCards } from '../controllers';
import { authToken } from '../middleware'

const router = Router();

router.get('/', function () {
    console.log("server up")
});
router.use('/payment', authToken)
router.post('/payment/cards/add', addPaymentMethod);
router.post('/payment/cards/pay', payForCustomer);
router.get('/payment/cards/all', fetchAllCards);


export default router;