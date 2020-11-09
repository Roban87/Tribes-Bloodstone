import { troopsService, kingdomService } from '../services';

export const troopsController = {
  async post(req, res, next) {
    const { kingdomId } = req.user;
    try {
      const newTroop = await troopsService.addTroop(kingdomId);
      res.status(200).json(newTroop);
    } catch (error) {
      next(error);
    }
  },

  async get(req, res, next) {
    const { kingdomId } = req.user;
    try {
      const getTroops = await kingdomService.selectKingdomInformations(
        kingdomId,
      );
      res.status(200).json({ troops: getTroops.troops });
    } catch (error) {
      next(error);
    }
  },

  async put(req, res, next) {
    const { kingdomId } = req.user;
    const { amount, level } = req.body;
    try {
      const upgradeTroops = await troopsService.upgradeTroops(level, amount, kingdomId);
      res.status(200).json({ troops: upgradeTroops });
    } catch (error) {
      next(error);
    }
  },
};
