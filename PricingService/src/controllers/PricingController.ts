import { Request, Response } from "express";
import {Rental} from "../entity/Rental";
import {Vehicle} from "../entity/Vehicle";
import {RentalPenalty} from "../entity/RentalPenalty";
import { Penalty } from "../entity/Penalty";






export async function get(_req: Request, res: Response) {
    res.end("Pricing Service")
}


// Tarification par Heures


// Returns the pricing of the rental per hour
export async function getPricingPerHour(_req: Request, res: Response) {
    const idRental=_req.params.id;
    if(idRental){
        const rental = await Rental.findOne(idRental);
        if(rental){
            //turning the date and time into one object of type Date
            const rentalDate = new Date(
                (rental.rentaldate!!).toUTCString()
                                     .replace("22:00:00", 
                                      rental?.rentaltime!!));
            const vehicle = await Vehicle.findOne(rental.idVehicle);
            //in case the vehicle is deleted the rental is not, but we cannot
            //use this api
            if(vehicle){
                var rentalDurationInHours;

                const restitutionDate = new Date(
                    (rental.restitutionDate!!).toUTCString()
                                              .replace("22:00:00", 
                                               rental?.restitutionTime!!));
                rentalDurationInHours = getDifferenceInHours(rentalDate, 
                    restitutionDate)
            
                if(Number(rentalDurationInHours)>0){
                    res.json({
                        price : calculateBasePrice(
                                    Number(vehicle.unitpriceperhour),
                                    Number(rentalDurationInHours)
                                ),
                        msg: "success"
                    });
                }else{
                    res.json({
                        msg: "There has been a mistake."
                    })
                }
            }else{
                //message to check if a bill was made
                res.json({
                    msg: "The vehicle concerned is not available, \
check the bill history"
                })
            }
        }else{
            res.json({ 
                msg: "Wrong id, the rental doesn't exist!" 
            });
        }
    }else{
        res.json({ 
            msg: "You have provided to provide a parameter" 
        });
    }
    
}

export const getDifferenceInHours = (beginingDate:Date, endDate:Date) => {
    return Math.ceil((endDate.getTime() - beginingDate.getTime())/(3600000))
}

export const calculateBasePrice = (duration:number, unitPrice:number) => {
    return duration*unitPrice;
}

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
                rentalPenalties:rentalPenalties,
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