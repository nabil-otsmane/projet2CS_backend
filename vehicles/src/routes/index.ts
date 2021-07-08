import { Router } from 'express';
import { get,getVehicles } from '../controllers/listVehicles';

const router = Router();


router.get('/', get);
router.get('/vehicle', getVehicles);

export default router;
