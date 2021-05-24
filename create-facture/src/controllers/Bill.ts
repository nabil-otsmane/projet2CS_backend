import { Request, Response } from "express";
import { Bill, Rental, Vehicle, AuthUser } from "../entity";
import { printFacture } from '../functions'

/*export const get =  (_req: Request, res: Response) => {
    res.end("Hello there this is service of creation of facture.");
}*/

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

export async function getBills(_req: Request, res: Response) {
    const bills = await Bill.find();
    res.json(bills)
}

/*export async function getUsers(_req: Request, res: Response) {
    const users = await User.find();
    res.json(users)
}*/