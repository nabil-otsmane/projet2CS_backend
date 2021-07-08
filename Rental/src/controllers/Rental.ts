import { json, Request, Response } from "express";
import {Rental} from "../entity/Rental";
import {Tenant} from "../entity/Tenant";
import { Vehicle } from "../entity/Vehicle";
 
export async function getRental( req:Request, res:Response){ //input : id user output: idRental and id Tenant
  const  tenant = await Tenant.find({
        where : {idUser : req.body.idUser}
    });
   const rental =await Rental.find({
    where : {idTenant : tenant[0].idTenant}
    });
    res.json(rental);
}


export async function endRental(req:Request, res:Response){
  const vehicle = await Vehicle.findOne(req.params.idVehicle)
  if(vehicle){
    if(vehicle.availibility.toLocaleLowerCase()=='allocated'){
      const rental = await Rental.findOne({
        where : [{
          idVehicle:req.params.idVehicle
        },
        {
          rentalstate:'active'
        }]
      })

      if(rental){
          rental.rentalstate='paid'
          var saveRental = await Rental.save(rental)

          if(saveRental){
            vehicle.availibility='available'
            var saveVehicle = await Vehicle.save(vehicle)
            if(saveVehicle){
                res.send("success")
            }else{
              res.send("Error saving vehicle state")
            }
          }else{
            res.send("Error saving rental state")
          }

      }else{
        res.send("No active rental associated with this vehicle")
      }
    }else{
      res.send("Vehicle is " + vehicle.availibility)
    }
  }else{
    res.send("Vehicle doesn't exist")
  }
}
