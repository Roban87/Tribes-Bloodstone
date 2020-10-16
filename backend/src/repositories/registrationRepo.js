import { db } from '../data/connection';
import { userRepo } from './userRepo';
import { kingdomRepo } from './kingdomRepo';

export const registrationRepo = {
  async insertNewUserWithKingdom(username, password, kingdomname) {
    const insertUser = await userRepo.insertNewUser(username, password);
    const insertKingdom = await kingdomRepo.insertNewKingdom(
      kingdomname,
      insertUser.results.insertId
    );
    const sqlQuerySelect =
      'SELECT users.id, users.username, kingdoms.id as kingdom_id FROM users JOIN kingdoms ON users.id=kingdoms.user_id WHERE username=?;';
    return await db.query(sqlQuerySelect, [username]);
  },
};
