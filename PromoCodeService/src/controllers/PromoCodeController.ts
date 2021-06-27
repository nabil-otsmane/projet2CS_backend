import { Request, Response } from "express";
import { getManager } from "typeorm";
import { PromoCode } from "../entity/PromoCode";


// Function for testing server response
export const get = (_req: Request, res: Response) => {
    res.end("Promotion Codes Service")
}
//for Kotlin : returns list of promo codes in json array format
export async function getAllPromoCodes(_req: Request, res:Response) {
    const promoCodesList = await PromoCode.find()
    res.json(promoCodesList)
}

//for Web : returns list of promo codes in 
export async function getAllPromoCodesPages(_req: Request, res:Response) {

    try {
        const promoCodesList = await getManager()
            .createQueryBuilder()
            .from(PromoCode, "PromoCode")
            .getRawMany();
        res.status(200).send(promoCodesList)
    } catch (e) {
        res.status(404).send(e)
    }
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
    let promoCode= await PromoCode.findOne(req.body.idPromoCode)
    
    if(promoCode){
        if(req.body.pricePoints){
            promoCode.pricePoints = req.body.pricePoints
        }

        if(req.body.reductionRate){
            promoCode.reductionRate = req.body.reductionRate
        }
         
        const saved = await PromoCode.save(promoCode)
        if(saved){
            res.json({
                msg: "success",
                promoCode: promoCode
            })
        }else{
            res.status(500).json({
                msg: "This operation was not successful"
            })
        }
    }else{
        res.status(404).json({
            msg : "Promo code doesn't exist"
        })
    }
}