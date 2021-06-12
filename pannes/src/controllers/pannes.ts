import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Rental } from "../entity/Rental";
import { Vehicle } from "../entity/Vehicle";
import { Panne } from "../entity/Panne";
import { VehicleState } from "../entity/VehicleState";
import { stat } from "node:fs";


export const get = (_req: Request, res: Response) => {
    res.end("Pannes service is up and running !");
}

//get All pannes
export async function getPannes(_req: Request, res: Response) {
    try {
      const pannes = await Panne.find();
      console.log(pannes);
      return res.json(pannes);
    } 
    catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
}


//get panne by id
export async function getPanneById(req: Request, res: Response) {
    const idPanne = Number(req.params.idPanne);
    try {
      const panne = await Panne.findOneOrFail({ idPanne:idPanne });
      return res.send(panne);
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: "Panne introuvable" });
    }
}


//add new panne
export const addPanne = async (req: Request, res: Response) => {
    const { dateNotifPanne,idAgentSentNotif, state, idVehicle, description, severityLevel } = req.body;
    try {
      const panne = Panne.create({
        dateNotifPanne,
        idAgentSentNotif,
        state,
        idVehicle,
        description,
        severityLevel
      });
  
      await panne.save();
      return res.send(panne);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
};

//delete panne
export async function deletePanne(req: Request, res: Response) {
  const idPanne = Number(req.params.idPanne);
  const msg = { message: "Panne supprimée avec succès" };
  try {
    const panne = await Panne.findOneOrFail({ idPanne });
    await panne.remove();
    return res.status(204).json(msg);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: " Un problème s'est produit .." });
  }
}


//update panne
export async function updatePanne(req: Request, res: Response) {
    const idPanne = Number(req.params.idPanne);
    const { dateNotifPanne,idAgentSentNotif, state, idVehicle, description, severityLevel } = req.body;
  
    try {
      const panne = await Panne.findOneOrFail({ idPanne });
  
      panne.dateNotifPanne = dateNotifPanne;
      panne.idAgentSentNotif = idAgentSentNotif;
      panne.state = state
      panne.idVehicle=idVehicle;
      panne.description=description;
      panne.severityLevel=severityLevel
  
      await panne.save();
  
      return res.json(panne);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Un problème s'est produit .." });
    }
  }


//Automatically detect vehicle breakdowns by checking the technical state of each vehicle(according to the data retrieved from the tablet)
//and automatically insert breakdowns into the database ("Pannes" table)
export async function detectPannes(req:Request,res:Response){

    const { batteryCharge, fuelLevel, engineTemp, brakeFuild, oilPressure,idVehicle} = req.body;
  
    try {
        const rental=await Rental.findOneOrFail({idVehicle:idVehicle,rentalstate:"active"})
        const PanneState="received";
        let detection=false;

            if (batteryCharge > 15.5 || batteryCharge < 12.6 ){
                detection=true
                var description=""
                if(batteryCharge > 15.5){
                    description="La charge de la batterie est élevée"
                }
                else if(batteryCharge<12.6){
                    description="La charge de la batterie est faible"
                }
                const panne = Panne.create({
                    state :PanneState,
                    description : description,
                    idVehicle:idVehicle
                });
                await panne.save();
            }

            if(fuelLevel < 56){
                detection=true
                const panne = Panne.create({
                    state :PanneState,
                    description :"Le niveau de carburant du véhicule est bas",
                    idVehicle:idVehicle
                });
                await panne.save();
            }

            if(engineTemp > 110){
                detection=true
                const panne = Panne.create({
                    state :PanneState,
                    description :"La température du moteur est élevée",
                    idVehicle:idVehicle
                });
                await panne.save();

            }

            if(brakeFuild < 2){
                detection=true
                const panne = Panne.create({
                    state :PanneState,
                    description :"Le niveau de liquide de frein est bas",
                    idVehicle:idVehicle
                });
                await panne.save();
            }

            if (oilPressure>80 || oilPressure<5 ){
                detection=true
                var description=""
                if(oilPressure > 80 ){
                    description="La charge de pression d'huile est élevée"
                }
                else if(oilPressure < 5){
                    description="La charge de pression d'huile est faible"
                }
                const panne = Panne.create({
                    state :PanneState,
                    description : description,
                    idVehicle:idVehicle
                });
                await panne.save();
            }
        if (detection == true){
               return res.status(200).json({
                message: "de nouvelles pannes sont détectées dans ce véhicule"
        })}
        else {
                return res.status(200).json({
                message: "pas de pannes "
            })
        }        
    }
    catch(err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

