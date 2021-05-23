import { Request, Response } from "express";
import {Locataire} from "../entity/Locataire";



export const getLocataire =  (req: Request, res: Response) => {

    Locataire.findOne({idTenant: parseInt(req.params.locataireId)})
    .then(locataire => {
        res.status(200).send(locataire);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Locataire non trouvé"
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}

export const addLocataire = async (req: Request, res: Response) => {
    const locataire = Locataire.create({
        idUser: req.body.idUtilisateur,
        profilePicture: req.body.photoPersonnelle,
        selfie: req.body.photoPermisSelfie,
        permitPicture: req.body.permis,
        subCard: 0,
        points: 0,
        refPermit: "",
        accountState: "pending",
    })

    await locataire.save()
    res.status(200).send(locataire)
}

export async function getLocataires(_req: Request, res: Response) {
    const locataires = await Locataire.find();
    res.status(200).json(locataires)
}

export const updateLocataire = async (req: Request, res: Response) => {
    
    if(!req.body.idUtilisateur && !req.body.nom && !req.body.prenom && !req.body.adresse && !req.body.photoPersonnelle && !req.body.photoPermisSelfie && !req.body.idTypeAbonnement) {
        return res.status(400).send({
            message: "Champs vides"
        });
    }

    Locataire.update({idTenant: parseInt(req.params.locataireId)}, {
        idUser: req.body.idUtilisateur,
        profilePicture: req.body.photoPersonnelle,
        selfie: req.body.photoPermisSelfie,
        permitPicture: req.body.permis,
        accountState: req.body.state,
        subCard: req.body.card,
        points: req.body.points,
        refPermit: req.body.refPermis,
    })
    .then(locataire => {
        res.status(200).send(locataire);
    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Locataire non trouvé id " + req.params.locataireId
            });                
        }

        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });

    
}

export const deleteLocataire = async (req: Request, res: Response) => {
    Locataire.delete({idTenant: parseInt(req.params.locataireId)})
    .then(() => {
        res.status(200).send({message: "Locataire supprimé avec succés!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Locataire non trouvé id " + req.params.locataireId
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}