import { Router } from 'express';
import { getRentals, getRentalById, updateRental, deleteRental, addRental, getRentalsByState } from '../controllers/RentalController';
import { getPricingPerDay, getPenalitiesPerDay, get } from '../controllers/PricingController';
import { getVehicles, getVehicleById, updateVehicle, deleteVehicle, getVehiclesavailable, getVehiclesBystate } from '../controllers/VehicleController';
const router = Router();

console.log('rouuute');
router.get('/rental/', get);
//Get all rentals
router.get('/rental/rentalsList', getRentals);
//Get rentals by rentalstate active ...
router.get('/rental/rentalsListByState/:state', getRentalsByState);
//get one rental by id
router.get('/rental/rental/:id', getRentalById);
//update rental
router.put("/rental/updateRental/:id", updateRental);
//add new rental
router.post('/rental/addRental', addRental);
//delete rental by id
router.delete("/rental/deleteRental/:id", deleteRental);
//get initial pricing per day by id rental
router.get('/rental/pricingday/:id', getPricingPerDay);
//get penalitie per day
router.get('/rental/penaliteday/:id', getPenalitiesPerDay);
//get all vehicles
router.get('/rental/vehiclesList', getVehicles);
//get availibale vehicles
router.get('/rental/vehiclesListAvailable', getVehiclesavailable);
//get vehicles by state stopped ...
//router.get('/rental/vehiclesListByState/:state', getVehiclesBystate);
router.get('/rental/vehiclesListByState/:state/:idBorne', getVehiclesBystate);
//get vehicle by id
router.get('/rental/vehicle/:id', getVehicleById);
//update vehicle
router.put("/rental/updateVehicle/:id", updateVehicle);
//delete vehicle
router.delete("/rental/deleteVehicle/:id", deleteVehicle);


export default router;
