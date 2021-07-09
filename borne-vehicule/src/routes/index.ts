
import { Router } from "express";
import {
  getBorne,
  getBornes,
  addBorne,
  updateBorne,
  deleteBorne,
} from "../controllers/borne";
import {
  getVehicule,
  getVehicules,
  addVehicule,
  updateVehicule,
  deleteVehicule,
  getVehiculesByBorneId,
  updateInfoVehicle,
  getRentalVehicle
} from "../controllers/vehicule";

const router = Router();

router.post("/bornes", addBorne);
router.get("/bornes", getBornes);
router.get("/bornes/:idBorne", getBorne);
router.put("/bornes/:idBorne", updateBorne);
router.delete("/bornes/:idBorne", deleteBorne);

router.get("/borne/:idBorne/vehicles", getVehiculesByBorneId);

router.post("/vehicules", addVehicule);
router.get("/vehicules", getVehicules);
router.get("/vehicules/:idVehicule", getVehicule);
router.put("/vehicules/:idVehicule", updateVehicule);
router.delete("/vehicules/:idVehicule", deleteVehicule);

router.get("/updateVehicle/:id", updateInfoVehicle)
router.get("/rentalVeh/:id", getRentalVehicle)

export default router;