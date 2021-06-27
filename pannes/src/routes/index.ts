import { Router } from 'express';
import {  detectPannes, get,getPannes,addPanne,getPanneById,deletePanne,updatePanne } from '../controllers/pannes';

const router = Router();


router.get('/', get);
router.get('/getPannes', getPannes);
router.get('/getPanne/:idPanne', getPanneById);
router.post('/addPanne', addPanne);
router.delete('/deletePanne/:idPanne', deletePanne);
router.put('/updatePanne/:idPanne', updatePanne);
router.get('/detect', detectPannes);

export default router;
