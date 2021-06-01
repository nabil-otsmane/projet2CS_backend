import { Router } from 'express';
import { get, getPricingPerHour, getPricingPerDay, getRealTimePricing } from 
                                            '../controllers/PricingController'
import { applyPromoCode, getReductionPrice } from '../controllers/PromoCodeController'
import { getPenalties} from '../controllers/PenaltiesController'
//import { getSubscriptionPrice} from '../controllers/SubscriptionController'
const router = Router();


router.get('/', get);
router.get('/getRealTimePricing/:unitPrice/:rentalDuration',getRealTimePricing)
router.get('/getPricingPerDay/:id', getPricingPerDay)
router.get('/getPricingPerHour/:id', getPricingPerHour)
//router.get('/getSubReducedPrice/:idSub/:basePrice', getSubscriptionPrice)
router.get('/getPenalties/:id', getPenalties)
router.get('/getReductionPrice/:basePrice/:idPromoCode', getReductionPrice)
router.get('/applyPromoCode/:idTenant/:idPromoCode', applyPromoCode)

export default router;
