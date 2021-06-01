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
exports.deleteBreakdown = exports.readBreakdown = exports.getBreakdown = exports.addBreakdown = void 0;
const BreakdownNotification_1 = require("../entity/BreakdownNotification");
const addBreakdown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { read, idPanne } = req.body;
    try {
        const breakdownNotif = BreakdownNotification_1.BreakdownNotification.create({
            read: read || false,
            idPanne
        });
        yield breakdownNotif.save();
        return res.send(breakdownNotif);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.addBreakdown = addBreakdown;
const getBreakdown = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const breakdownNotif = yield BreakdownNotification_1.BreakdownNotification.find();
        return res.json(breakdownNotif);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.getBreakdown = getBreakdown;
const readBreakdown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const breakdownNotifID = req.params.id;
        const breakdownNotif = yield BreakdownNotification_1.BreakdownNotification.findOneOrFail({
            id: Number(breakdownNotifID),
        });
        breakdownNotif.read = true;
        yield breakdownNotif.save();
        return res.json(breakdownNotif);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.readBreakdown = readBreakdown;
const deleteBreakdown = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const breakdownNotifID = req.params.id;
        const breakdownNotif = yield BreakdownNotification_1.BreakdownNotification.findOneOrFail({
            id: Number(breakdownNotifID),
        });
        yield breakdownNotif.remove();
        return res.json({
            message: 'Notification deleted'
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
    ;
});
exports.deleteBreakdown = deleteBreakdown;
//# sourceMappingURL=breakdownNotification.js.map