import { Request, Response } from "express";
import { Rental} from "../entity/Rental";
import { Vehicle} from "../entity/Vehicle";
import { Tenant} from "../entity/Tenant";
import { Bill} from "../entity/Bill";

// Function for testing server response
export async function get(_req: Request, res: Response) {
    res.end("RentalByUserId Service")
}
export async function getRental(_req:Request , res : Response){
    const idUser = _req.params.idUser;
    const tenant= await Tenant.find({
        where : {idUser : idUser}
    });
   const len = tenant.length;
   console.log(len);
    if(tenant){
        const  rental= await Rental.find({
            where : {idTenant : tenant[1].idTenant}
        });

        const  vehicle= await Vehicle.find({
            where : {idVehicle : rental[0].idVehicle}
        });

        const bill = await Bill.find({
            where : {idRental : rental[0].idRental}
        })
        res.json({
            rental: rental ,
            vehicle: vehicle ,
            bill: bill
        });
     //  res.json(rental);

        console.log("location");
    }
    else{
        res.status(400).json({ 
            msg: "Tenant Not found !" 
        });
    }
  //  res.end("RentalByUserId Service");
    //res.json(rental);
}


