import { Request, Response } from "express";
import { getManager } from "typeorm";
import { stat } from "node:fs";
import { VehiclePosition } from "../entity/VehiclePosition";
import { VehicleTracking } from "../entity/VehicleTracking";




export const get = (_req: Request, res: Response) => {
    res.end("This service is up and running !");
}


export const add_position_ByLocation = async (req: Request, res: Response) => {

    const {idRental,latitude,longitude} = req.body;
    try{
    const Vehiclepos = await VehiclePosition.findOne({idRental:idRental})

    if(!Vehiclepos){
        const position=VehiclePosition.create({
            idRental:idRental
        })
        await position.save()
        const tracking=VehicleTracking.create({
            idPosition:position.idPosition,
            latitude:latitude,
            longitude:longitude
        })
        await tracking.save()
        res.status(200).send(tracking)

    }
    else{
        const tracking=await VehicleTracking.create({
            idPosition:Vehiclepos?.idPosition,
            latitude:latitude, 
            longitude:longitude
        })
        await tracking.save()
        res.status(200).send(tracking)
    }
}catch(error){
        res.status(500).json(error)
}
}

