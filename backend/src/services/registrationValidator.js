import { registrationRepo } from '../repositories/registrationRepo.js';
import { userRepo } from '../repositories/userRepo.js';
import bcrypt from 'bcrypt';

export const registerValidator = {
  validateUsernameAndPassword(username, password) {
    if (username !== undefined && password === undefined) {
      return {
        message: 'Password is required.',
        status: 400,
      };
    }
    if (username === undefined && password !== undefined) {
      return {
        message: 'Username is required.',
        status: 400,
      };
    }
    if (username === undefined && password === undefined) {
      return {
        message: 'Username and password is required.',
        status: 400,
      };
    }
    if (
      username !== undefined &&
      password !== undefined &&
      password.length < 8
    ) {
      return {
        message: 'Password must be 8 characters.',
        status: 400,
      };
    }
  },
  async userNameTaken(username) {
    let userSelected = await userRepo.getUserByUsername(username);
    if (userSelected.results.length === 1) {
      return {
        message: 'Username is already taken.',
        status: 400,
      };
    }
  },
  async registUser(username, password, kingdomname) {
    let validationObject = this.validateUsernameAndPassword(username, password);
    if (validationObject !== undefined) {
      throw validationObject;
    }
    let usernameTakenObject = await this.userNameTaken(username);
    if (usernameTakenObject !== undefined) {
      throw usernameTakenObject;
    }
    const saltRounds = 10;
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    if (kingdomname !== undefined) {
      const insertNewUser = await registrationRepo.insertNewUserWithKingdom(
        username,
        hashedPassword,
        kingdomname
      );
      return {
        userId: insertNewUser.results[0].id,
        username: insertNewUser.results[0].username,
        kingdomId: insertNewUser.results[0].kingdom_id,
      };
    } else {
      const insertNewUser = await registrationRepo.insertNewUserWithKingdom(
        username,
        hashedPassword,
        username
      );
      return {
        userId: insertNewUser.results[0].id,
        username: insertNewUser.results[0].username,
        kingdomId: insertNewUser.results[0].kingdom_id,
      };
    }
  },
};
