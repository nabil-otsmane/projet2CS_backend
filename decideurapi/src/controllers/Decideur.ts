import { Request, Response } from "express";
import {Decideur} from "../entity/Decideur";



export const getDecideur =  (req: Request, res: Response) => {

    Decideur.findOne({idDecideur: parseInt(req.params.decideurId)})
    .then(decideur => {
        if(!decideur) {
            return res.status(404).send({
                message: "Decideur non trouvé id " + req.params.utilisateurId
            });            
        }
        res.send(decideur);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Decideur not found with id " + req.params.decideurtId
            });                
        }
        return res.status(500).send({
            message: "Erreur dans la récupération du decideur id " + req.params.decideurId
        });
    });
}

export const addDecideur = async (req: Request, res: Response) => {
    const decideur = Decideur.create({
        idUtilisateur: req.body.idUtilisateur,
        adresse: req.body.adresse,
    })

    await decideur.save()
    res.send(decideur)
}

export async function getDecideurs(_req: Request, res: Response) {
    const decideurs = await Decideur.find();
    res.json(decideurs)
}

export const updateDecideur = async (req: Request, res: Response) => {
    
    if(!req.body.idUtilisateur && !req.body.adresse) {
        return res.status(400).send({
            message: "Decideur content ne doit pas étre vide"
        });
    }

    Decideur.update({idDecideur: parseInt(req.params.decideurId)}, {
        idUtilisateur: req.body.idUtilisateur,
        adresse: req.body.adresse,
    })
    .then(decideur => {
        if(!decideur) {
            return res.status(404).send({
                message: "Decideur non trouvé id " + req.params.decideurId
            });
        }
        res.send(decideur);
    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Decideur non trouvé id " + req.params.decideurId
            });                
        }

        return res.status(500).send({
            message: "Erreur dans la modification du Decideur id " + req.params.decideurId
        });
    });

    
}

export const deleteDecideur = async (req: Request, res: Response) => {
    Decideur.delete({idDecideur: parseInt(req.params.decideurId)})
    .then(decideur => {
        if(!decideur) {
            return res.status(404).send({
                message: "Decideur non trouvé id " + req.params.decideurId
            });
        }
        res.send({message: "Decideur supprimé avec succés!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Decideur non trouvé id " + req.params.decideurId
            });                
        }
        return res.status(500).send({
            message: "Supression non effectuée id " + req.params.decideurId
        });
    });
}


