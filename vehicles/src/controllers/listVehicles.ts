import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Rental } from "../entity/Rental";
import { Vehicle } from "../entity/Vehicle";;
import { Tenant } from "../entity/Tenant";
import { User } from "../entity/User";
import { count } from "node:console";

export const get = (_req: Request, res: Response) => {
    res.end("Vehicles Service");
}

//get All vehicles
export async function getVehicles(req: Request, res: Response) {
    
    const limit=Number(req.query.limit || "12")
    const page=Number(req.query.page || "0")

    console.log(req.query);

    var vehicles:any = await getManager()
    .createQueryBuilder()
    .select()
    .from(Vehicle,"vehicle")
    .take(limit)
    .skip(limit*page)
    .getRawMany()

    for(var i=0;i<vehicles.length;i++){
        const rental = await Rental.findOne({idVehicle:vehicles[i].idVehicle,rentalstate:"active"});
        if (rental){  
            const vehicle=await Vehicle.findOneOrFail(vehicles[i])
            const tenant = await Tenant.findOneOrFail(rental.idTenant)
            const user= await User.findOneOrFail(tenant.idUser)
            vehicles[i]=Object.assign(vehicle,tenant,user)
       }
    }
    let nbVehicles=await Vehicle.count()
    let nbPages=Math.round(nbVehicles/limit)
    res.status(200)
    res.json({
        nbVehicles:nbVehicles,
        nbPages:nbPages,
        listVehicles:vehicles
    })
}


