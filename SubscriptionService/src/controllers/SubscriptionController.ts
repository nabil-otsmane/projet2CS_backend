import { Request, Response } from "express";
import { Subscription } from "../entity/Subscription";
import { SubscriptionType } from "../entity/SubscriptionType";
import { Tenant } from "../entity/Tenant";


// Function for testing server response
export const get = (_req: Request, res: Response) => {
    res.end("Subscription Service")
}

//Vérifie si le locataire a une abonnement actif ou non 
export async function hasSubscription(req: Request, res: Response){
    const tenant = await Tenant.findOne(req.params.idTenant)
    if(tenant?.subCard!=null){
        res.send(true)
    }else{
        res.send(false)
    }
}

export async function getSubTypes(_req: Request, res: Response) {
    const subTypes = await SubscriptionType.find()
    res.status(200).send(subTypes)
}

export async function getSubType(req: Request, res: Response) {
    const subTypes = await SubscriptionType.findOne(req.params.idSubType)
    res.status(200).send(subTypes)
}

//Adding a subscription of SubType for a Tenant
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
                        subState : 'pending'
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

export async function activateSubscription(req: Request, res:Response) {
    const pendingSub = await Subscription.findOne(req.params.idSub)
    if(pendingSub){
        pendingSub.subState='active'
        let save = await Subscription.save(pendingSub)
        if(save.subState=="active"){
            res.status(201).json({ 
                msg: 'success'
            })
        }
    }else{
        res.status(400).json({ 
            msg: 'the subscription doesn\'t exist'
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
    res.status(200).json({
        subs : subscriptions
    })
}

export async function getSubscriptionByTenant(req: Request, res:Response) {
    const tenant = await Tenant.findOne(req.body.idTenant)
    const subscr = await Subscription.findOne(tenant?.subCard!!)
    res.json({
        sub: subscr
    })
}


export async function deleteExpiredSubscriptions(_req:Request,res:Response){
    const subscriptions = await Subscription.find({
        where: { 
            subState : 'active'
        }
    })
    let numDeletedSubs=0;
    const currentDate = (new Date()).getTime();
    for(let i=0;i<subscriptions.length;i++) {
        if(subscriptions[i].expirationDate.getTime()<currentDate){
            let tenant = await Tenant.findOne({
                where: {
                    subCard : subscriptions[i].idSub
                }
            })
            if(tenant){
                tenant.subCard = null
                await Tenant.save(tenant)
                subscriptions[i].subState = 'expired'
                await Subscription.save(subscriptions[i])
                numDeletedSubs++
            }
        }
    }
    res.status(201).json({
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