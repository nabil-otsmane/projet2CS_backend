import { Request, Response } from "express";
import { getManager } from "typeorm";
import { stat } from "node:fs";
import { VehiclePosition } from "../entity/VehiclePosition";
import { VehicleTracking } from "../entity/VehicleTracking";
import { Rental } from "../entity/Rental";
import { Vehicle } from "../entity/Vehicle";





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
export async function updateVehiclePosition(req: Request, res: Response){
    const idVehicle=Number(req.query.idVehicle)
    console.log(idVehicle) 
    try{
    var vehicle= await Vehicle.findOneOrFail({idVehicle:idVehicle})   
    const rental = await Rental.find({idVehicle:idVehicle,rentalstate:"active"})
    console.log(rental)
    const vehiclePosition= await VehiclePosition.find({idRental:rental[rental.length-1].idRental})
  
    const vehicleTracking= await VehicleTracking.find({idPosition:vehiclePosition[vehiclePosition.length-1].idPosition})
    console.log(vehiclePosition[vehiclePosition.length-1].idPosition)
    vehicle.idBorne=rental[rental.length-1].iddestborne
    vehicle.latitude=vehicleTracking[vehicleTracking.length-1].latitude
    vehicle.longitude=vehicleTracking[vehicleTracking.length-1].longitude
    console.log(vehicle.latitude,vehicle.longitude)
    
    await vehicle.save()
    console.log(vehicle)
    res.status(200).json(vehicle)
    
}catch(error){
        res.status(500).json(error)
}
}
