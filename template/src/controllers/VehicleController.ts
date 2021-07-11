import { Request, Response } from "express";
import {Vehicle} from "../entity/Vehicle";

export const get =  (_req: Request, res: Response) => {
    res.end("Vehicle service.");
}



export async function getVehicles(_req: Request, res: Response) {
    
    const vehicles = await Vehicle.find();
    res.json(vehicles)
}

export async function getVehiclesavailable(_req: Request, res: Response) {
    
    const state=_req.params.state;
    const idborne=_req.params.idBorne;
    //const vehicles = await Vehicle.find({where:{availibility:state}});
    const vehicles = await Vehicle.find({where:{availibility:state,idBorne:idborne}});
    res.json(vehicles)
}

export async function getVehiclesBystate(_req: Request, res: Response) {
    const state=_req.params.state;
    const vehicles = await Vehicle.find({where:{availibility:state}});
    res.json(vehicles)
}

export async function getVehicleById(_req: Request, res: Response) {
    const id=_req.params.id;
    const vehicle = await Vehicle.findOne(id);
    res.json(vehicle)
}

export async function updateVehicle(_req: Request, res: Response) {
    const id=_req.params.id;
    const vehicle = await Vehicle.findOne(id);
    if(vehicle){
        Vehicle.merge(vehicle,_req.body);
        const result = Vehicle.save(vehicle);
        res.json(result);
    }
    else{
        res.json({ msg: "vehicle Not Found" });
    }
    
}

export async function deleteVehicle(_req: Request, res: Response) {
    const id=_req.params.id;
    const vehicle = await Vehicle.delete(id);
    res.json(vehicle)
}
