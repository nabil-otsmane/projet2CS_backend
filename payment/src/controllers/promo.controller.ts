import { Tenant, PromoCode } from '../entity'
export const applyReduction = async (idPromo: any, idTenant: any, amount: number) => {
    const tenant = await Tenant.findOne(idTenant)
    const promoCode = await PromoCode.findOne(idPromo)
    if (promoCode) {
        if (tenant && (tenant.accountState == 'Activated')) {
            if (tenant.points >= promoCode.pricePoints) {
                tenant.points = tenant.points - promoCode.pricePoints
                await Tenant.save(tenant);
                return {
                    ok: true,
                    amount: amount
                }
            } else {
                return {
                    ok: false,
                    message: "You don't have enough points for this purchase."
                }
            }
        } else {
            return {
                ok: false,
                message: "Your account is currently unavailable or suspended."
            }
        }
    } else {
        return {
            ok: false,
            message: "Failed to find Promo Code."
        }
    }
}