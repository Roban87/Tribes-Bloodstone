import { resourceController } from '../controllers';

export default async (req, res, next) => {
  try {
    if (req.method === 'POST' || req.method === 'PUT') {
      await resourceController.updateResources(req.user.kingdomId);
    }
    next();
  } catch (error) {
    next(error);
  }
}