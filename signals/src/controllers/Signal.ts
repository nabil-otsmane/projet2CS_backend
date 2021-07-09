import { Request, Response } from "express";
import { Signal } from "../entity/Signal";
import { Vehicle } from "../entity/Vehicle";
import { Rental } from "../entity/Rental";
import { Tenant } from "../entity/Tenant";
import { User } from "../entity/User";
import { BreakdownNotification } from "../entity/BreakdownNotification";
import { Panne } from "../entity/Panne";
import { Agent } from "../entity/Agent";
import { getManager, Not } from "typeorm";
import { Borne } from "../entity/Borne";



export const getSignal = (req: Request, res: Response) => {

    Signal.findOne({ idSignal: parseInt(req.params.idSignal) })
        .then(signal => {
            res.status(200).send(signal);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
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
        sent_at: new Date,
    })
    await signal.save()
    res.status(200).send(signal)
}

export async function getSignals(_req: Request, res: Response) {
    const signals = await Signal.find();
    res.status(200).json(signals)
}


export const deleteSignal = async (req: Request, res: Response) => {
    Signal.delete({ idSignal: parseInt(req.params.idSignal) })
        .then(() => {
            res.send({ message: "Signalement supprimé avec succés!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Signalement non trouvé id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Erreur Serveur"
            });
        });

}
//update the state of signal treated=true 
export async function updateSignalsState(req: Request, res: Response) {
    const id = Number(req.query.idSignal)
    const description = String(req.query.description)
    try {
        const signal = await Signal.findOneOrFail({ idSignal: id })
        signal.treated = true,
            signal.treatmentDate = new Date()
        signal.treatmentDescription = description
        await signal.save()
        return res.status(200).json(signal)
    } catch (error) {
        console.error()
        return res.status(500).json(error)
    }
}
//
export async function validateSignal(req: Request, res: Response) {
    const idSignal = Number(req.query.idSignal)
    const idAgent = Number(req.query.idAgent)
    try {
        const signal = await Signal.findOneOrFail({ idSignal: idSignal })
        signal.validatedByAgent = idAgent,
            await signal.save()
        return res.status(200).json({ message: "data successfuly updated" })
    } catch (error) {
        console.error()
        return res.status(500).json(error)
    }
}
//get list of validate signal panne

export const getValidateSignalPannes = async (_req: Request, res: Response) => {
    try {
        var result = {}
        var signalsNotTreated = []
        var signalsTreated = []
        var index1 = 0;
        var index2 = 0
        const signals = await (await Signal.find({ signalType: "panne", validatedByAgent: Not(0) }));
        var agentSentNotif = null
        var agentTreatPanne = null
        for (var i = 0; i < signals.length; i++) {
            agentSentNotif = null
            agentTreatPanne = null
            //get panne info 
            const panneNotification = await BreakdownNotification.findOneOrFail({ idSignal: signals[i].idSignal });
            const panne = await Panne.findOneOrFail({ idPanne: panneNotification.idPanne });
            //get Agents info 
            if (panne.idAgentSentNotif != null)
                agentSentNotif = await Agent.findOneOrFail({ idAgent: panne.idAgentSentNotif });
            if (panne.idAgentTreatPanne != null)
                agentTreatPanne = await Agent.findOneOrFail({ idAgent: panne.idAgentTreatPanne });
            //get vehicle info 
            const vehicle = await Vehicle.findOneOrFail({ idVehicle: signals[i].idVehicle });
            const rental = await Rental.find({ idVehicle: signals[i].idVehicle });
            const tenant = await Tenant.findOneOrFail({ idTenant: rental[rental.length - 1].idTenant });
            const borneDepart = await Borne.findOneOrFail({ idBorne: rental[rental.length - 1].iddepartborne });
            const borneDest = await Borne.findOneOrFail({ idBorne: rental[rental.length - 1].iddestborne });
            const user = await User.findOneOrFail({ idUser: tenant.idUser });


            if (signals[i].treated) {
                signalsTreated[index1] = Object.assign(signals[i], vehicle, rental[rental.length - 1], user, { depatBorne: borneDepart.city, destBorne: borneDest.city }, panne, { agentSentNotif: agentSentNotif }, { agentTreatPanne: agentTreatPanne })
                index1++
            } else {
                signalsNotTreated[index2] = Object.assign(signals[i], vehicle, rental[rental.length - 1], user, { depatBorne: borneDepart.city, destBorne: borneDest.city }, panne, { agentSentNotif: agentSentNotif }, { agentTreatPanne: agentTreatPanne })
                index2++
            }
        }
        result = {
            signlasTreated: signalsTreated,
            signalsNotTreated: signalsNotTreated
        }
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)

    }
}


