import { Request, Response } from "express";
import { AgentTokenNotif } from "../entity/AgentTokenNotif";

export const addATNotif = async (req: Request, res: Response) => {
  const { idAgent, token } = req.body;
  try {
    let ATNotif = await AgentTokenNotif.findOne({
      where: { idAgent },
    });

    if (ATNotif) {
      ATNotif.token = token;
    } else {
      ATNotif = AgentTokenNotif.create({
        idAgent,
        token,
      });
    }
    await ATNotif.save();
    return res.send(ATNotif);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getATNotifs = async (_req: Request, res: Response) => {
  try {
    const ATNotif = await AgentTokenNotif.find();
    return res.json(ATNotif);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getATNotif = async (req: Request, res: Response) => {
  const idAgent = req.params.id;

  try {
    const ATNotif = await AgentTokenNotif.findOneOrFail({
      where: { idAgent },
    });
    return res.json(ATNotif);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const updateATNotif = async (req: Request, res: Response) => {
  const { idAgent, token } = req.body;
  try {
    const ATNotif = await AgentTokenNotif.findOneOrFail({
      where: { idAgent },
    });

    // set notification as read
    ATNotif.token = token;

    // save notification
    await ATNotif.save();

    return res.json(ATNotif);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteATNotif = async (req: Request, res: Response) => {
  try {
    const ATNotifID = req.params.id;
    const ATNotif = await AgentTokenNotif.findOneOrFail({
      id: Number(ATNotifID),
    });

    await ATNotif.remove();

    return res.json({
      message: "Notification deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
