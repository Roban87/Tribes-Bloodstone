import { loginRepo } from '../repositories/loginRepo';
import config from '../config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const loginService = {
  async getToken (username, password) {
    if (!password) {
      throw !username ? {message: "All fields required", status: 400} : {message: "Password is required", status: 400};
    } else if(!username) {
      throw {message: "Username is required", status: 400};
    }
      let userData = await loginRepo.getUser(username);
    if (userData.results.length === 0 || !bcrypt.compareSync(password, userData.results[0].phash)) {
      throw {message: 'Username or password is incorrect', status: 400};
    } else {
      let token = jwt.sign({username: username, id: userData.results[0].id}, config.secret);
      return token;
    }
  }
}