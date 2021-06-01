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