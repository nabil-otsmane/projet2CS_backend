import { getManager } from 'typeorm'
import { Bill, Rental, Vehicle, AuthUser, Tenant, User } from "../entity";
import { printFacture } from '../functions'

export const addBill = async (req: any, res: any) => {
    const user = { ...req.user, ...(await AuthUser.findOne({ where: { idUser: req.user.idUser } })) }
    const rental = await Rental.findOne(req.body.idRental)
    if (!rental) return res.status(500).send(
        {
            ok: false,
            errors: "The rental you send is invalid"
        }
    )
    var bill = await Bill.findOne({ where: { idRental: req.body.idRental } })
    if (req.body.typeBill === "penaltyRate") {
        if (!bill) return res.status(500).send(
            {
                ok: false,
                errors: "we can't create an bill for this rental"
            }
        )
        bill.penaltyRate = req.body.amountToBill
        await bill.save()
        printFacture({
            user: user,
            bill: { ...bill, ...rental, type: rental.rentalType }
        })
    } else {
        const infoBaseRate = await Vehicle.findOne(rental.idVehicle)
        if (!infoBaseRate) return res.status(500).send(
            {
                ok: false,
                errors: "There no car for this bill"
            }
        )
        if (!bill) {
            bill = Bill.create({
                idRental: req.body.idRental,
                baseRate: (Number)(rental.rentalType === "day" ? infoBaseRate.unitpriceperday : infoBaseRate.unitpriceperhour),
                penaltyRate: 0,
                totalRate: req.body.amountToBill,
                report: 'report'

            })
        } else {
            bill.totalRate = req.body.amountToBill
        }
        await bill.save()
        printFacture({
            user: user,
            bill: { ...bill, ...rental, type: rental.rentalType }
        })
        res.send({
            ok: true,
            message: "Bill generated successfully"
        })
    }
}

export async function getBills(req: any, res: any) {
    const user = req.user
    try {
        const listBills = await getManager()
            .createQueryBuilder()
            /*.select("user.lastName AS nom")
            .addSelect("user.firstName AS prenom")
            /*.addSelect("tenant.profilePicture AS picture")
            .addSelect("bill.idBill,bill.nbBill,bill.idRental,bill.baseRate,bill.penaltyRate,bill.totalRate,bill.report")*/
            .from(User, "user")
            .innerJoin(Tenant, 'tenant', 'tenant.idUser=user.idUser')
            .innerJoin(Rental, 'rental', 'rental.idTenant=tenant.idTenant')
            .innerJoin(Bill, 'bill', 'bill.idRental=rental.idRental')
            .where("user.idUser=:idUser", { idUser: user.idUser })
            .getRawMany();
        console.log(listBills)
        res.status(200).send(listBills)
    } catch (e) {
        res.status(400).send(e)
    }

}
