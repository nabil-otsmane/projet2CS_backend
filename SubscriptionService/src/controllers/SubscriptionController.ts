import { Request, Response } from "express";
import { Subscription } from "../entity/Subscription";
import { SubscriptionType } from "../entity/SubscriptionType";
import { Tenant } from "../entity/Tenant";


// Function for testing server response
export const get = (_req: Request, res: Response) => {
    res.end("Subscription Service")
}

export async function subscriptionState(req: Request, res: Response){
    const subscription = await Subscription.find({
        relations : ["subTypeO", "tenant"],
        where: { 
            idTenant : req.params.idTenant
        }
    })
    if(subscription.length>0){
        res.json({
            msg : subscription[0].subState
        })
    }else{
        res.json({
            msg : "no subscription"
        })
    }
    
}

export async function getSubTypes(_req: Request, res: Response) {
    const subTypes = await SubscriptionType.find()
    res.status(200).send(subTypes)
}

export async function getSubType(req: Request, res: Response) {
    const subType = await SubscriptionType.findOne(req.params.idSubType)
    res.status(200).send(subType)
}

//Adding a subscription of SubType for a Tenant
export async function addSubscription(req: Request, res:Response) {
    const subType = await SubscriptionType.findOne(req.body.idSubType)
    if(subType){
        let tenant = await Tenant.findOne(req.body.idTenant)
        if(tenant) {
            if(tenant.accountState.toLocaleLowerCase()=="validated"){
                if(tenant.subCard==null){
                    const subCard = Subscription.create({
                        subType: Number(req.body.idSubType),
                        creationDate : new Date(),
                        expirationDate: new Date(
                            subType.subTypeDuration*3600000*24
                                    + (new Date()).getTime()),
                        subState : 'pending',
                        idTenant : req.body.idTenant,
                        solde : 0
                    })
                    const added = await Subscription.save(subCard)
                    if(added){
                        tenant.subCard=subCard.idSub
                        tenant = await Tenant.save(tenant)
                        res.status(201).send(added)
                    }
                }else{
                    let subscription = await Subscription.findOne(tenant.subCard)
                    if(subscription?.subState=='expired'){

                        //renouveller l'abonnement
                        const subCard = Subscription.create({
                            subType: Number(req.body.idSubType),
                            creationDate : new Date(),
                            expirationDate: new Date(
                                subType.subTypeDuration*3600000*24
                                        + (new Date()).getTime()),
                            subState : 'pending',
                            idTenant : req.body.idTenant,
                            solde : 0
                        })
                        const added = await Subscription.save(subCard)
                        if(added){
                            tenant.subCard=subCard.idSub
                            tenant = await Tenant.save(tenant)
                            res.status(201).send(added)
                        }
                    }else{
                        res.status(404).json({
                            msg: "This tenant has a " + subscription?.subState + " subscription"
                        })
                    }
                }
            }else{
                res.status(404).json({
                    msg: "This tenant's account is unavailable or suspended"
                })
            }
        }else{
            res.status(404).json({
                msg: "This tenant doesn't exist"
            })
        }
    }else{
        res.status(404).json({
            msg: "The subscription type doesn't exist"
        })
    }  
}

/*
export async function addSubscription(req: Request, res:Response) {
    const subType = await SubscriptionType.findOne(req.body.idSubType)
    if(subType){
        let tenant = await Tenant.findOne(req.body.idTenant)
        if(tenant){
            if(tenant.accountState.toLocaleLowerCase()=="activated"){
                if(tenant.subCard==null){
                    const subCard = Subscription.create({
                        subType: Number(req.body.idSubType),
                        creationDate : new Date(),
                        expirationDate: new Date(
                            subType.subTypeDuration*3600000*24
                                    + (new Date()).getTime()),
                        subState : 'pending',
                        idTenant : req.body.idTenant
                    })
                    const added = await Subscription.save(subCard)
                    if(added){
                        tenant.subCard=subCard.idSub
                        tenant = await Tenant.save(tenant)
                        res.status(201).send(added)
                    }
                }else{
                    res.status(404).json({
                        msg: "This tenant already has an ongoing subscription"
                    })
                }
            }else{
                res.status(404).json({
                    msg: "This tenant's account is unavailable or suspended"
                })
            }
        }else{
            res.status(404).json({
                msg: "This tenant doesn't exist"
            })
        }
    }else{
        res.status(404).json({
            msg: "The subscription type doesn't exist"
        })
    }  
}
 */

export async function activateSubscription(req: Request, res:Response) {
    const pendingSub = await Subscription.findOne(req.params.idSub)
    if(pendingSub){
        if(pendingSub.subState=='pending'){
            pendingSub.subState='active'
            let save = await Subscription.save(pendingSub)
            if(save.subState=="active"){
                res.status(201).json({ 
                    msg: 'success'
                })
            }
        }else{
            res.status(400).json({ 
                msg: "This subscription can't be activated"
            })
        }
        
    }else{
        res.status(400).json({ 
            msg: "the subscription doesn\'t exist"
        })
    }
}

export async function reductionPrice(req: Request, res:Response) {
    const sub = await Subscription.findOne({
        relations : ["subTypeO"],
        where: { 
            idSub : req.body.idSub
        }
    })
    const price = Number(req.body.prix)
    if(sub){
        res.status(200).json(price - (price*sub.subTypeO.reductionRate))
    }else{
        res.status(400).json({ 
            msg: "the subscription doesn\'t exist"
        })
    }
}

