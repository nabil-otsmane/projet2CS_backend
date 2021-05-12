import { Request, Response } from "express";
import {Rental} from "../entity/Rental";

export const get =  (_req: Request, res: Response) => {
    res.end("Pricing service.");
}

export const addRental = async (req: Request, res: Response) => {
    const rental = Rental.create({
        
        idTenant: req.body.idTenant,
        idVehicle: req.body.idVehicle,
        rentalDate: req.body.rentalDate,
        rentalTime: req.body.rentalTime,
        plannedRestitutionDate: req.body.plannedRestitutionDate,
        plannedRestitutionTime: req.body.plannedRestitutionTime,
        restitutionDate: req.body.restitutionDate,
        restitutionTime: req.body.restitutionTime,
        rentalType: req.body.rentalType
      
    })

    await rental.save()
    res.send(rental)
}

export async function getRentals(_req: Request, res: Response) {
    const rentals = await Rental.find();
    res.json(rentals)
}

export async function getRentalById(_req: Request, res: Response) {
    const id=_req.params.id;
    const rental = await Rental.findOne(id);
    res.json(rental)
}

export async function updateRental(_req: Request, res: Response) {
    const id=_req.params.id;
    const rental = await Rental.findOne(id);
    if(rental){
        Rental.merge(rental,_req.body);
        const result = Rental.save(rental);
        res.json(result);
    }
    else{
        res.json({ msg: "Rental Not Found" });
    }
    
}

export async function deleteRental(_req: Request, res: Response) {
    const id=_req.params.id;
    const rental = await Rental.delete(id);
    res.json(rental)
}
