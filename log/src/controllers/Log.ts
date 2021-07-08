import { Request, Response } from "express";
import {Erreur} from "../entity/Erreur";
import { Log } from "../entity/Log";


export async function getLogs(_req: Request, res: Response) {
    const log = await Log.find({ relations: ["idApp","idErreur"] });
    res.json(log);
}



export const addLog = async (req: Request, res: Response) => {
    let erreur;
    if(req.body.erreur) {
        erreur = await Erreur.save(Erreur.create({message : req.body.erreur}))
    }
    const log = Log.create({
        date: req.body.date,
        details : req.body.details,
        idApp : req.body.app,
        idErreur : erreur
    })
    await log.save()
    res.send(log)
}

export const deleteLog = async (req: Request, res: Response) => {
    const logId = parseInt(req.params.logId);
    try {
      const log = await Log.findOneOrFail({ id : logId });

      await log.remove();

      return res.status(204).json({ message: "Log record deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
}

export const getLog = async (req: Request, res: Response) => {
    const logId = parseInt(req.params.logId);

    try {
        const log = await Log.findOneOrFail({ where: {id: logId} ,  relations: ["idApp","idErreur"] });
        return res.status(200).send(log);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
      }
}


