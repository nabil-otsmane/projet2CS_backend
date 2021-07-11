import { Router } from "express";
import {
  addEquip,
  deleteEquip,
  get,
  getEquip,
  getEquips,
  updateEquip,
} from "../controllers/equipment";

import {
  addUsedEquip,
  deleteUsedEquip,
  getUsedEquip,
  getUsedEquips,
  updateUsedEquip,
} from "../controllers/usedEquipment";

const router = Router();

router.get("/", get);
// Routes for Equipments
router.post("/equipment", addEquip);
router.get("/equipment", getEquips);
router.put("/equipment/:uuid", updateEquip);
router.delete("/equipment/:uuid", deleteEquip);
router.get("/equipment/:uuid", getEquip);

// Routes for UsedEquipments
router.post("/usedEquipment", addUsedEquip);
router.get("/usedEquipment", getUsedEquips);
router.put("/usedEquipment/:uuid", updateUsedEquip);
router.delete("/usedEquipment/:uuid", deleteUsedEquip);
router.get("/usedEquipment/:uuid", getUsedEquip);

export default router;
