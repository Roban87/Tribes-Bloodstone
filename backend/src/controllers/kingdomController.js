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
    const { kingdomId } = req.user;
    try {
      const response = await kingdomService.getKingdom(kingdomId);
      res.json(response.results);
    } catch (error) {
      next(error);
    }
  },
};
