import { Request, Response } from "express";
import {Decideur} from "../entity/Decideur";



export const getDecideur =  (req: Request, res: Response) => {

    Decideur.findOne({idDecisionMaker: parseInt(req.params.decideurId)})
    .then(decideur => {
        res.status(200).send(decideur);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Decideur non trouvé"
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}

export const addDecideur = async (req: Request, res: Response) => {
    const decideur = Decideur.create({
        idUser: req.body.idUtilisateur,
    })

    await decideur.save()
    res.status(200).send(decideur)
}

export async function getDecideurs(_req: Request, res: Response) {
    const decideurs = await Decideur.find();
    res.status(200).json(decideurs)
}

export const updateDecideur = async (req: Request, res: Response) => {
    
    if(!req.body.idUtilisateur && !req.body.adresse) {
        return res.status(400).send({
            message: "Champs vides"
        });
    }

    Decideur.update({idDecisionMaker: parseInt(req.params.decideurId)}, {
        idUser: req.body.idUtilisateur,
    })
    .then(decideur => {
        res.status(200).send(decideur);
    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Decideur non trouvé id " + req.params.decideurId
            });                
        }

        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });

    
}

export const deleteDecideur = async (req: Request, res: Response) => {
    Decideur.delete({idDecisionMaker: parseInt(req.params.decideurId)})
    .then(() => {
        res.status(200).send({message: "Decideur supprimé avec succés!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Decideur non trouvé id " + req.params.decideurId
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}


