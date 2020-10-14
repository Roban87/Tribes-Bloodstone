import { loginService } from '../services/loginService';

export const loginController = {
  async post(req, res, next) {
    const { password, username } = req.body;
    try {
      const token = await loginService.getToken(username, password);
      res.status(200).json({status: 'ok', token: token});
    } catch(error) {
      next(error);
    }
  },
}
