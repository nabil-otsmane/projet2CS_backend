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
exports.deleteSignal = exports.readSignal = exports.getSignal = exports.addSignal = void 0;
const SignalNotification_1 = require("../entity/SignalNotification");
const addSignal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { read, idSignal } = req.body;
    try {
        const signalNotif = SignalNotification_1.SignalNotification.create({
            read: read || false,
            idSignal
        });
        yield signalNotif.save();
        return res.send(signalNotif);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.addSignal = addSignal;
const getSignal = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signalNotif = yield SignalNotification_1.SignalNotification.find();
        return res.json(signalNotif);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.getSignal = getSignal;
const readSignal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signalNotifID = req.params.id;
        const signalNotif = yield SignalNotification_1.SignalNotification.findOneOrFail({
            id: Number(signalNotifID),
        });
        signalNotif.read = true;
        yield signalNotif.save();
        return res.json(signalNotif);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.readSignal = readSignal;
const deleteSignal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signalNotifID = req.params.id;
        const signalNotif = yield SignalNotification_1.SignalNotification.findOneOrFail({
            id: Number(signalNotifID),
        });
        yield signalNotif.remove();
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
exports.deleteSignal = deleteSignal;
//# sourceMappingURL=signalNotification.js.map