//get all active Subscription Cards
export async function getSubscriptionCards(_req: Request, res:Response) {
    const subscriptions = await Subscription.find({
        where: { 
            subState : 'active'
        }
    })
    if(subscriptions.length!=0){
        res.status(200).json({
            subs : subscriptions
        })
    }else{
        msg : "No subscriptions to show"
    }
}

export async function getActiveSubscriptions(_req: Request, res:Response) {
    const subscriptions = await Subscription.find({
        relations : ["subTypeO","tenant"],
        where: { 
            subState : 'active'
        }
    })
    if(subscriptions.length!=0){
        res.status(200).json(subscriptions)
    }else{
        res.status(404).json({
            msg : "No subscriptions to show"
        })
    }
}

export async function getPendingSubscriptions(_req: Request, res:Response) {
    const subscriptions = await Subscription.find({
        relations : ["subTypeO","tenant"],
        where: { 
            subState : 'pending'
        }
    })
    if(subscriptions.length!=0){
        res.status(200).json(subscriptions)
    }else{
        res.status(404).json({
            msg : "No subscriptions to show"
        })
    }
}

export async function getExpiredSubscriptions(_req: Request, res:Response) {
    const subscriptions = await Subscription.find({
        relations : ["subTypeO","tenant"],
        where: { 
            subState : 'expired'
        }
    })
    if(subscriptions.length!=0){
        res.status(200).json(subscriptions)
    }else{
        res.status(404).json({
            msg : "No subscriptions to show"
        })
    }
}

export async function getSubscriptionByTenant(req: Request, res:Response) {
    const subscr = await Subscription.find({
        relations : ["subTypeO","tenant"],
        where:{
            idTenant : req.params.idTenant
        }
    })
    if(subscr.length!=0){
        res.status(200).json(subscr[subscr.length-1])
    }else{
        res.status(404).json("Tenant or subscription doesn't exist.")
    }
}

export async function debitBalance(req:Request, res:Response){
    const subCard = await Subscription.findOne(req.body.idSub)
    if(subCard){
        if(subCard.subState=='expired'){
            if(subCard.solde >= req.body.prix){
                subCard.solde = subCard.solde - req.body.prix
                const saved = await Subscription.save(subCard)
                if(saved){
                    res.status(201).json({
                        balance : saved.solde,
                        msg: "success"
                    })
                }else{
                    res.status(500).json({
                        msg: "The changes could not be saved."
                    })
                }
            }else{
                res.status(400).json({
                    msg: "The balance isn't enought for this payment."
                })
            }
        }else{
            res.status(400).json({
                msg: "Your susbscribtion has expired"
            })
        }
    }else{
        res.status(404).json({
            msg: "Card doesn't exist."
        })
    }
}

export async function rechargeCard(req:Request, res:Response){
    const subCard = await Subscription.findOne(req.body.idSub)
    if(subCard){
        if(subCard.subState=='active'){
            subCard.solde = subCard.solde + req.body.prix
            const saved = await Subscription.save(subCard)
            res.status(200).json({
                balance : saved.solde,
                msg: "success"
            })
        }else{
            res.status(400).json({
                msg: "This subscription isn't active."
            })
        }
    }else{
        res.status(404).json({
            msg: "Subscription doesn't exist."
        })
    }
}

export async function getBalance(req:Request, res:Response){
    const subCard = await Subscription.findOne(req.params.idSub)
    if(subCard){
        res.status(200).json({
            price : subCard.solde,
            msg: "success"
        })
    }else{
        res.status(404).json({
            msg: "Card doesn't exist."
        })
    }
}

export async function deleteExpiredSubscriptions(_req:Request,res:Response){
    const subscriptions = await Subscription.find({
        where:[
            { subState : 'active' },
            { subState : 'pending' }
        ] 
    })

    let numDeletedSubs=0;
    const currentDate = (new Date()).getTime();
    for(let i=0;i<subscriptions.length;i++) {
        if(subscriptions[i].expirationDate.getTime()<currentDate){
            subscriptions[i].subState = 'expired'
            await Subscription.save(subscriptions[i])
            numDeletedSubs++
        }
    }
    res.status(200).json({
        msg: "operation successful! " + 
                                numDeletedSubs + 
                                         " have been deleted."
    })
}
/*
export async function deleteTenantSubscription(req:Request,res:Response) {
    const tenant = await Tenant.findOne(req.params.idTenant)
    if(tenant){
        if(tenant.subCard){
            const deletedState = await Subscription.delete(tenant.subCard)
            if(deletedState){
                res.json({
                    msg: "Subscription for "  + tenant.idTenant + " has been deleted."
                })
            }else{
                res.json({
                    msg: "An error occured."
                })
            }
        }else{
            res.json({
                msg: "This tenant doesn't have an active subscription"
            })
        }
    }else{
        res.json({
            msg: "This tenant doesn't exist"
        })
    }
}*/

export async function updateSuscriptionType(req:Request, res:Response){
    const subType = await SubscriptionType.findOne(req.params.idSubType)
    if(subType){
        subType.bonusPointsRate = 
                    subType.bonusPointsRate | req.body.ptsRate
        subType.reductionRate = subType.reductionRate | req.body.reductRate
        const saved = await SubscriptionType.save(subType)
        if(saved){
            res.status(201).json({
                msg: "success"
            })
        }else{
            res.status(400).json({
                msg: "This operation was not successful"
            })
        }
    }
}