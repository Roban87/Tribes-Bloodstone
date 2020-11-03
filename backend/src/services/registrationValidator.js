import bcrypt from 'bcrypt';
import { userRepo } from '../repositories/userRepo';
import { kingdomRepo, resourceRepo, buildingsRepo } from '../repositories';

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
      username !== undefined
      && password !== undefined
      && password.length < 8
    ) {
      return {
        message: 'Password must be 8 characters.',
        status: 400,
      };
    }
    return undefined;
  },

  async userNameTaken(username) {
    const userSelected = await userRepo.getUserByUsername(username);
    if (userSelected.results.length === 1) {
      return {
        message: 'Username is already taken.',
        status: 400,
      };
    }
    return undefined;
  },

  async insertBasicElements(kingdomId) {
    await resourceRepo.insertResource(kingdomId, 'food', 0);
    await resourceRepo.insertResource(kingdomId, 'gold', 100);
    await buildingsRepo.addBuilding('townhall', kingdomId);
    await buildingsRepo.addBuilding('mine', kingdomId);
  },

  async insertNewUser(username, password, kingdomname) {
    const insertUser = await userRepo.insertNewUser(username, password);
    await kingdomRepo.insertNewKingdom(
      kingdomname,
      insertUser.results.insertId,
    );
    const selectUserWithKingdomname = await userRepo.selectUserWithKingdom(
      username,
    );
    await this.insertBasicElements(insertUser.results.insertId);
    return {
      userId: selectUserWithKingdomname.results[0].id,
      username: selectUserWithKingdomname.results[0].username,
      kingdomId: selectUserWithKingdomname.results[0].kingdom_id,
    };
  },

  async registUser(username, password, kingdomname) {
    const validationObject = this.validateUsernameAndPassword(
      username,
      password,
    );
    if (validationObject !== undefined) {
      throw validationObject;
    }
    const usernameTakenObject = await this.userNameTaken(username);
    if (usernameTakenObject !== undefined) {
      throw usernameTakenObject;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (kingdomname !== undefined) {
      return await this.insertNewUser(username, hashedPassword, kingdomname);
    }
    return await this.insertNewUser(username, hashedPassword, username);
  },
};
