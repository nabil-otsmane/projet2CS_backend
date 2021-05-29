import { Router } from "express";
import {
  get,
  addTask,
  getTasks,
  getTask,
  deleteTask,
  updateTaskState,
  getTaskByAgentId,
  updateTask,
} from "../controllers/task";
import {
  addTaskModel,
  getAllTaskModels,
  updateTaskModel,
  deleteTaskModel,
  getTaskModel,
} from "../controllers/taskModel";

const router = Router();

// Routes for Task
router.get("/", get);
router.get("/task", getTasks);
router.post("/task", addTask);
router.put("/taskState/:id", updateTaskState);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);
router.get("/task/:id", getTask);
router.get("/task/agent/:id", getTaskByAgentId);

// Routes for TaskModel
router.get("/taskModel", getAllTaskModels);
router.post("/taskModel", addTaskModel);
router.put("/taskModel/:id", updateTaskModel);
router.delete("/taskModel/:id", deleteTaskModel);
router.get("/taskModel/:id", getTaskModel);

export default router;
