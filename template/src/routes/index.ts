import { Router } from 'express';
import { getRentals, getRentalById, updateRental,deleteRental, addRental,getRentalsByState } from '../controllers/RentalController';
import {getPricingPerDay,getPenalitiesPerDay, get} from '../controllers/PricingController';
import { getVehicles, getVehicleById, updateVehicle,deleteVehicle, getVehiclesavailable, getVehiclesBystate } from '../controllers/VehicleController';
const router = Router();

console.log('rouuute');
router.get('/pricing/', get);
//Get all rentals
router.get('/pricing/rentalsList', getRentals);
//Get rentals by rentalstate active ...
router.get('/pricing/rentalsListByState/:state', getRentalsByState);
//get one rental by id
router.get('/pricing/rental/:id', getRentalById);
//update rental
router.put("/pricing/updateRental/:id", updateRental);
//add new rental
router.post('/pricing/addRental', addRental);
//delete rental by id
router.delete("/pricing/deleteRental/:id", deleteRental);
//get initial pricing per day by id rental
router.get('/pricing/pricingday/:id',getPricingPerDay);
//get penalitie per day 
router.get('/pricing/penaliteday/:id',getPenalitiesPerDay);
//get all vehicles
router.get('/pricing/vehiclesList',getVehicles);
//get availibale vehicles
router.get('/pricing/vehiclesListAvailable',getVehiclesavailable);
//get vehicles by state stopped ...
router.get('/pricing/vehiclesListByState/:state',getVehiclesBystate);
//get vehicle by id
router.get('/pricing/vehicle/:id',getVehicleById);
//update vehicle 
router.put("/pricing/updateVehicle/:id", updateVehicle);
//delete vehicle
router.delete("/pricing/deleteVehicle/:id", deleteVehicle);


export default router;