import { Router } from 'express';
import { get, getRental, endRental, updateVehicleState } from '../controllers/Rental';

const router = Router();


router.get('/',get);

router.get('/getrental',getRental);/**get all tenants */

//Makes necessary changes to end the rental
router.post('/endRental/:idVehicle',endRental) ;

router.put('/updateVehicleState',updateVehicleState);


export default router;