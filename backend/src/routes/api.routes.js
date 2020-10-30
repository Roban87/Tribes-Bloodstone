import express from 'express';
import {
  helloController,
  loginController,
  buildingsController,
  registerController,
  resourceController,
  registerMapController,
  kingdomController,
  troopsController,
} from '../controllers';
import authHandler from '../middlewares/authorization-handler';
import updateResources from '../middlewares/update-resources';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.post('/login', loginController.post);
router.post('/register', registerController.post);
router.post('/register/map/:kingdomId', registerMapController.post);

router.use(authHandler);
router.use(updateResources);

router.get('/kingdom/buildings/:kingdomId', buildingsController.get);
router.get('/kingdom/buildings/:kingdomId/:buildingId', buildingsController.getBuilding);
router.post('/kingdom/buildings', buildingsController.post);
router.put('/kingdom/buildings/:buildingId', buildingsController.put);
router.get('/kingdom/resource/:kingdomId', resourceController.get);
router.post('/kingdom/troops', troopsController.post);
router.get('/kingdom/map/', registerMapController.get);
router.get('/kingdom/troops', troopsController.get);

router.put('/kingdom', kingdomController.put);
router.post('/register/map/:kingdomId', registerMapController.post);

export default router;
