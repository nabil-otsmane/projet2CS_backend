import { Request, Response } from "express";
import { PromoCode } from "../entity/PromoCode";
import { Tenant } from "../entity/Tenant";

// get the price after applying the chosen reduction
export async function getReductionPrice(req: Request, res: Response) {
    const basePrice = Number(req.params.basePrice)
    const promoCode = await PromoCode.findOne(req.params.idPromoCode)
    const tenant = await Tenant.findOne(req.params.idTenant)
    if (promoCode && tenant) {
        res.json({
            price: calculateReduction(basePrice, promoCode.reductionRate),
            currentPoints: tenant.points - promoCode.pricePoints,
            msg: "success"
        })
    } else {
        res.json({
            msg: "Failed to find Promo Code."
        })
    }
}

// Substracts the points from a tenant when he chooses to apply a promo code
export async function applyPromoCode(_req: Request, _res: Response) {
    const tenant = await Tenant.findOne(_req.params.idTenant)
    const promoCode = await PromoCode.findOne(_req.params.idPromoCode)

    if (promoCode) {
        if (tenant && (tenant.accountState == 'Activated')) {
            if (tenant.points >= promoCode.pricePoints) {
                tenant.points = tenant.points - promoCode.pricePoints
                console.log(tenant.points)
                const result = await Tenant.save(tenant);
                _res.json(tenant);

            } else {
                _res.json({
                    msg: "You don't have enough points for this purchase."
                })
            }
        } else {
            _res.json({
                msg: "Your account is currently unavailable or suspended."
            })
        }
    } else {
        _res.json({
            msg: "Failed to find Promo Code."
        })
    }
}

export const calculateReduction = (price: number, reductionRate: number) => {
    return price - (price * reductionRate);
}
