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
    
    const limit=Number(req.query.limit || "8")
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
        const rental = await Rental.findOne({idVehicle:vehicles[i].idVehicle});
        if (rental){  
            let toReturn= await getManager()
            .createQueryBuilder()
            .select("vehicle.*")
            .addSelect("user.firstName as firstname")
            .addSelect("user.lastName as lastname")
            .addSelect("rental.rentaldate as rentalDate ")
            .addSelect("rental.idRental as idRental ")
            .addSelect("rental.plannedrestitutiondate as availibleDate ")
            .addSelect("rental.idRental as idRental ")
            .from(Vehicle, "vehicle")
            .innerJoin(Rental, "rental", "vehicle.idVehicle=rental.idVehicle")
            .innerJoin(Tenant, "tenant", "rental.idTenant=tenant.idTenant")
            .innerJoin(User, "user", "tenant.idUser=user.idUser")
            .getRawOne()
             vehicles[i]=toReturn
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


