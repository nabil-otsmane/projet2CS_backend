import { Router } from 'express';
import { get, getSubTypes, addSubscription,getSubscriptionCards,getSubscriptionByTenant, 
    deleteExpiredSubscriptions, activateSubscription} from '../controllers/SubscriptionController'
const router = Router();


router.get('/', get);
router.get('/getSubTypes', getSubTypes)
router.get('/getSubByTenant/:idTenant', getSubscriptionByTenant)
router.get('/getSubCards', getSubscriptionCards)
router.post('/addSub', addSubscription)
router.post('/activateSub/:idSub', activateSubscription)
router.post('/deleteExpiredSubs', deleteExpiredSubscriptions)

export default router;