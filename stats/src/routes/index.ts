import { Router } from 'express';
import { AgentRepByDay, AgentRepByMonth, AgentRepByWeek, AgentRepByYear } from '../controllers/AgentStats';
import { BorneRentsByDay, BorneRentsByMonth, BorneRentsByYear } from '../controllers/BorneStats';
import { CarRentsByDay,CarRentsByMonth,CarRentsByYear } from '../controllers/VehiculeStats';

const router = Router();

router.get("/vr/d/:id",CarRentsByDay);
router.get("/vr/m/:id",CarRentsByMonth);
router.get("/vr/y/:id",CarRentsByYear);

router.get("/br/d/:id",BorneRentsByDay);
router.get("/br/m/:id",BorneRentsByMonth);
router.get("/br/y/:id",BorneRentsByYear);


router.get("/ar/d/:id",AgentRepByDay);
router.get("/ar/w/:id",AgentRepByWeek);
router.get("/ar/m/:id",AgentRepByMonth);
router.get("/ar/y/:id",AgentRepByYear);

export default router;

