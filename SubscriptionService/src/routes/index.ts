import { Router } from 'express';
import { get, addSubscription,getSubscriptionCards,getSubscriptionByTenant, 
    deleteExpiredSubscriptions} from '../controllers/SubscriptionController'
const router = Router();


router.get('/', get);
router.post('/addSub', addSubscription)
router.get('/getSubByTenant/:idTenant', getSubscriptionByTenant)
router.get('/getSubCards', getSubscriptionCards)
router.post('/deleteExpiredSubs', deleteExpiredSubscriptions)

export default router;