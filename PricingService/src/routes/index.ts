import { Router } from 'express';
import { get,getPricingPerHour,getPenalties} from '../controllers/PricingController'
const router = Router();


router.get('/pricing/', get);
router.get('/pricing/getPricingPerHour/:id',getPricingPerHour)
router.get('/pricing/getPenalties/:id',getPenalties)


export default router;