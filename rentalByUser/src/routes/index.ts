import { Router } from 'express';
import { get , getRental} from '../controllers/RentalController'
const router = Router();


router.get('/', get);

router.get('/getRental/:idUser' , getRental);

export default router;
