import { Request, Response } from "express";
import { getManager } from "typeorm";
import { read } from "node:fs";
import { Task } from "../entity/Task";
import { TaskModel } from "../entity/TaskModel";

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
  res.send("Hello, this is the agent's Tasks management service.");
};

/**
 * Create agent task request.
 *
 * @param _req - The request to the create a task
 * @param res - The response to the request
 *
 */
export const addTask = async (req: Request, res: Response) => {
  const {
    idAgent,
    idVehicle,
    taskTitle,
    description,
    idTaskState,
    idTaskModel,
    assignmentDate,
    endDate,
  } = req.body;
  try {
    const taskModel = await TaskModel.findOneOrFail({ id: idTaskModel });
    const task = Task.create({
      idAgent,
      idVehicle,
      taskTitle,
      description,
      taskModel,
      idTaskState,
      assignmentDate,
      endDate,
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
    const tasks = await Task.find({
      relations: ["usedEquipments", "taskModel", "taskModel.steps"],
    });
    console.log(tasks);
    return res.json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// Update task without updating its steps
export async function updateTaskState(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const task = await Task.findOneOrFail({
      relations: ["usedEquipments", "taskModel", "taskModel.steps"],
      where: {
        uuid: id,
      }, 
    });
    task.idTaskState = req.body.idTaskState;
    await task.save();
    return res.json(task);
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
  console.log("Hello");

  try {
    const task = await Task.findOneOrFail({
      relations: ["usedEquipments", "taskModel", "taskModel.steps"],
      where: {
        uuid: id,
      },
    });

    task.idAgent = req.body.idAgent || task.idAgent;
    task.idVehicle = req.body.idVehicle || task.idVehicle;
    task.description = req.body.description || task.description;
    task.idTaskState = req.body.idTaskState || task.idTaskState;
    await task.save();
    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

//Delete
export async function deleteTask(req: Request, res: Response) {
  try {
    const task = await Task.findOneOrFail({ uuid: req.params.id });
    await task.remove();
    return res.json({ message: "Task deleted successfully" });
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
    const task = await Task.find({
      relations: ["usedEquipments", "taskModel", "taskModel.steps"],
      where: {
        uuid: id,
      },
    });
    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.json({ message: "Task not found" });
  }
}

// Find all the tasks of an Agent
export async function getTaskByAgentId(req: Request, res: Response) {
  const id = req.params.id;
  console.log("paramatre id = ", id);
  try {
    const tasks = await getManager()
      .createQueryBuilder(Task, "task")
      .where("task.idAgent = :id", { id: id })
      .leftJoinAndSelect("task.usedEquipments", "usedEquipments")
      .leftJoinAndSelect("task.taskModel", "taskModel")
      .getMany();

    return res.send(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
