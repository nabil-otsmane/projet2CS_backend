import { Router } from 'express';
import {  add_position_ByLocation, get } from '../controllers/position_bylocation';

const router = Router();


router.get('/', get);
router.post('/AddPosition', add_position_ByLocation);


export default router;
