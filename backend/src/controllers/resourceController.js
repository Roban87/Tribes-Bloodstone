import { resourceService } from '../services';

export const resourceController = {

  async get(req, res, next) {
    const { kingdomId } = req.user;
    try {
      const resources = await resourceService.getResources(kingdomId);
      res.status(200).json({ resources });
    } catch (error) {
      next(error);
    }
  },

};
