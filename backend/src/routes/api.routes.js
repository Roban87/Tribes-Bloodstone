import express from 'express';
const cors = require('cors');
import { helloController, loginController, buildingsController, registerController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.post('/login', loginController.post);
router.get('/kingdom/buildings/:kingdomId', buildingsController.get);
router.post('/register', registerController.post);

export default router;
