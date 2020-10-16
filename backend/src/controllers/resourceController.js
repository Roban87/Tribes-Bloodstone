import { resourceService } from '../services/';

export const resourceController = {

  async getResources(req, res, next) {
    const { kingdomId } = req.params;
    
    try {
      const resources = await resourceService.getResources(kingdomId);
      res.status(200).json({ resources: resources});
    } catch (error) {
      next(error);
    }
  },

}