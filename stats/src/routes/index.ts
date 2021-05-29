import { Router } from 'express';
import { AgentReparation, AgentReparationById, AgentReparationDate, AgentReparationDateById } from '../controllers/AgentStats';
import { BornesRents, BornesRentsById, BornesRentsDate, BornesRentsDateById } from '../controllers/BorneStats';
import { signalEnlev, signalEnlevById, VehiculeRents, VehiculeRentsDate, VehiculeRentsYear, VehiculeRentsYM, VehiculeRentsYMD, VehiculesRents, VehiculesRentsDate, VehiculesRentsYear, VehiculesRentsYM, VehiculesRentsYMD } from '../controllers/VehiculeStats';

const router = Router();

//router.get("/",getVehiculeRent);
router.get("/",VehiculesRents);
router.get("/d/:year",VehiculesRentsYear)
router.get("/d/:year/:month",VehiculesRentsYM)
router.get("/d/:year/:month/:day",VehiculesRentsYMD)
router.get("/f/:start/:end",VehiculesRentsDate)

router.get("/v/:id",VehiculeRents)
router.get("/v/:id/d/:year",VehiculeRentsYear)
router.get("/v/:id/d/:year/:month",VehiculeRentsYM)
router.get("/v/:id/d/:year/:month/:day",VehiculeRentsYMD)
router.get("/v/:id/f/:start/:end",VehiculeRentsDate)

router.get("/signal/",signalEnlev)
router.get("/signal/:id",signalEnlevById)


router.get("/Agent",AgentReparation)
router.get("/Agent/:id",AgentReparationById)
router.get("/Agent/f/:start/:end",AgentReparationDate)
router.get("/Agent/:id/f/:start/:end",AgentReparationDateById)

router.get("/Borne",BornesRents);
router.get("/Borne/:id",BornesRentsById);
router.get("/Borne/f/:start/:end",BornesRentsDate)
router.get("/Borne/:id/f/:start/:end",BornesRentsDateById)





export default router;

