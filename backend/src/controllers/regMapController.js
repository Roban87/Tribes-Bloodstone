import { regMapService } from '../services';

export const regMapController = {
  async post(req, res, next) {
    const kingdomId = req.params.kingdomId;
    const location = req.body.location;
    try {
      const kingdomData = await regMapService.postRegMap(kingdomId, location);
      res.status(200).json({ kingdomData });
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    try {
      const kingdoms = await regMapService.getRegMap();
      res.status(200).json({ kingdoms });
    } catch (error) {
      next(error);
    }
  },
};
