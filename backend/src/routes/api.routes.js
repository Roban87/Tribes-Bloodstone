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
  battleController,
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
router.post('/register/map/', registerMapController.post);
router.get('/kingdom/map/', registerMapController.get);

router.use(authHandler);
router.use(updateResources);

router.put('/kingdom', kingdomController.put);
router.get('/kingdom', kingdomController.get);
router.get('/kingdom/buildings', buildingsController.get);
router.post('/kingdom/buildings', buildingsController.post);
router.get('/kingdom/buildings/:buildingId', buildingsController.getBuilding);
router.put('/kingdom/buildings/:buildingId', buildingsController.put);
router.get('/kingdom/troops', troopsController.get);
router.post('/kingdom/troops', troopsController.post);
router.get('/kingdom/resource', resourceController.get);
router.get('/rules', rulesController.get);
router.get('/kingdom/battle/:enemyId', battleController.get);

export default router;
