import { Request, Response } from "express";
import { Rental } from "../entity/Rental";

export const get = (_req: Request, res: Response) => {
    res.end("Pricing service.");
}

export const addRental = async (req: Request, res: Response) => {
    try {
        const rental = Rental.create({
            idTenant: req.body.idTenant,
            idVehicle: req.body.idVehicle,
            rentaldate: req.body.rentaldate,
            rentaltime: req.body.rentaltime,
            plannedrestitutiondate: req.body.plannedrestitutiondate,
            plannedrestitutiontime: req.body.plannedrestitutiontime,
            restitutionDate: req.body.restitutionDate,
            restitutionTime: req.body.restitutionTime,
            rentalType: req.body.rentalType,
            iddepartborne: req.body.iddepartborne,
            iddestborne: req.body.iddestborne,
            rentalstate: req.body.rentalstate
        })
        await rental.save()
        console.log(rental)
        res.status(200).send(rental)
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function getRentals(_req: Request, res: Response) {
    console.log('hereee');
    const rentals = await Rental.find();
    res.json(rentals)
}

export async function getRentalById(_req: Request, res: Response) {
    const id = _req.params.id;
    const rental = await Rental.findOne(id);
    res.json(rental)
}

export async function getRentalsByState(_req: Request, res: Response) {
    const state = _req.params.state;
    const rental = await Rental.findOne({ where: { rentalstate: state } });
    res.json(rental)
}

export async function updateRental(_req: Request, res: Response) {
    const id = _req.params.id;
    const rental = await Rental.findOne(id);
    if (rental) {
        Rental.merge(rental, _req.body);
        const result = Rental.save(rental);
        res.json(result);
    }
    else {
        res.json({ msg: "Rental Not Found" });
    }

}

export async function deleteRental(_req: Request, res: Response) {
    const id = _req.params.id;
    const rental = await Rental.delete(id);
    res.json(rental)
}
