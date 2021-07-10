import { Router } from 'express';
import { get, getSubTypes, addSubscription,getSubscriptionCards,getSubscriptionByTenant, 
    deleteExpiredSubscriptions, activateSubscription, subscriptionState,getSubType,
    debitBalance, getBalance, rechargeCard, updateSuscriptionType, getActiveSubscriptions,
    getPendingSubscriptions, getExpiredSubscriptions, reductionPrice}
     from '../controllers/SubscriptionController'
const router = Router();


router.get('/', get);
router.get('/getSubTypes', getSubTypes)
router.get('/subState/:idTenant',subscriptionState)
router.get('/getSubType/:idSubType',getSubType)
router.get('/getSubByTenant/:idTenant', getSubscriptionByTenant)
router.get('/getSubCards', getSubscriptionCards)
router.get('/getBalance/:idSub', getBalance)
router.get('/getActiveSubs', getActiveSubscriptions)
router.get('/getPendingSubs', getPendingSubscriptions)
router.get('/getExpiredSubs', getExpiredSubscriptions)
router.post('/addSub', addSubscription)
router.post('/activateSub/:idSub', activateSubscription)
router.post('/deleteExpiredSubs', deleteExpiredSubscriptions)
router.post('/debitBalance', debitBalance)
router.post('/rechargeCard', rechargeCard)
router.get('/reductionPriceSub', reductionPrice)
router.post('/updateSubType/:idSubType', updateSuscriptionType)

export default router;