import { buildingsService } from '../services';

export const buildingsController = {
  async get(req, res) {
    const kingdomId = req.params.kingdomId;
    try {
      const buildingsData = await buildingsService.getBuildings(kingdomId);
      res.status(200).json({ buildings: buildingsData });
    } catch (error) {
      res.status(500).json({error: 'Something went wrong...'});
    }
  },
  async getBuilding(req, res, next) {
    const { buildingId } = req.params;
    const { kingdomId } = req.user;
    try {
      const buildingData = await buildingsService.getSingleBuilding(buildingId, kingdomId);
      res.status(200).json(buildingData);
    } catch(err) {
        next(err);
    }
  },
};
