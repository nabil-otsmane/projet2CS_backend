import { Request, Response } from "express";
import { getManager } from "typeorm";
import { read } from "node:fs";
import { TaskModel } from "../entity/TaskModel";
import { Step } from "../entity/Step";

/**
 * Create agent task request.
 *
 * @param _req - The request to the create a task
 * @param res - The response to the request
 *
 */
export const addTaskModel = async (req: Request, res: Response) => {
  try {
    const taskModel = TaskModel.create({
      taskModelName: req.body.taskModelName,
      steps: req.body.steps,
    });
    console.log(taskModel);
    await taskModel.save();
    const array = req.body.steps;
    await array.forEach(async (element: { step: string }) => {
      const step = Step.create({
        step: element.step,
        model: taskModel,
      });
      await step.save();
    });
    return res.send(taskModel);
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
export async function getAllTaskModels(_req: Request, res: Response) {
  try {
    const taskModels = await TaskModel.find({ relations: ["steps"] });
    console.log(taskModels);
    return res.json(taskModels);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// Update task without updating its steps
export async function updateTaskModel(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const taskModel = await TaskModel.findOneOrFail(id);
    taskModel.taskModelName = req.body.taskModelName;
    await taskModel.save();
    return res.json(taskModel);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

//Delete
export async function deleteTaskModel(req: Request, res: Response) {
  let id = parseInt(req.params.id);
  try {
    const taskModel = await TaskModel.findOneOrFail(id);
    await taskModel.remove();
    return res.json({ message: "Task model deleted successfully" });
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
export async function getTaskModel(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const taskModel = await TaskModel.findOneOrFail(id, {
      relations: ["steps"],
    });
    return res.json(taskModel);
  } catch (err) {
    console.log(err);
    return res.json({ message: "Task not found" });
  }
}
