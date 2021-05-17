import { Request, Response } from "express";
import {Bill} from "../entity/Bill";

/*export const get =  (_req: Request, res: Response) => {
    res.end("Hello there this is service of creation of facture.");
}*/

export const addBill = async (req: Request, res: Response) => {
    console.log("on va ajouter une facture");
    const bill = Bill.create({
        idBill : req.body.idBill,
        nbBill : req.body.nbBill,
        idRental: req.body.idRental,
        creationDate: req.body.CreationDate,
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

/*export async function getUsers(_req: Request, res: Response) {
    const users = await User.find();
    res.json(users)
}*/