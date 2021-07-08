import { Router } from 'express';
import {  detectPannes, get,getPannes } from '../controllers/detectPannes';

const router = Router();


router.get('/', get);
router.get('/panne', getPannes);
router.get('/detect', detectPannes);

export default router;
