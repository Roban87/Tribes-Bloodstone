import { db } from '../data/connection';

export const userRepo = {
  async getUserByUsername(username) {
    const sqlQuery = 'SELECT * FROM users WHERE username=?;';
    return await db.query(sqlQuery, [username]);
  },
  async insertNewUser(username, password) {
    const sqlQueryInsertUser =
      'INSERT INTO users(username, password) VALUES(?,?);';
    return await db.query(sqlQueryInsertUser, [username, password]);
  },
  async selectUserWithKingdom(username) {
    const sqlQuerySelect =
      'SELECT users.id, users.username, kingdoms.id as kingdom_id FROM users JOIN kingdoms ON users.id=kingdoms.user_id WHERE username=?;';
    return await db.query(sqlQuerySelect, [username]);
  }
};
