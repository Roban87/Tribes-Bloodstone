import express from 'express';
const cors = require('cors');
import { helloController, loginController, buildingsController, registerController, resourceController } from '../controllers';
import authHandler from '../middlewares/authorization-handler';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.post('/login', loginController.post);
router.post('/register', registerController.post);
router.use(authHandler);
router.get('/kingdom/buildings/:kingdomId', buildingsController.get);
<<<<<<< HEAD
<<<<<<< HEAD
router.get('/kingdom/buildings/:kingdomId/:buildingId', buildingsController.getBuilding);
=======
router.get('/kingdom/buildings/:kingdomId/:buildingId', buildingsController.getBuilding)
>>>>>>> 8358911...  added handlers for One Building request in buildingsService and buildingsController
=======
router.get('/kingdom/buildings/:kingdomId/:buildingId', buildingsController.getBuilding);
>>>>>>> 71e971d... minor formatting
router.get('/kingdom/resource/:kingdomId', resourceController.get);

export default router;
