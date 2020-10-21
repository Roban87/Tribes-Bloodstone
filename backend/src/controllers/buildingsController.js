import { buildingsService } from '../services';

export const buildingsController = {
  async get(req, res) {
    const { kingdomId } = req.user;
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

  async add(req, res) {
    const { kingdomId } = req.user;
    const { type } = req.body;
    try {
      const addBuildingData = await buildingsService.addBuilding(type, kingdomId);
      res.status(200).json(addBuildingData);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }
};
