import { Router } from 'express';
import { getRental, endRental } from '../controllers/Rental';

const router = Router();



router.get('/getrental',getRental) ;/**get all tenants */

//Makes necessary changes to end the rental
router.post('/endRental/:idVehicle',endRental) ;


export default router;