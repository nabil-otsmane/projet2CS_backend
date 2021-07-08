import { Router } from 'express';
import {getRental} from '../controllers/Rental';

const router = Router();
router.get('/rental/getrental',getRental) ;/**get all tenants */
export default router;