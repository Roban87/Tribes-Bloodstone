import { registerValidator } from '../services';

export const registerController = {
  async post(req, res, next) {
    const { username, password, kingdomname } = req.body;
    try {
      const response = await registerValidator.registUser(username, password, kingdomname);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
};
