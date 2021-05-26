import { Request, Response } from "express";
import { Subscription } from "../entity/Subscription";
import { SubscriptionType } from "../entity/SubscriptionType";
import { Tenant } from "../entity/Tenant";


// Function for testing server response
export const get = (_req: Request, res: Response) => {
    res.end("Subscription Service")
}

//Adding a subscription of SubType for a Tenant
export async function addSubscription(req: Request, res:Response) {
    
    if(await SubscriptionType.findOne(req.body.idSubType)){
        const tenant = await Tenant.findOne(req.body.idTenant)
        if(tenant){
            if(tenant.accountState.toLocaleLowerCase()=="activated"){
                if(tenant.subCard==null){
                    const subCard = Subscription.create({
                        subType: Number(req.body.idSubType),
                        creationDate : new Date()
                    })
                    const added = await subCard.save()
                    if(added){
                        tenant.subCard=subCard.idSub
                        await Tenant.save(tenant)
                        res.send(added)
                    }
                }else{
                    res.status(404).json({
                        msg: "This tenant's already has a subscription card"
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

//get all active Subscription Cards
export async function getSubscriptionCards(_req: Request, res:Response) {
    const subscriptions = await Subscription.find({
        where: { 
            subState : true 
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
            subState : true 
        }
    })
    let numDeletedSubs=0;
    let expirationDate; let subType;
    const currentDate = (new Date()).getTime();
    for(let i=0;i<subscriptions.length;i++) {
        subType = await SubscriptionType.findOne(
                                        subscriptions[i].subType)
        expirationDate = subscriptions[i].creationDate
                                         .getTime()+(
                                             subType?.subTypeDuration!!
                                             )*3600000
        if(subscriptions[i].creationDate.getTime()>currentDate){
            let tenant = await Tenant.find({
                where: {
                    subCard : subscriptions[i].idSub
                }
            })
            tenant[0].subCard = null
            await Tenant.save(tenant[0])
            subscriptions[i].subState = false
            await Subscription.save(subscriptions[i])
        }
    }
    res.json({
        msg: "operation successful! " + 
                                numDeletedSubs + 
                                         " have been deleted."
    })
}

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
}