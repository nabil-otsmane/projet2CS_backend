import { Request, Response } from "express";
import {AdminAgent} from "../entity/AdminAgent";



export const getAdminAgent =  (req: Request, res: Response) => {

    AdminAgent.findOne({idAdminAgent: parseInt(req.params.adminAgentId)})
    .then(adminAgent => {

        res.status(200).send(adminAgent);
    
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "AdminAgent not found with id " + req.params.adminAgentId
            });                
        }
        return res.status(500).send({
            message: "Erreur dans la récupération de l'AdminAgent id " + req.params.adminAgentId
        });
    });
}

export const addAdminAgent = async (req: Request, res: Response) => {
    const adminAgent = AdminAgent.create({
        idUser: req.body.idUtilisateur,
    })

    await adminAgent.save()
    res.status(200).send(adminAgent)
}

export async function getAdminAgents(_req: Request, res: Response) {
    const adminAgents = await AdminAgent.find();
    res.status(200).json(adminAgents)
}

export const updateAdminAgent = async (req: Request, res: Response) => {
    
    if(!req.body.idUtilisateur && !req.body.adresse) {
        return res.status(400).send({
            message: "Champs vides"
        });
    }

    AdminAgent.update({idAdminAgent: parseInt(req.params.adminAgentId)}, {
        idUser: req.body.idUtilisateur,
    })
    .then(adminAgent => {
        
        res.status(200).send(adminAgent);
    
    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "AdminAgent non trouvé id " + req.params.adminAgentId
            });                
        }

        return res.status(500).send({
            message: "Erreur dans la modification de l'AdminAgent id " + req.params.adminAgentId
        });
    });

    
}

export const deleteAdminAgent = async (req: Request, res: Response) => {
    AdminAgent.delete({idAdminAgent: parseInt(req.params.adminAgentId)})
    .then(() => {
        
        res.status(200).send({message: "AdminAgent supprimé avec succés!"});
    
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "AdminAgent non trouvé id " + req.params.adminAgentId
            });                
        }
        return res.status(500).send({
            message: "Erreur serveur " + req.params.adminAgentId
        });
    });
}


