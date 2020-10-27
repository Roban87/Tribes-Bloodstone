import { registerMapService, kingdomService } from '../services';

export const registerMapController = {
  async post(req, res, next) {
    const kingdomId = req.params.kingdomId;
    const location = req.body.countryCode;
    try {
      const postKingdomData = await registerMapService.postRegisterMap(
        kingdomId,
        location
      );
      const kingdomData = await kingdomService.selectKingdomInformations(kingdomId);
      res.status(200).json(kingdomData);
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    try {
      const kingdoms = await registerMapService.getKingdomMap();
      res.status(200).json({ kingdoms });
    } catch (error) {
      next(error);
    }
  },
};
