import { Request, Response } from "express";
import {AdminTechnique} from "../entity/AdminTechnique";



export const getAdminTechnique =  (req: Request, res: Response) => {

    AdminTechnique.findOne({idAdminTech: parseInt(req.params.adminTechniqueId)})
    .then(adminTechnique => {
        res.status(200).send(adminTechnique);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "AdminTechnique non trouvé"
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}

export const addAdminTechnique = async (req: Request, res: Response) => {
    const adminTechnique = AdminTechnique.create({
        idUser: req.body.idUtilisateur,
    })

    await adminTechnique.save()
    res.status(200).send(adminTechnique)
}

export async function getAdminTechniques(_req: Request, res: Response) {
    const adminTechniques = await AdminTechnique.find();
    res.status(200).json(adminTechniques)
}

export const updateAdminTechnique = async (req: Request, res: Response) => {
    
    if(!req.body.idUtilisateur && !req.body.adresse) {
        return res.status(400).send({
            message: "Champs vides"
        });
    }

    AdminTechnique.update({idAdminTech: parseInt(req.params.adminTechniqueId)}, {
        idUser: req.body.idUtilisateur,
    })
    .then(adminTechnique => {
        res.status(200).send(adminTechnique);
    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "AdminTechnique non trouvé id " + req.params.adminTechniqueId
            });                
        }

        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });

    
}

export const deleteAdminTechnique = async (req: Request, res: Response) => {
    AdminTechnique.delete({idAdminTech: parseInt(req.params.adminTechniqueId)})
    .then(() => {
        res.status(200).send({message: "AdminTechnique supprimé avec succés!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "AdminTechnique non trouvé"
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}


