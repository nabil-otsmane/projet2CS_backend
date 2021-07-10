import { Router } from 'express';
import { getRentals, getRentalById, updateRental, deleteRental, addRental, getRentalsByState, endRental, updateVehicleState } from '../controllers/RentalController';
import { getPricingPerDay, getPenalitiesPerDay, get } from '../controllers/PricingController';
import { getVehicles, getVehicleById, updateVehicle, deleteVehicle, getVehiclesavailable, getVehiclesBystate } from '../controllers/VehicleController';
const router = Router();

console.log('rouuute');
router.get('/', get);
//Get all rentals
router.get('/rentalsList', getRentals);
//Get rentals by rentalstate active ...
router.get('/rentalsListByState/:state', getRentalsByState);
//get one rental by id
router.get('/rental/:id', getRentalById);
//update rental
router.put("/updateRental/:id", updateRental);
//add new rental
router.post('/addRental', addRental);
//delete rental by id
router.delete("/deleteRental/:id", deleteRental);
//get initial pricing per day by id rental
router.get('/pricingday/:id', getPricingPerDay);
//get penalitie per day
router.get('/penaliteday/:id', getPenalitiesPerDay);
//get all vehicles
router.get('/vehiclesList', getVehicles);
//get availibale vehicles
router.get('/vehiclesListAvailable', getVehiclesavailable);
//get vehicles by state stopped ...
//router.get('/vehiclesListByState/:state', getVehiclesBystate);
router.get('/vehiclesListByState/:state/:idBorne', getVehiclesBystate);
//get vehicle by id
router.get('/vehicle/:id', getVehicleById);
//update vehicle
router.put("/updateVehicle/:id", updateVehicle);
//delete vehicle
router.delete("/deleteVehicle/:id", deleteVehicle);

router.post('/endRental/:idVehicle',endRental) ;
router.put('/updateVehicleState/:idVehicle',updateVehicleState);

export default router;
