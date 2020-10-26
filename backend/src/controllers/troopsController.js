import { troopsService } from '../services/';

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
}