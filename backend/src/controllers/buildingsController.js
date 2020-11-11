import { buildingsService } from '../services';

export const buildingsController = {
  async get(req, res) {
    const { kingdomId } = req.user;
    try {
      const buildingsData = await buildingsService.getBuildings(kingdomId);
      res.status(200).json({ buildings: buildingsData });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong...' });
    }
  },

  async getBuilding(req, res, next) {
    const { buildingId } = req.params;
    const { kingdomId } = req.user;
    try {
      const buildingData = await buildingsService.getSingleBuilding(buildingId, kingdomId);
      res.status(200).json(buildingData);
    } catch (err) {
      next(err);
    }
  },

  async post(req, res, next) {
    const { kingdomId } = req.user;
    const { type } = req.body;
    try {
      const addBuildingData = await buildingsService.addBuilding(type, kingdomId);
      res.status(200).json(addBuildingData);
    } catch (error) {
      next(error);
    }
  },

  async put(req, res, next) {
    const { buildingId } = req.params;
    const { kingdomId } = req.user;
    try {
      const buildingData = await buildingsService.upgradeBuilding(buildingId, kingdomId);
      res.status(200).json(buildingData);
    } catch (err) {
      next(err);
    }
  },

  async getLeaderboard(req, res) {
    try {
      const buildingsLeadersResult = await buildingsService.getLeadersBuildings();
      res.status(200).json({ leaderboard: buildingsLeadersResult });
    } catch (error) {
      res.status(500).json({ error: 'Faild to load Leaderboard! Please, refresh the page!' });
    }
  },
};
