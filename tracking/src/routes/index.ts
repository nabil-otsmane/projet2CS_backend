import { Router } from 'express';
import { createVehicleState, get, getVehicleState ,updateVehicleState,deleteVehicleState,findVehicleState,findVehicleRental} from '../controllers/suiviVehicule';

const router = Router();

//user
router.get('/', get);
//etat de vehicule 

router.post('/vehicle_State', createVehicleState);
router.put('/vehicle_State/:idVehicle', updateVehicleState);
router.delete('/vehicle_State/:id_state', deleteVehicleState);


//get vehicle state by idVehicle 
router.get('/vehicle_state', findVehicleState);
//get rebtal and tenant information by id vehicle 
router.get('/rental_info', findVehicleRental);








export default router;