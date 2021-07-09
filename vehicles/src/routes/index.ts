import { Router } from 'express';
import { get, getVehicles, getVehiclesByAvailibility } from '../controllers/listVehicles';

const router = Router();


router.get('/', get);

router.get('/vehicle', getVehicles);

router.get('/vehicle/:status', getVehiclesByAvailibility);

export default router;
