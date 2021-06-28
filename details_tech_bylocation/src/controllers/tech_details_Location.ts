import { Request, Response } from "express";
import { getManager } from "typeorm";
import { stat } from "node:fs";
import { VehicleState } from "../entity/VehicleState";
import { Vehicle } from "../entity/Vehicle";
import { Rental } from "../entity/Rental";


export const get = (_req: Request, res: Response) => {
    res.end("This service is up and running !");
}

export const add_techDetails_ByLocation = async (req: Request, res: Response) => {

    const {idRental,engineTemp,fuelLevel,oilPressure,batteryCharge,brakeFuild,speed,kilos} = req.body;

      const state= await VehicleState.findOne({idRental:idRental})
        if(!state) {
            const vehiclestate = VehicleState.create({
                idRental: req.body.idRental,
                engineTemp: req.body.engineTemp,
                fuelLevel: req.body.fuelLevel,
                oilPressure: req.body.oilPressure,
                batteryCharge: req.body.batteryCharge,
                brakeFuild: req.body.brakeFuild,
                speed:req.body.speed,
                kilos:req.body.kilos
            })
            await vehiclestate.save()
            res.status(200).send(vehiclestate)
        }
        else{
            state.engineTemp = engineTemp 
            state.fuelLevel = fuelLevel 
            state.oilPressure=oilPressure
            state.batteryCharge=batteryCharge
            state.brakeFuild=brakeFuild
            state.speed=speed
            state.kilos=kilos
            await state.save()
            res.status(200).send(state)

        }

}
export async function getVehicleInfos(req: Request, res: Response) {
    const chassis= String(req.query.chassisNumber)
    var resultat={}
    try {
        //get vehicle information
        const vehicle= await Vehicle.findOneOrFail({chassisNumber:chassis})
        //get Rental 
        const rental = await Rental.find({idVehicle:vehicle.idVehicle})
       //get vehicle stat
       const vehicleState = await VehicleState.findOneOrFail({idRental:rental[rental.length-1].idRental})

        resultat=Object.assign(vehicle,vehicleState)
        return res.status(200).json(resultat)
    } catch (error) {
        console.error()
        return res.status(500).json(error)
    }
}    


