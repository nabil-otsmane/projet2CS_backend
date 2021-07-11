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
exports.getEquip = exports.deleteEquip = exports.updateEquip = exports.getEquips = exports.addEquip = exports.get = void 0;
const Equipment_1 = require("../entity/Equipment");
const get = (_req, res) => {
    res.send("<h1> Welcome To Material Service 🤝 </h1>");
};
exports.get = get;
const addEquip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { equipmentName, category, unitPrice } = req.body;
    try {
        const equip = Equipment_1.Equipment.create({
            equipmentName,
            unitPrice,
            category,
        });
        yield equip.save();
        return res.send(equip);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.addEquip = addEquip;
function getEquips(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const Equips = yield Equipment_1.Equipment.find({ relations: ["usedEquipments"] });
            console.log(Equips);
            return res.json(Equips);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    });
}
exports.getEquips = getEquips;
function updateEquip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uuid = req.params.uuid;
        const { equipmentName, category, unitPrice } = req.body;
        try {
            const equip = yield Equipment_1.Equipment.findOneOrFail({ uuid });
            console.log("CouCou Here !");
            equip.equipmentName = equipmentName || equip.equipmentName;
            equip.category = category || equip.category;
            equip.unitPrice = unitPrice || equip.unitPrice;
            yield equip.save();
            return res.json(equip);
        }
        catch (err) {
            console.log(err);
            return res
                .status(500)
                .json({ error: "Something went wrong while updating ..." });
        }
    });
}
exports.updateEquip = updateEquip;
function deleteEquip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uuid = req.params.uuid;
        const errorMsg = { message: "Equipment supprimée avec succès" };
        try {
            const equip = yield Equipment_1.Equipment.findOneOrFail({ uuid });
            yield equip.remove();
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
exports.deleteEquip = deleteEquip;
function getEquip(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const uuid = req.params.uuid;
        try {
            const equip = yield Equipment_1.Equipment.findOneOrFail({ uuid });
            return res.send(equip);
        }
        catch (err) {
            console.log(err);
            return res.status(404).json({ message: "Material introuvable" });
        }
    });
}
exports.getEquip = getEquip;
//# sourceMappingURL=equipment.js.map