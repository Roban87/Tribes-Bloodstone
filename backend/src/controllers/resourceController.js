import { resourceService } from '../services/';

export const resourceController = {

  async get(req, res, next) {
    const { kingdomId } = req.params;
    try {
      const resources = await resourceService.getResources(kingdomId);
      res.status(200).json({ resources: resources});
    } catch (error) {
      next(error);
    }
  },

  async updateResources(req, res) {
    const { kingdomId } = req.body;
    return await resourceService.updateResources(kingdomId);
  },

}