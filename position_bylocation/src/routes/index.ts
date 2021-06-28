import { Router } from 'express';
import {  add_position_ByLocation, get ,getVehicleInfos} from '../controllers/position_bylocation';

const router = Router();


router.get('/', get);
router.post('/AddPosition', add_position_ByLocation);
router.get('/getVehicleInformations', getVehicleInfos);

export default router;
