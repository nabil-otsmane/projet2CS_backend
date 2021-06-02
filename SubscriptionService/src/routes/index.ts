import { Router } from 'express';
import { get, getSubTypes, addSubscription,getSubscriptionCards,getSubscriptionByTenant, 
    deleteExpiredSubscriptions, activateSubscription, hasSubscription,getSubType}
     from '../controllers/SubscriptionController'
const router = Router();


router.get('/', get);
router.get('/getSubTypes', getSubTypes)
router.get('/hasSubscription/:idTenant',hasSubscription)
router.get('/getSubType/:idSubType',getSubType)
router.get('/getSubByTenant/:idTenant', getSubscriptionByTenant)
router.get('/getSubCards', getSubscriptionCards)
router.post('/addSub', addSubscription)
router.post('/activateSub/:idSub', activateSubscription)
router.post('/deleteExpiredSubs', deleteExpiredSubscriptions)

export default router;