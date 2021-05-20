/*import { Request, Response } from "express";
import {Bill} from "../entity/Bill";
import {Rental} from "../entity/Tenant";
export const addBill = async (req: Request, res: Response) => {
    const  rental= await Rental.find({
        where : {idRental : req.body.idRental}
    });
    const nb=Math.floor(Math.random() * (1000 - 2 + 1)) + 2;
   const date=rental[0].rentaldate
    console.log(date);
    const bill = Bill.create({
        nbBill : nb,
        idRental: req.body.idRental,
        creationDate: date,
        baseRate :req.body.baseRate,
        penaltyRate : req.body.penaltyRate,
        totalRate: req.body.totalRate,
        report:req.body.report
     
    })

    await bill.save()
    res.send(bill)
}

export async function getBills(_req:Request, res:Response){
    const bills =await Bill.find();
    res.json(bills)
}
export async function getBillTenant(req:Request, res:Response){
    const  bill= await Bill.find({
        where : {idRental : req.body.idRental}
    });
    res.json(bill)
}
*/