import { Request, Response } from "express";
import {Rental,rental_status_enum} from "../entity/Rental";
import { User } from "../entity/User";
import { Signal } from "../entity/Signal";




export const get =  (_req: Request, res: Response) => {
    res.end("Hello there this is my new service.");
}
//CREATE Signal 
export const createSignalRemorque = async (req: Request, res: Response) => {
    try{
    const remorque= Boolean(req.query.remorque)
    const idVehicle=Number(req.query.idVehicle)
    
    if(remorque==true){
        var currdatetime = new Date();
        const signal = Signal.create({
            signalType:"theft",
            message:"Attention la véhicule est remorquée",
            sourceType:"Auto",
            idVehicle:idVehicle,
            treated:false,
            sent_at:currdatetime
        })

        await signal.save()
       // res.send(signal)
        return res.status(200).json(signal)
}
 else {
    res.send({message:"succ"})
    return res.status(200)
}
}catch(err){
    console.error()
    return res.status(500).json(err)
}
}

export const createSignalTime = async (req: Request, res: Response) => {
    try{
        const id=Number(req.query.idVehicle)
        var currdatetime = new Date();
        const rental= await Rental.findOneOrFail({idVehicle:id,rentalstate:"active"})
        const restitutionDate = new Date(
            (rental.restitutionDate!!).toUTCString()
                                      .replace("00:00:00", 
                                       rental?.restitutionTime.toString!!));

        if(rental.restitutionDate.getDate() < currdatetime.getDate()||
    
        (rental.restitutionDate.getDate() == currdatetime.getDate() &&(currdatetime.getHours()- restitutionDate.getHours())> 6 )){
       
            const signal = Signal.create({
                signalType:"theft",
                message:"Attention la date de location a été dépassée",
                sourceType:"Auto",
                idVehicle:id,
                treated:false,
                sent_at:currdatetime
            })
    
            await signal.save()
           // res.send(signal)
            return res.status(200).json(signal)
    
    }
    else {
        res.send({message:"succ"})
        return res.status(200)
    }
    }catch(err){
        console.error()
        return res.status(500).json(err)
    }
}


