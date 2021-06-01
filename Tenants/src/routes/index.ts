import { Router } from 'express';
import {getTenants} from '../controllers/Tenant';

const router = Router();
router.get('/tenant/all',getTenants) ;/**get all tenants */
export default router;