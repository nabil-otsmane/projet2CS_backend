import { Request, Response } from "express";
import { Subscription } from "../entity/Subscription";
import { SubscriptionType } from "../entity/SubscriptionType";

export async function getSubscriptionPrice(_req : Request, _res: Response){
    const basePrice = Number(_req.params.basePrice)
    const sub = await Subscription.find({
        where : { idSub : _req.params.idSub },
        relations : ["subTypeO"]
    })

    if(sub){
        _res.json({
            sub : sub
        })
    }else{
        _res.json({
            sub : sub
        })
    }
}