import { Tenant, PromoCode } from '../entity'
export const applyReduction = async (idPromo: any, idTenant: any) => {
    const tenant = await Tenant.findOne(idTenant)
    const promoCode = await PromoCode.findOne(idPromo)

    /*if (promoCode) {
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
    }*/
}