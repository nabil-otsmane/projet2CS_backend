import { Request, Response } from "express";
import { Double } from "typeorm";
import {Rental} from "../entity/Rental";
import {Vehicle} from "../entity/Vehicle";






export const get =  (_req: Request, res: Response) => {
    const date = Date()
    res.end("Pricing Service. " + date);
}

export async function getPricingPerDay(_req: Request, res: Response) {
    const id=_req.params.id;
    const rental = await Rental.findOne(id);
    
    if(rental){
        const vehicle = await Vehicle.findOne(rental.idVehicle);
        const unitPricePDay= vehicle?.unitPricePerDay ;
        const unitPricePerDay= Number(unitPricePDay);
        console.log(unitPricePerDay);
       const date2 =rental.plannedRestitutionDate;
      const date1=rental.rentalDate;
      
       const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
        
         const tarif=unitPricePerDay*diffDays;
         console.log(tarif);
        res.json(tarif);
        //res.json({ msg: "Post Not Found" });
    }
    else{
        res.json({ msg: "Post Not Found" });
    }
    
}




export async function getPenalitiesPerDay(_req: Request, res: Response) {
    const id=_req.params.id;
    const rental = await Rental.findOne(id);
    
    if(rental){
        const vehicle = await Vehicle.findOne(rental.idVehicle);
        const unitPricePDay= vehicle?.unitPricePerDay ;
        const unitPricePerDay= Number(unitPricePDay);
        console.log(unitPricePerDay);
       const date2 =rental.rentalDate;
      const date1=rental.plannedRestitutionDate;
      
       const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffDays);
        
         const tarif=unitPricePerDay*diffDays;
         console.log(tarif);
        res.json(tarif);
        //res.json({ msg: "Post Not Found" });
    }
    else{
        res.json({ msg: "Post Not Found" });
    }
    
}

