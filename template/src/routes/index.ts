import { Router } from 'express';
import { getRentals, getRentalById, updateRental,deleteRental, addRental } from '../controllers/RentalController';
import {getPricingPerDay,getPenalitiesPerDay, get} from '../controllers/PricingController'
const router = Router();


router.get('/pricing/', get);
router.get('/pricing/rentalsList', getRentals);
router.get('/pricing/rental', getRentalById);
router.put("/pricing/updateRental/:id", updateRental);
router.post('/pricing/addRental', addRental);
router.delete("/pricing/deleteRental/:id", deleteRental);
router.get('/pricing/tarifbasejour/:id',getPricingPerDay)
router.get('/pricing/tarifpenalitejour/:id',getPenalitiesPerDay)

export default router;