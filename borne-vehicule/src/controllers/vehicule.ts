import { Request, Response } from "express";
import {Vehicule} from "../entity/Vehicule";


export const getVehicule =  (req: Request, res: Response) => {

    Vehicule.findOne({idVehicle: parseInt(req.params.idVehicule)})
    .then((vehicule: any) => {
        res.status(200).send(vehicule);
    }).catch(e => {
        res.status(500).send({
            message: e.message
        });
    });
}

export const addVehicule = async (req: Request, res: Response) => {
    const vehicule = Vehicule.create({
        registrationNumber: req.body.registrationNumber,
        unitPricePerHour: req.body.unitPricePerHour,
        unitPricePerDay: req.body.unitPricePerDay,
        vehicleType: req.body.vehicleType,
        vehiclebrand: req.body.vehiclebrand,
        vehiclemodel: req.body.vehiclemodel,
        fuelType: req.body.fuelType,
        idBorne: req.body.idBorne,
        vehicleColor: req.body.vehicleColor,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    })

    vehicule.save()
    .then(() => {
        res.status(200).send(vehicule)
    })
    .catch(e => {
        res.status(500).send({ message: e.message })
    })
}

export async function getVehicules(_req: Request, res: Response) {
    Vehicule.find()
    .then(vehicules => {
        res.status(200).json(vehicules)
    })
    .catch(e => {
        res.status(500).json({ message: e.message })
    })
}

export const updateVehicule = async (req: Request, res: Response) => {
    
    if(
        !req.body.registrationNumber 
        || !req.body.unitPricePerHour 
        || !req.body.unitPricePerDay 
        || !req.body.vehicleType 
        || !req.body.vehiclebrand 
        || !req.body.vehiclemodel 
        || !req.body.fuelType
        || !req.body.idBorne
        || !req.body.vehicleColor
        || !req.body.longitude
        || !req.body.latitude) {
        return res.status(400).send({
            message: "Champs Vides"
        });
    }

    Vehicule.update({idVehicle: parseInt(req.params.idVehicule)}, {
        registrationNumber: req.body.registrationNumber,
        unitPricePerHour: req.body.unitPricePerHour,
        unitPricePerDay: req.body.unitPricePerDay,
        vehicleType: req.body.vehicleType,
        vehiclebrand: req.body.vehiclebrand,
        vehiclemodel: req.body.vehiclemodel,
        fuelType: req.body.fuelType,
        idBorne: req.body.idBorne,
        vehicleColor: req.body.vehicleColor,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    })
    .then((vehicule: any) => {
        return res.status(200).send(vehicule);
    }).catch((err: { kind: string; }) => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Vehicule non trouvé"
            });                
        }

        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });

    return null;
    
}

export const deleteVehicule = async (req: Request, res: Response) => {
    Vehicule.delete({idVehicle: parseInt(req.params.idVehicule)})
    .then(() => {
        return res.status(200).send({message: "Vehicule supprimée avec succés!"});
    }).catch((err: { kind: string; name: string; }) => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Vehicule non trouvé"
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}