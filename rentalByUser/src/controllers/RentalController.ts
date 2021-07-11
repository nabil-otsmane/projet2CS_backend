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
    const idRental = _req.params.idUser;
    const rental= await Rental.find({
        where : {idRental : idRental}
    });
  
    if(rental){
      /*  const  rental= await Rental.find({
            where : {idTenant : tenant[1].idTenant},order:{plannedrestitutiondate:"DESC"}
        });*/
        const date2 =rental[0].plannedrestitutiondate;
      const date1=rental[0].rentaldate;
      
       const diffjour = Math.trunc(Math.abs(date2.getTime() - date1.getTime())/(3600000*24));
       //const difference=diffTime
      
       //if(diffTime==0){
        const heur1 =Number(rental[0].plannedrestitutiontime.substr(0,2));
        const heur2=Number(rental[0].rentaltime.substr(0,2));
       
         const diffheurmin = (heur1-heur2)*60;
         const min1 =Number(rental[0].plannedrestitutiontime.substr(3,2));
        const min2=Number(rental[0].rentaltime.substr(3,2));
       
        const diffmin=min1-min2;
        const diffheur=Math.trunc( Number(diffheurmin+diffmin)/60)
        var diffminutes=0;
        if(diffheurmin+diffmin<60){
            diffminutes=diffmin;
        }
        else{
            
            diffminutes=(diffheurmin+diffmin)-60*diffheur
            
        }
        console.log(diffheur)
      // }
        const lenren=rental.length
        const  vehicle= await Vehicle.find({
            where : {idVehicle : rental[0].idVehicle}
        });

        const bill = await Bill.find({
            where : {idRental : rental[0].idRental}
        })
        res.json({
            rental: rental[0] ,
            vehicle: vehicle[0] ,
            bill: bill[0],
            diffjour: diffjour,
            diffheur: diffheur,
            diffminutes:diffminutes
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


