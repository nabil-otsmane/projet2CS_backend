import { Request, Response } from "express";
import { PromoCode } from "../entity/PromoCode";


// Function for testing server response
export const get = (_req: Request, res: Response) => {
    res.end("Promotion Codes Service")
}

export async function getAllPromoCodes(_req: Request, res:Response) {
    const promoCodesList = await PromoCode.find()
    res.json({
        promoCodes: promoCodesList
    })
}

export async function addPromoCode(req: Request, res:Response) {
    const promoCode = PromoCode.create({
       pricePoints : req.body.price,
       reductionRate : req.body.reductRate
    })
    const saved = await PromoCode.save(promoCode)
    if(saved){
        res.json({
            msg : "success"
        })
    }else{
        res.json({
            msg : "failed"
        })
    }
}

export async function deletePromoCode(req: Request, res:Response) {
    const deleted = await PromoCode.delete(req.params.idPromoCode)
    if(deleted){
        res.json({
            msg : "success"
        })
    }else{
        res.json({
            msg : "failed"
        })
    }
}

export async function updatePromoCode(req: Request, res:Response) {
    const promoCode= await PromoCode.findOne(req.body.idPromoCode)
    if(promoCode){
        promoCode.pricePoints = 
                    promoCode.pricePoints | req.body.pricePoints
        promoCode.reductionRate = 
                    promoCode.reductionRate | req.body.reductionRate
        const saved = await PromoCode.save(promoCode)
        if(saved){
            res.json({
                msg: "success",
                promoCode: saved
            })
        }else{
            res.json({
                msg: "This operation was not successful"
            })
        }
    }else{
        res.json({
            msg : "Promo code doesn't exist"
        })
    }
}