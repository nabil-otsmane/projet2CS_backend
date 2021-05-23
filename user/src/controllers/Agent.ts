import { Request, Response } from "express";
import {Agent} from "../entity/Agent";



export const getAgent =  (req: Request, res: Response) => {

    Agent.findOne({idAgent: parseInt(req.params.agentId)})
    .then(agent => {
        res.status(200).send(agent);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Agent not found with id " + req.params.agenttId
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}

export const addAgent = async (req: Request, res: Response) => {
    const agent = Agent.create({
        idUser: req.body.idUtilisateur,
        personalPhoto: req.body.photo,
        refPermis: req.body.permis
    })

    await agent.save()
    res.status(200).send(agent)
}

export async function getAgents(_req: Request, res: Response) {
    const agents = await Agent.find();
    res.status(200).json(agents)
}

export const updateAgent = async (req: Request, res: Response) => {
    
    if(!req.body.idUtilisateur && !req.body.nom && !req.body.prenom && !req.body.adresse && !req.body.photo) {
        return res.status(400).send({
            message: "Champs vides"
        });
    }

    Agent.update({idAgent: parseInt(req.params.agentId)}, {
        idUser: req.body.idUtilisateur,
        personalPhoto: req.body.photo,
        refPermis: req.body.permis
    })
    .then(agent => {
        res.status(200).send(agent);
    }).catch(err => {

        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Agent non trouvé id " + req.params.agentId
            });                
        }

        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });

    
}

export const deleteAgent = async (req: Request, res: Response) => {
    Agent.delete({idAgent: parseInt(req.params.agentId)})
    .then(() => {
        res.status(200).send({message: "Agent supprimé avec succés"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Agent non trouvé id " + req.params.agentId
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}


