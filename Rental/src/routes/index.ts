import { Router } from 'express';
import { getRental, endRental, updateVehicleState } from '../controllers/Rental';

const router = Router();



router.get('/getrental',getRental) ;/**get all tenants */

//Makes necessary changes to end the rental
router.post('/endRental/:idVehicle',endRental) ;

router.put('/updateVehicleState',updateVehicleState);


export default router;