import { kingdomUpdateNameService } from '../services';

export const kingdomUpdateNameController = {
  async put(req, res, next) {
    const { name } = req.body;
    const { kingdomId } = req.user;
    try {
      const response = await kingdomUpdateNameService.kingdomnameUpdateMainService(
        name,
        kingdomId
      );
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
};
