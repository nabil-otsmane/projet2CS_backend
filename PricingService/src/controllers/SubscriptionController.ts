import { Request, Response } from "express";
import { Subscription } from "../entity/Subscription";

export async function getSubscriptionPrice(req : Request, res: Response){
    const basePrice = Number(req.params.basePrice)
    const subscription = await Subscription.findOne({
        relations : ["subTypeO"],
        where : { idSub : req.params.idSub }
    })
    console.log(subscription)
    if(subscription){
        if(subscription.subState){
            res.json({
                price : basePrice - (basePrice*subscription.subTypeO.reductionRate),
                msg : "success"
            })
        }else{
            res.json({
                msg : "L'abonnement a expiré."
            })
        } 
    } else{
        res.json({
            msg : "L'abonnement n'existe pas."
        })
    }
}