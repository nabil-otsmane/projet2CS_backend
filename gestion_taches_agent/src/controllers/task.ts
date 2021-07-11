import { Request, Response } from "express";
import { getManager } from "typeorm";
import { read } from "node:fs";
import { Task } from "../entity/Task";
import { TaskModel } from "../entity/TaskModel";
import { Rental } from "../entity/Rental";
import { VehicleState } from "../entity/VehicleState";
import { Vehicule } from "../entity/Vehicle";

const axios = require("axios");

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
    // Task Creation
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

    // Update Vehicle To Maintained
    const vehicle = await Vehicule.findOneOrFail({ idVehicle })
    vehicle.availibility = "maintained"
    await vehicle.save();

    var data = JSON.stringify({
      title: "Notification d'une tâche",
      body: "Vous avez une nouvelle notification : " + taskTitle,
      idAgent,
    });

    var config = {
      method: "post",
      url: "https://volet-maintenance.herokuapp.com/service-taskNotif/fcm",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(() => {
        console.log("POST FCM");
      })
      .catch(function (error: any) {
        console.log(error);
      });

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
    tasks.map((item: any) => {
      item.steps = item.taskModel.steps;
      delete item.taskModel;
      return item;
    });
    /* 
    tasks.map((item) => {
      console.log(item.taskModel.steps);
    }); */

    // const steps = tasks.taskModel.steps;
    /* tasks.map((item) => {
      const steps = item.taskModel.steps;
      item.steps = steps;
    }); */
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
    let msg = "";
    const task = await Task.findOneOrFail({
      relations: ["usedEquipments", "taskModel", "taskModel.steps"],
      where: {
        uuid: id,
      },
    });
    task.idTaskState = req.body.idTaskState;
    await task.save();
    if ((task.idTaskState = 1)) {
      msg = "tache n'est pas affecté";
    }
    if ((task.idTaskState = 2)) {
      msg = "La tâche est en cours";
    }
    if ((task.idTaskState = 3)) {
      msg = "La tâche a été terminé";
      //change vidange inside the table vehicle state
      if ((task.taskModel.id = 2)) {
        // task vidange
        const idVehicule = task.idVehicle;
        const rental = await Rental.find({
          idVehicle: idVehicule,
          rentalstate: "active",
        });
        const vehicleState = await VehicleState.findOneOrFail({
          idRental: rental[rental.length - 1].idRental,
        });
        vehicleState.vidange = vehicleState.vidange + 10000;
        await vehicleState.save();
        // Update Vehicule State To Available
        const vehicle = await Vehicule.findOneOrFail({ idVehicle: idVehicule })
        vehicle.availibility = "available"
        await vehicle.save();
      }
    }

    return res.json(msg);
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
      .leftJoinAndSelect("taskModel.steps", "Steps")
      .getMany();

    tasks.map((item: any) => {
      item.steps = item.taskModel.steps;
      delete item.taskModel;
      return item;
    });

    return res.send(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

export async function setTaskEndDate(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const task = await Task.findOneOrFail({
      relations: ["taskModel", "taskModel.steps"],
      where: {
        uuid: id,
      },
    });

    task.endDate = req.body.endDate || task.endDate;
    await task.save();
    return res.json("Date modifié avec succés");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
