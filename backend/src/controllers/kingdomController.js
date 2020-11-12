import { kingdomService } from '../services';

export const kingdomController = {
  async put(req, res, next) {
    const { name } = req.body;
    const { kingdomId } = req.user;
    try {
      const response = await kingdomService.kingdomnameUpdateMainService(
        name,
        kingdomId,
      );
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    const { id, kingdomId } = req.user;
    try {
      const response = await kingdomService.getUserKingdomData(id, kingdomId);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  },
};
