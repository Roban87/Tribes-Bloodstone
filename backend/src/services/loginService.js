import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userRepo } from '../repositories';
import config from '../config';

export const loginService = {
  validateUser(username, password) {
    if (!password) {
      return !username ? { message: 'All fields required', status: 400 } : { message: 'Password is required', status: 400 };
    }
    if (!username) {
      return { message: 'Username is required', status: 400 };
    }
    return false;
  },

  async getToken(username, password) {
    const inputError = this.validateUser(username, password);
    if (inputError) {
      throw inputError;
    }
    const userData = await userRepo.getUser(username);
    if (userData.results.length === 0
      || !bcrypt.compareSync(password, userData.results[0].password)) {
      throw { message: 'Username or password is incorrect', status: 400 };
    }
    const token = jwt.sign({
      id: userData.results[0].id,
      kingdomId: userData.results[0].kingdomId,
    }, config.secret || 'somesecret');
    return token;
  },
};
