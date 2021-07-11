"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsedEquip = exports.deleteUsedEquip = exports.updateUsedEquip = exports.getUsedEquips = exports.addUsedEquip = void 0;
const Equipment_1 = require("../entity/Equipment");
const UsedEquipment_1 = require("../entity/UsedEquipment");
const class_validator_1 = require("class-validator");
const Task_1 = require("../entity/Task");
const addUsedEquip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { equipment, description, quantity, taskUUID } = req.body;
    try {
        const equip = yield Equipment_1.Equipment.findOneOrFail({ uuid: equipment });
        const task = yield Task_1.Task.findOneOrFail({ uuid: taskUUID });
        const usedEquip = UsedEquipment_1.UsedEquipment.create({
            description,
            quantity,
            equipment: equip,
            task: task,
        });
        const errors = yield class_validator_1.validate(usedEquip);
        if (errors.length > 0)
            throw errors;
        yield usedEquip.save();
        return res.send(usedEquip);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.addUsedEquip = addUsedEquip;
function getUsedEquips(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usedEquips = yield UsedEquipment_1.UsedEquipment.find({ relations: ["equipment"] });
            console.log("Hello !");
            console.log(usedEquips);
            return res.json(usedEquips);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    });
}
exports.getUsedEquips = getUsedEquips;
function updateUsedEquip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uuid = req.params.uuid;
        const { description, quantity } = req.body;
        try {
            const usedEquip = yield UsedEquipment_1.UsedEquipment.findOneOrFail({ uuid });
            console.log("CouCou Here !");
            usedEquip.description = description || usedEquip.description;
            usedEquip.quantity = quantity || usedEquip.quantity;
            yield usedEquip.save();
            return res.json(usedEquip);
        }
        catch (err) {
            console.log(err);
            return res
                .status(500)
                .json({ error: "Something went wrong while updating ..." });
        }
    });
}
exports.updateUsedEquip = updateUsedEquip;
function deleteUsedEquip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uuid = req.params.uuid;
        const errorMsg = { message: "Equipment supprimée avec succès" };
        try {
            const usedEquip = yield UsedEquipment_1.UsedEquipment.findOneOrFail({ uuid });
            yield usedEquip.remove();
            return res.status(204).json(errorMsg);
        }
        catch (err) {
            console.log(err);
            return res
                .status(500)
                .json({ error: " Something went wrong while deleting ..." });
        }
    });
}
exports.deleteUsedEquip = deleteUsedEquip;
function getUsedEquip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uuid = req.params.uuid;
            const usedEquip = yield UsedEquipment_1.UsedEquipment.findOneOrFail({ uuid }, { relations: ["equipment"] });
            return res.send(usedEquip);
        }
        catch (err) {
            console.log(err);
            return res.status(404).json({ message: "Material introuvable" });
        }
    });
}
exports.getUsedEquip = getUsedEquip;
//# sourceMappingURL=usedEquipment.js.map