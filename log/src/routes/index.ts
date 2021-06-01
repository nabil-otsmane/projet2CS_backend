import { Router } from 'express';
import { getLogs, addLog, getLog,deleteLog } from '../controllers/Log'  
import { getApps , getApp , deleteApp , addApp, updateApp } from '../controllers/App'

const router = Router();


router.get('/log',getLogs)
router.post('/log',addLog)
router.get('/log/:logId', getLog)
router.delete('/log/:logId', deleteLog)

router.get('/app', getApps)
router.get('/app/:appId', getApp)
router.post('/app',addApp)
router.delete('/app/:appId', deleteApp)
router.put('/app/:appId', updateApp)

export default router;