import { Router } from "express";
import {
  addATNotif,
  deleteATNotif,
  getATNotif,
  getATNotifs,
  updateATNotif,
} from "../controllers/agentTokenNotif";
import {
  addTaskNotif,
  getTaskNotif,
  markAsRead,
  deleteTaskNotif,
  get,
} from "../controllers/taskNotification";
import { AgentTokenNotif } from "../entity/AgentTokenNotif";
let FCM = require("fcm-node");

const router = Router();

// Task notifications

router.get("/", get);

router.get("/taskNotif", getTaskNotif);

router.post("/taskNotif", addTaskNotif);

router.put("/taskNotif/:id", markAsRead);

router.delete("/taskNotif/:id", deleteTaskNotif);

// AgentToken Notification

router.get("/ATNotif", getATNotifs);

router.post("/ATNotif", addATNotif);

router.put("/ATNotif/", updateATNotif);

router.delete("/ATNotif/:id", deleteATNotif);

router.get("/ATNotif/:id", getATNotif);

// FCM Route

const SERVER_KEY =
  "AAAASweisnY:APA91bEoxK-8mSVbQWBai4_fO7Hn9wcS2R1UCcoMJXboxLKiGAdmj5H2Le7hto97F5s56l6zxSULPwrHinlHQdyw47Cda1WMiAKGG09pD_oNi5E3TakZW1BuySY_Jjy-8J3n8N7_KHQ6";

router.post("/fcm", async (req, res, next) => {
  try {
    const idAgent = req.body.idAgent;
    let fcm = new FCM(SERVER_KEY);
    const ATNotif = await AgentTokenNotif.findOneOrFail({
      where: { idAgent },
    });
    console.log(ATNotif);

    let message = {
      to: ATNotif.token,
      notification: {
        title: req.body.title,
        body: req.body.body,
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY",
      },
    };

    fcm.send(message, (err: any, response: any) => {
      if (err) {
        next(err);
      } else {
        res.json(response);
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
