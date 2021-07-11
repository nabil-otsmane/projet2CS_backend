"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const equipment_1 = require("../controllers/equipment");
const usedEquipment_1 = require("../controllers/usedEquipment");
const router = express_1.Router();
router.get("/", equipment_1.get);
router.post("/equipment", equipment_1.addEquip);
router.get("/equipment", equipment_1.getEquips);
router.put("/equipment/:uuid", equipment_1.updateEquip);
router.delete("/equipment/:uuid", equipment_1.deleteEquip);
router.get("/equipment/:uuid", equipment_1.getEquip);
router.post("/usedEquipment", usedEquipment_1.addUsedEquip);
router.get("/usedEquipment", usedEquipment_1.getUsedEquips);
router.put("/usedEquipment/:uuid", usedEquipment_1.updateUsedEquip);
router.delete("/usedEquipment/:uuid", usedEquipment_1.deleteUsedEquip);
router.get("/usedEquipment/:uuid", usedEquipment_1.getUsedEquip);
exports.default = router;
//# sourceMappingURL=index.js.map