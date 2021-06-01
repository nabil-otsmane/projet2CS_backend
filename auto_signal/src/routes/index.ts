import { Router } from 'express';
import {  get,createSignalRemorque,createSignalTime} from '../controllers/autoSignalController';

const router = Router();

//user
router.get('/', get);
//etat de vehicule 
router.post('/estRemorquee',createSignalRemorque)
router.post('/dateDepassee',createSignalTime)


export default router;