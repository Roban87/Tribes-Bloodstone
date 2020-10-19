import express from 'express';
const cors = require('cors');
import { helloController, loginController, buildingsController, registerController, resourceController } from '../controllers';
import authHandler from '../middlewares/authorization-handler';
import updateResources from '../middlewares/update-resources';

const router = express.Router({mergeParams: true});

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.post('/login', loginController.post);
router.post('/register', registerController.post);

router.use(authHandler);
router.use(updateResources);

router.get('/kingdom/buildings/:kingdomId', buildingsController.get);
router.get('/kingdom/resource/:kingdomId', resourceController.get);


export default router;
