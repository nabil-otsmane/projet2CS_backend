import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import * as express from 'express';
import { Request, Response, json } from "express";
import * as cors from 'cors';
import * as morgan from 'morgan';
import { Router } from 'express';


import { getSignal, getSignals, addSignal, deleteSignal,updateSignalsState,getSignaTheftlInformation,getSignalPannesInformation} from '../controllers/Signal'


const router = Router();
router.post('/signals', addSignal)
router.get('/signals', getSignals)
router.get('/signals/:idSignal', getSignal)
router.delete('/signals/:idSignal', deleteSignal)
router.get('/panne_signals', getSignalPannesInformation)
router.get('/theft_signals', getSignaTheftlInformation)
router.put('/signals_treated',updateSignalsState)


export default router;