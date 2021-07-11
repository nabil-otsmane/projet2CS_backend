import { Request, Response } from "express";
import { TaskNotification } from "../entity/TaskNotification";

export const get = (_req: Request, res: Response) => {
  res.send("<center><h1> Welcome To Task Notifications 🤝🔔 </h1></center>");
};

export const addTaskNotif = async (req: Request, res: Response) => {
  const { read, idTask } = req.body;
  try {
    const taskNotif = TaskNotification.create({
      read: read || false,
      idTask,
    });

    await taskNotif.save();
    return res.send(taskNotif);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getTaskNotif = async (_req: Request, res: Response) => {
  try {
    const taskNotif = await TaskNotification.find();
    return res.json(taskNotif);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const taskNotifID = req.params.id;
    const taskNotif = await TaskNotification.findOneOrFail({
      id: Number(taskNotifID),
    });

    // set notification as read
    taskNotif.read = true;

    // save notification
    await taskNotif.save();

    return res.json(taskNotif);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteTaskNotif = async (req: Request, res: Response) => {
  try {
    const taskNotifID = req.params.id;
    const taskNotif = await TaskNotification.findOneOrFail({
      id: Number(taskNotifID),
    });

    await taskNotif.remove();

    return res.json({
      message: "Notification deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
