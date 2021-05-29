import { Router, Request, Response } from 'express';
import { addBreakdown, getBreakdown, readBreakdown, deleteBreakdown } from '../controllers/breakdownNotification';
import { addSignal, getSignal, readSignal, deleteSignal} from '../controllers/signalNotification';


const router = Router();

// used to test the notifications
router.get('/', (_req: Request, res: Response) => {
    res.sendFile(__dirname + "/" + "index.html");
});

// breakdown notifications

router.get('/breakdown', getBreakdown);

router.post('/breakdown', addBreakdown)

router.put('/breakdown/:id', readBreakdown);

router.delete('/breakdown/:id', deleteBreakdown);

// signal notifications

router.get('/signal', getSignal);

router.post('/signal', addSignal)

router.put('/signal/:id', readSignal);

router.delete('/signal/:id', deleteSignal);

export default router;
