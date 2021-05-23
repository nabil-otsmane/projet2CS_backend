import { Request, Response } from "express";
import {Vehicule} from "../entity/Vehicule";


export const getVehicule =  (req: Request, res: Response) => {

    Vehicule.findOne({idVehicle: parseInt(req.params.idVehicule)})
    .then((vehicule: any) => {
        res.status(200).send(vehicule);
    }).catch(() => {
        res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}

export const addVehicule = async (req: Request, res: Response) => {
    const vehicule = Vehicule.create({
        // There are somme fields missing
        unitpriceperhour: req.body.unitpriceperhour,
        unitpriceperday: req.body.unitpriceperday,
        vehiculetype: req.body.vehiculetype,
        vehiculebrand: req.body.vehiculebrand,
        vehiclemodel: req.body.vehiclemodel,
        availability: req.body.availability,
        image: req.body.image
    })

    await vehicule.save()
    res.status(200).send(vehicule)
}

export async function getVehicules(_req: Request, res: Response) {
    const vehicules = await Vehicule.find();
    res.status(200).json(vehicules)
}

export const updateVehicule = async (req: Request, res: Response) => {
    
    if(!req.body.unitpriceperhour || !req.body.unitpriceperday || !req.body.vehiculetype || !req.body.vehiculebrand || !req.body.vehiclemodel || !req.body.availability || !req.body.image) {
        return res.status(400).send({
            message: "Champs Vides"
        });
    }

    Vehicule.update({idVehicle: parseInt(req.params.idVehicule)}, {
        unitpriceperhour: req.body.unitpriceperhour,
        unitpriceperday: req.body.unitpriceperday,
        vehiculetype: req.body.vehiculetype,
        vehiculebrand: req.body.vehiculebrand,
        vehiclemodel: req.body.vehiclemodel,
        availability: req.body.availability,
        image: req.body.image
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