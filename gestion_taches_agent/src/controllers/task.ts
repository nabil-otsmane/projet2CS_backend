import { Request, Response } from "express";
import { getManager } from "typeorm";
import { read } from "node:fs";
import { Task } from "../entity/Task";

/**
 * Welcome endpoint for task management service.
 *
 * @remarks
 * This method is for service testing, it returns a welcome message.
 *
 * @param _req - The request to the service
 * @param res - The response to the request
 *
 */
export const get = (_req: Request, res: Response) => {
  res.send("Hello, this is the agent Tasks' management service.");
};

/**
 * Create agent task request.
 *
 * @param _req - The request to the create a task
 * @param res - The response to the request
 *
 */
export const addTask = async (req: Request, res: Response) => {
  try {
    const task = Task.create({
      idAgent: req.body.idAgent,
      idVehicle: req.body.idVehicle,
      description: req.body.description,
      idTaskState: req.body.idTaskState,
      idEquipment: req.body.idEquipment,
    });

    await task.save();
    return res.send(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

/**
 * Get all tasks request.
 *
 * @param _req - The request to get all tasks.
 * @param res - The response to the request.
 *
 */
export async function getTasks(_req: Request, res: Response) {
  try {
    const Tasks = await Task.find();
    console.log(Tasks);
    return res.json(Tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

/**
 * Update agent task request.
 *
 * @param _req - The request to update a task with parameter.
 * @param res - The response to the request.
 *
 */
export async function updateTask(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const task = await Task.findOneOrFail(id);
    task.idAgent = req.body.idAgent;
    task.idVehicle = req.body.idVehicle;
    task.description = req.body.description;
    task.idTaskState = req.body.idTaskState;
    task.idEquipment = req.body.idEquipment;
    await task.save();
    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

/**
 * Delete a task request.
 *
 * @param _req - The request to update a task with parameter.
 * @param res - The response to the request.
 *
 */
export async function deleteTask(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const task = await Task.findOneOrFail(id);
    await task.remove();
    return res.json({ message: "Tâche supprimée avec succès" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

/**
 * Find a agent task request by id.
 *
 * @param _req - The request to find a task with parameter (TaskID).
 * @param res - The response to the request.
 *
 */
export async function getTask(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const task = await Task.findOneOrFail(id);
    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.json({ message: "Tâche introuvable" });
  }
}

/**
 * Find all all tasks request by AgentID.
 *
 * @param _req - The request to find all tasks with parameter (AgentID).
 * @param res - The response to the request.
 *
 */
export async function getTaskByAgentId(req: Request, res: Response) {
  const id = req.query.id;
  // console.log('paramatre id = ', id);
  try {
    const tasks = await getManager()
      .createQueryBuilder(Task, "task")
      .where("task.idAgent = :id", { id: id })
      .getMany();

    return res.send(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
