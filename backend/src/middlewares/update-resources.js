import { resourceController } from '../controllers';

export default async function (req, res, next) {
  try {
    if ((req.method === 'POST' || req.method === 'PUT') && req.url !== '/register' && req.url !== '/login') {
      await resourceController.updateResources(req, res);
    }
    next();
  } catch (error) {
    next(error);
  }
}