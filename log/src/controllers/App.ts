import { Request, Response } from "express";
import {Application} from "../entity/Application";


export async function getApps(_req: Request, res: Response) {
    const apps = await Application.find();
    res.json(apps)
}

export const addApp = async (req: Request, res: Response) => {
    const app = Application.create({
     nomApp: req.body.nom,
     tauxUtilisation: req.body.taux 
    })
    await app.save()
    res.send(app)
}

export const updateApp = async (req: Request, res: Response) => {
  const id = parseInt(req.params.appId);
  const { nom, taux } = req.body;

  try {
    const app = await Application.findOneOrFail({ id });

    app.nomApp = nom || app.nomApp;
    app.tauxUtilisation = taux || app.tauxUtilisation;

    await app.save();

    return res.status(200).json(app);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteApp = async (req: Request, res: Response) => {
    const id = parseInt(req.params.appId);
    try {
      const app = await Application.findOneOrFail({ id });
      await app.remove();
      return res.status(204).send({ message : "Application deleted successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
}

export const getApp = async (req: Request, res: Response) => {
    const idApp = parseInt(req.params.appId);
    

    try {
        const app = await   Application.findOneOrFail({ id : idApp });
        return res.status(200).send(app);
      } catch (err) {
        console.log(req.params)
        console.log(err);
        return res.status(500).json({ error: "Something went wrongiesl" });
      }
}
