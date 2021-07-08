import { Router } from 'express';
import { get, getVehiclePosition, getVehicleLatestPosition } from '../controllers/vehiclePosition';

const router = Router();

router.get('/', get);
router.get('/vehiclePosition', getVehiclePosition);
router.get('/vehicleLatestPosition', getVehicleLatestPosition);

export default router;