//getSignals panne 
export const getSignalPannesInformation = async (_req: Request, res: Response) => {
    try {
        var result = {}
        var signalsNotTreated = []
        var signalsTreated = []
        var index1 = 0;
        var index2 = 0
        const signals = await Signal.find({ signalType: "panne", validatedByAgent: 0 });
        var agentSentNotif = null
        var agentTreatPanne = null
        for (var i = 0; i < signals.length; i++) {
            agentSentNotif = null
            agentTreatPanne = null
            //get panne info 
            const panneNotification = await BreakdownNotification.findOneOrFail({ idSignal: signals[i].idSignal });
            const panne = await Panne.findOneOrFail({ idPanne: panneNotification.idPanne });
            //get Agents info 
            if (panne.idAgentSentNotif != null)
                agentSentNotif = await Agent.findOneOrFail({ idAgent: panne.idAgentSentNotif });
            if (panne.idAgentTreatPanne != null)
                agentTreatPanne = await Agent.findOneOrFail({ idAgent: panne.idAgentTreatPanne });
            //get vehicle info 
            const vehicle = await Vehicle.findOneOrFail({ idVehicle: signals[i].idVehicle });
            const rental = await Rental.find({ idVehicle: signals[i].idVehicle });
            const tenant = await Tenant.findOneOrFail({ idTenant: rental[rental.length - 1].idTenant });
            const borneDepart = await Borne.findOneOrFail({ idBorne: rental[rental.length - 1].iddepartborne });
            const borneDest = await Borne.findOneOrFail({ idBorne: rental[rental.length - 1].iddestborne });
            const user = await User.findOneOrFail({ idUser: tenant.idUser });


            if (signals[i].treated) {
                signalsTreated[index1] = Object.assign(signals[i], vehicle, rental[rental.length - 1], user, { depatBorne: borneDepart.city, destBorne: borneDest.city }, panne, { agentSentNotif: agentSentNotif }, { agentTreatPanne: agentTreatPanne })
                index1++
            } else {
                signalsNotTreated[index2] = Object.assign(signals[i], vehicle, rental[rental.length - 1], user, { depatBorne: borneDepart.city, destBorne: borneDest.city }, panne, { agentSentNotif: agentSentNotif }, { agentTreatPanne: agentTreatPanne })
                index2++
            }
        }
        result = {
            signlasTreated: signalsTreated,
            signalsNotTreated: signalsNotTreated
        }
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)

    }
}

export const getSignaTheftlInformation = async (_req: Request, res: Response) => {
    try {
        var result = {}
        var signalsNotTreated = []
        var signalsTreated = []
        var index1 = 0;
        var index2 = 0
        const signals = await Signal.find({ signalType: "theft", validatedByAgent: 0 });
        for (var i = 0; i < signals.length; i++) {

            const vehicle = await Vehicle.findOneOrFail({ idVehicle: signals[i].idVehicle });
            const rental = await Rental.find({ idVehicle: signals[i].idVehicle });
            const tenant = await Tenant.findOneOrFail({ idTenant: rental[rental.length - 1].idTenant });
            const borneDepart = await Borne.findOneOrFail({ idBorne: rental[rental.length - 1].iddepartborne });
            const borneDest = await Borne.findOneOrFail({ idBorne: rental[rental.length - 1].iddestborne });
            const user = await User.findOneOrFail({ idUser: tenant.idUser });

            if (signals[i].treated) {
                signalsTreated[index1] = Object.assign(signals[i], vehicle, rental[rental.length - 1], user, { depatBorne: borneDepart.city, destBorne: borneDest.city })
                index1++
            } else {
                signalsNotTreated[index2] = Object.assign(signals[i], vehicle, rental[rental.length - 1], user, { depatBorne: borneDepart.city, destBorne: borneDest.city })
                index2++
            }
        }
        result = {
            signlasTreated: signalsTreated,
            signalsNotTreated: signalsNotTreated
        }
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}



