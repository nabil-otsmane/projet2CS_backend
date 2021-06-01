import { Request, Response } from "express";
import {Rental} from "../entity/Rental";
import {Tenant} from "../entity/Tenant";
 
export async function getRental( req:Request, res:Response){ //input : id user output: idRental and id Tenant
  const  tenant = await Tenant.find({
        where : {idUser : req.body.idUser}
    });
   const rental =await Rental.find({
    where : {idTenant : tenant[0].idTenant}
    });
    res.json(rental);
}
