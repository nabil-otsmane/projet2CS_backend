import { Response } from "express";
import { getManager } from 'typeorm'
import { Bill, Rental, Vehicle, AuthUser, User, Tenant } from "../entity";
import { printFacture, encrypt, decrypt } from '../functions'

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
    console.log(req.body.typeBill)
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

export async function getBills(req: any, res: Response) {
    const user = req.user
    try {
        const listBills = await getManager()
            .createQueryBuilder()
            .from(User, "user")
            .innerJoin(Tenant, 'tenant', 'tenant.idUser=user.idUser')
            .innerJoin(Rental, 'rental', 'rental.idTenant=tenant.idTenant')
            .innerJoin(Bill, 'bill', 'bill.idRental=rental.idRental')
            .where("user.idUser=:idUser", { idUser: user.idUser })
            .getRawMany();
        res.status(200).send(listBills)
    } catch (e) {
        res.status(400).send(e)
    }
}

export async function getAllBills(req: any, res: Response) {
    const perPage = 10
    const page = parseInt(req.query.page) || 1
    try {
        const queryList = getManager()
            .createQueryBuilder()
            .from(Bill, "bill")
            .innerJoin(Rental, 'rental', 'bill.idRental=rental.idRental')
            .innerJoin(Tenant, 'tenant', 'rental.idTenant=tenant.idTenant')
            .innerJoin(User, 'user', 'tenant.idUser=user.idUser')
        const total = await queryList.getCount();
        const listBills = await queryList
            .limit(perPage)
            .offset((page - 1) * perPage)
            .orderBy("bill.creationDate", "DESC")
            .getRawMany();

        res.status(200).send({
            ok: true,
            data: {
                list: listBills,
                currentPage: page,
                perPage: perPage,
                total: total
            }
        })
    } catch (e) {
        res.status(400).send(e)
    }
}

export async function createBillToken(req: any, res: any) {
    const user = req.user
    const bill = await Bill.findOne(req.params.idBill)
    if (!bill) return res.status(402).send({
        message: "The given data is invalid"
    })
    let tokenBill = { idUser: user.idUser, idBill: bill.idBill, createdAt: (new Date).toISOString() }
    let hashedToken = encrypt(JSON.stringify(tokenBill))
    return res.status(200).send({
        ok: true,
        urlBill: "http://54.37.87.85:7000/download/bill/" + hashedToken
    })
}

export async function downloadFacture(req: any, res: any) {
    try {
        var dataBill = JSON.parse(decrypt(req.params.token))
    } catch (e) {
        return res.status(402).send({
            message: "failed to get facture link please try with another link"
        })
    }
    let dateNow: any = new Date
    let tokenDate: any = new Date(dataBill.createdAt)
    let expiration = Math.abs(dateNow - tokenDate) / (1000 * 60 * 60)
    if (expiration <= 1) {
        const user = { ...(await User.findOne(dataBill.idUser)), ...(await AuthUser.findOne({ where: { idUser: dataBill.idUser } })) }
        const bill = await Bill.findOne(dataBill.idBill)
        if (bill && user) {
            const rental = await Rental.findOne(bill.idRental)
            try {
                printFacture({
                    user: user,
                    bill: { ...bill, ...rental, type: rental?.rentalType }
                }, res)
            } catch (e) {
                return res.status(402).send(e)
            }
        }
    }
    if (expiration > 1) res.status(400).send({ message: "Link expired" })
}