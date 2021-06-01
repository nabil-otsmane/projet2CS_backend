"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const breakdownNotification_1 = require("../controllers/breakdownNotification");
const signalNotification_1 = require("../controllers/signalNotification");
const router = express_1.Router();
router.get('/', (_req, res) => {
    res.end("Notification service up to work");
});
router.get('/breakdown', breakdownNotification_1.getBreakdown);
router.post('/breakdown', breakdownNotification_1.addBreakdown);
router.put('/breakdown/:id', breakdownNotification_1.readBreakdown);
router.delete('/breakdown/:id', breakdownNotification_1.deleteBreakdown);
router.get('/signal', signalNotification_1.getSignal);
router.post('/signal', signalNotification_1.addSignal);
router.put('/signal/:id', signalNotification_1.readSignal);
router.delete('/signal/:id', signalNotification_1.deleteSignal);
exports.default = router;
//# sourceMappingURL=index.js.map