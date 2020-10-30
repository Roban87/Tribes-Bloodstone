import { rulesService } from '../services';

export const rulesController = {
  get(req, res, next) {
    try {
      const rules = rulesService.getRules();
      res.status(200).json(rules);
    } catch (err) {
      next(err);
    }
  },
};
