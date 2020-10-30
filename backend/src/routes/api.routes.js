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
  rulesController,
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

router.put('/kingdom', kingdomController.put);
router.get('/kingdom/map/', registerMapController.get);
router.get('/kingdom/buildings/', buildingsController.get);
router.post('/kingdom/buildings', buildingsController.post);
router.get('/kingdom/resource/:kingdomId', resourceController.get);
router.get('/kingdom/buildings/:buildingId', buildingsController.getBuilding);
router.put('/kingdom/buildings/:buildingId', buildingsController.put);
router.get('/kingdom/troops', troopsController.get);
router.post('/kingdom/troops', troopsController.post);

router.get('/rules', rulesController.get);

export default router;
