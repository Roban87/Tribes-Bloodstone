import { loginRepo } from '../repositories/loginRepo';
import config from '../config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const loginService = {
  validateUser(username, password) {
    if (!password) {
      return !username ? {message: "All fields required", status: 400} : {message: "Password is required", status: 400};
    }
    if(!username) {
      return {message: "Username is required", status: 400};
    }
  },

  async getToken (username, password) {
    const inputError = this.validateUser(username, password);
    if (inputError) {
      throw inputError;
    }
    let userData = await loginRepo.getUser(username);
    if (userData.results.length === 0 || !bcrypt.compareSync(password, userData.results[0].password)) {
      throw {message: 'Username or password is incorrect', status: 400};
    }
    let token = jwt.sign({id: userData.results[0].id, kingdomId: userData.results[0].kingdomId}, config.secret || 'somesecret');
    return token;
  }
}