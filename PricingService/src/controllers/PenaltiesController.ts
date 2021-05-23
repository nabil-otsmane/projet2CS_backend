import { Request, Response } from "express";
import { RentalPenalty } from "../entity/RentalPenalty";
import { Penalty } from "../entity/Penalty";

//get pricing for all the penalties related to a rental
export async function getPenalties(_req: Request, res: Response) {
    const idRental=_req.params.id;
    if(idRental){
        const rentalPenalties = await RentalPenalty.find({
            where : {idRental : idRental}
        });
        
        if(rentalPenalties[0]){
            var penaltiesPricing = 0;
            var penalty;
            for(var i=0; i<rentalPenalties.length;i++){
                penalty = await Penalty.findOne(rentalPenalties[i].idPenalty);
                penaltiesPricing += Number(penalty?.penaltyTotal);
            }
            res.json({
                price: penaltiesPricing,
                msg: "Total pricing of penalties"
            });
        }else{
            res.json({ 
                price: 0,
                msg: "No penalties found"
            });
        }
    } 
}