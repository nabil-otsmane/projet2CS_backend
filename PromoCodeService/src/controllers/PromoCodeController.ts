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
export async function getAllPromoCodesPages(req: any, res:Response) {

    const perPage = 10
    const page = parseInt(req.query.page) || 1
    try {
        const queryList = getManager()
            .createQueryBuilder()
            .from(PromoCode, "promocode")
        console.log(queryList)
        const total = await queryList.getCount();
        const promoCodesList = await queryList
            .limit(perPage)
            .offset((page - 1) * perPage)
            .orderBy("promocode.idPromoCode", "ASC")
            .getRawMany();
        console.log(promoCodesList)
        res.status(200).send({
            ok: true,
            data: {
                list: promoCodesList,
                currentPage: page,
                perPage: perPage,
                total: total
            }
        })
    } catch (e) {
        res.status(400).send(e)
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