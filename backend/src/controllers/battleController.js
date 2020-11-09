import { battleService } from '../services/battleService';

export const battleController = {
  async get(req, res, next) {
    const { enemyId } = req.params;
    const { kingdomId } = req.user;

    try {
      const result = await battleService.handleBattle(kingdomId, enemyId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  },
};
