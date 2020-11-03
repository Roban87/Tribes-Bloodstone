import { resourceService } from '../services';

export default async (req, res, next) => {
  try {
    if (req.method === 'POST' || req.method === 'PUT' || req.url === '/kingdom/resource') {
      await resourceService.updateResources(req.user.kingdomId);
    }
    next();
  } catch (error) {
    next(error);
  }
};
