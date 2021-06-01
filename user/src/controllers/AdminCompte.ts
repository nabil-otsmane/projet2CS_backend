import { Request, Response } from "express";
import {AdminCompte} from "../entity/AdminCompte";



export const getAdminCompte =  (req: Request, res: Response) => {

    AdminCompte.findOne({idAdminAccount: parseInt(req.params.adminCompteId)})
    .then(adminCompte => {
        res.status(200).send(adminCompte);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "AdminCompte non trouvé id " + req.params.adminCompteId
            });                
        }
        return res.status(500).send({
            message: "Erreur serveur"
        });
    });
}

export const addAdminCompte = async (req: Request, res: Response) => {
    const adminCompte = AdminCompte.create({
        idUser: req.body.idUtilisateur,
    })

    await adminCompte.save()
    res.status(200).send(adminCompte)
}

export async function getAdminComptes(_req: Request, res: Response) {
    const adminComptes = await AdminCompte.find();
    res.status(200).json(adminComptes)
}

export const updateAdminCompte = async (req: Request, res: Response) => {

    AdminCompte.update({idAdminAccount: parseInt(req.params.adminCompteId)}, {
        idUser: req.body.idUtilisateur,
    })
    .then(adminCompte => {
        res.status(200).send(adminCompte);
    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "AdminCompte non trouvé id " + req.params.adminCompteId
            });                
        }

        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });

    
}

export const deleteAdminCompte = async (req: Request, res: Response) => {
    AdminCompte.delete({idAdminAccount: parseInt(req.params.adminCompteId)})
    .then(() => {
        res.status(200).send({message: "AdminCompte supprimé avec succés!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "AdminCompte non trouvé id " + req.params.adminCompteId
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}


