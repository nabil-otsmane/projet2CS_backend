import { Request, Response } from "express";
import {Signal} from "../entity/Signal";


export const getSignal =  (req: Request, res: Response) => {

    Signal.findOne({idSignal: parseInt(req.params.idSignal)})
    .then(signal => {
        res.status(200).send(signal);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Signalement non trouvé"
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}

export const addSignal = async (req: Request, res: Response) => {
    const signal = Signal.create({
        signalType: req.body.signalType,
        message: req.body.message,
        idUserSource: req.body.idUserSource,
        sourceType: req.body.sourceType,
        idVehicle: req.body.idVehicle,
        sent_at: req.body.sent_at,

        
    })

    await signal.save()
    res.status(200).send(signal)
}

export async function getSignals(_req: Request, res: Response) {
    const signals = await Signal.find();
    res.status(200).json(signals)
}


export const deleteSignal = async (req: Request, res: Response) => {
    Signal.delete({idSignal: parseInt(req.params.idSignal)})
    .then(() => {
        res.send({message: "Signalement supprimé avec succés!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Signalement non trouvé id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Erreur Serveur"
        });
    });
}


