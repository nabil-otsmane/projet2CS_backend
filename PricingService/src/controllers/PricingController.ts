import { Request, Response } from "express";
import { Rental} from "../entity/Rental";
import { Vehicle} from "../entity/Vehicle";


// Function for testing server response
export async function get(_req: Request, res: Response) {
    res.end("Pricing Service")
}

// Returns the pricing of the rental per Day
export async function getPricingPerDay(_req: Request, res: Response) {
    const idRental=_req.params.id;
    const rental = await Rental.findOne(idRental);
    
    if(rental){
        const vehicle = await Vehicle.findOne(rental.idVehicle);
        if(vehicle){
            const unitPricePerDay= Number(vehicle.unitpriceperday);
            const plannedRestitutionDate =rental.plannedrestitutiondate;
            const rentalDate=rental.rentaldate;

            const differenceInDays = getDifferenceInDays(
                                        rentalDate,plannedRestitutionDate);
            
            const pricingPerDay = calculateBasePrice(
                                        unitPricePerDay,differenceInDays);
            res.json({
                price: pricingPerDay,
                msg: "success"
            });
        }else{
            res.json({
                msg: "The vehicle concerned is not available, check the bill \
history"
            })
        }
    }
    else{
        res.json({ 
            msg: "Rental Not Found" 
        });
    }
    
}


// Returns the pricing of the rental per hour
export async function getPricingPerHour(_req: Request, res: Response) {
    const idRental=_req.params.id;
    if(idRental){
        const rental = await Rental.findOne(idRental);
        if(rental){
            //turning the date and time into one object of type Date
            
            const fakeRentTime = (rental.rentaldate!!).toUTCString()
                                                      .slice(17,25)
            const rentalDate = new Date(
                (rental.rentaldate!!).toUTCString()
                                     .replace(fakeRentTime, 
                                      rental.rentaltime!!));
            const vehicle = await Vehicle.findOne(rental.idVehicle);
            //in case the vehicle is deleted the rental is not, but we cannot
            //use this api
            if(vehicle){
                var rentalDurationInHours;

                const fakeRestTime = (rental.restitutionDate!!).toUTCString()
                                                               .slice(17,25)
                const restitutionDate = new Date(
                    (rental.restitutionDate!!).toUTCString()
                                              .replace(fakeRestTime, 
                                               rental.restitutionTime!!));
                                               
                rentalDurationInHours = getDifferenceInHours(rentalDate, 
                                                             restitutionDate)
            
                if(Number(rentalDurationInHours)>0){
                    res.status(200).json({
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
                res.json({
                    msg: "The vehicle concerned is not available, \
check the bill history"
                })
            }
        }else{
            res.status(400).json({ 
                msg: "Wrong id, the rental doesn't exist!" 
            });
        }
    }else{
        res.json({ 
            msg: "You have to provide a parameter" 
        });
    }
    
}

// Returns the pricing from duration and base
export async function getRealTimePricing(_req: Request, res: Response) {
    const rentalDuration = Number(_req.params.rentalDuration);
    const unitPrice = Number(_req.params.unitPrice);
    
    if(rentalDuration>0){
        res.json({
            price : calculateBasePrice(unitPrice, rentalDuration),
            msg: "success"
        });
    }else{
        res.json({
            msg: "Enter a valid duration"
        });
    }
    
}

// Getting difference in time
export const getDifferenceInDays = (beginingDate:Date, endDate:Date) => {
    return Math.ceil((endDate.getTime() - beginingDate.getTime())/(3600000*24))
}

// Getting difference in time
export const getDifferenceInHours = (beginingDate:Date, endDate:Date) => {
    return Math.ceil((endDate.getTime() - beginingDate.getTime())/(3600000))
}

export const calculateBasePrice = (duration:number, unitPrice:number) => {
    if((unitPrice>=0)&&(duration>=0)){
        return duration*unitPrice;
    }else{
        return {
            msg : "Error"
        };
    }
}