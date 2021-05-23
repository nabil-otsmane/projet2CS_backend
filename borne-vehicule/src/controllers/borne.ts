import { Request, Response } from "express";
import {Borne} from "../entity/Borne";



export const getBorne =  (req: Request, res: Response) => {

    Borne.findOne({idBorne: parseInt(req.params.idBorne)})
    .then(borne => {
        res.status(200).send(borne);
    }).catch(() => {
        res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}

export const addBorne = async (req: Request, res: Response) => {
    const borne = Borne.create({
        /*nbOccupiedPlaces: req.body.nbOccupiedPlaces,
        nbTotalPlaces: req.body.nbTotalPlaces,
        nbMaintenanceAgents: req.body.nbMaintenanceAgents,
        latitude: req.body.latitude,
        longitude: req.body.longitude,*/
        city: req.body.wilaya
    })

    await borne.save()
    res.status(200).send(borne)
}

export async function getBornes(_req: Request, res: Response) {
    const bornes = await Borne.find();
    res.send(200).json(bornes)
}

export const updateBorne = async (req: Request, res: Response) => {
    
    if(!req.body.latitude || !req.body.longitude || !req.body.wilaya) {
        return res.status(400).send({
            message: "Champs Vides"
        });
    }

    Borne.update({idBorne: parseInt(req.params.idBorne)}, {
        /*nbOccupiedPlaces: req.body.nbOccupiedPlaces,
        nbTotalPlaces: req.body.nbTotalPlaces,
        nbMaintenanceAgents: req.body.nbMaintenanceAgents,
        latitude: req.body.latitude,
        longitude: req.body.longitude,*/
        city: req.body.wilaya
    })
    .then(borne => {
        return res.status(200).send(borne);
    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Borne non trouvé"
            });                
        }

        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });

    return null;
    
}

export const deleteBorne = async (req: Request, res: Response) => {
    Borne.delete({idBorne: parseInt(req.params.idBorne)})
    .then(() => {
        return res.status(200).send({message: "Borne supprimée avec succés!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Borne non trouvée id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}