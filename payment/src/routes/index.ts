import { Router } from 'express';
import { addPaymentMethod, payForCustomer, fetchAllCards } from '../controllers';
import { authToken } from '../middleware'

const router = Router();

router.use('/', authToken)
router.get('/', function () {
    console.log("server up")
});
router.post('/cards/add', addPaymentMethod);
router.post('/cards/pay', payForCustomer);
router.get('/cards/all', fetchAllCards);


export default router;