import { Router } from 'express';
/*import { get, getPricingPerHour, getPricingPerDay, getRealTimePricing } from 
                                            '../controllers/PricingController'
import { applyPromoCode, getReductionPrice } from '../controllers/PromoCodeController'
import { getPenalties} from '../controllers/PenaltiesController'
//import { getSubscriptionPrice} from '../controllers/SubscriptionController'*/
import { get , getRental} from '../controllers/RentalController'
const router = Router();


router.get('/', get);
/*router.get('/getRealTimePricing/:unitPrice/:rentalDuration',getRealTimePricing)
router.get('/getPricingPerDay/:id', getPricingPerDay)
router.get('/getPricingPerHour/:id', getPricingPerHour)
router.get('/getPenalties/:id', getPenalties)
router.get('/getReductionPrice/:basePrice/:idPromoCode', getReductionPrice)
router.get('/applyPromoCode/:idTenant/:idPromoCode', applyPromoCode)*/
router.get('/getRental/:idUser' , getRental);

export default router;
