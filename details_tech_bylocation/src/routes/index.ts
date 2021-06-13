import { Router } from 'express';
import {  add_techDetails_ByLocation, get } from '../controllers/tech_details_Location';

const router = Router();


router.get('/', get);
router.post('/AddTechDetails', add_techDetails_ByLocation);

export default router;
