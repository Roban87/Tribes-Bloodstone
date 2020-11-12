import { db } from '../data/connection';

export const userRepo = {
  async getUserByUsername(username) {
    const sqlQuery = 'SELECT * FROM users WHERE username=?;';
    try {
      return await db.query(sqlQuery, [username]);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },
  async insertNewUser(username, password) {
    const sqlQueryInsertUser = 'INSERT INTO users(username, password) VALUES(?,?);';
    try {
      return await db.query(sqlQueryInsertUser, [username, password]);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },
  async selectUserWithKingdom(username) {
    const sqlQuerySelect = 'SELECT users.id, users.username, kingdoms.id as kingdom_id FROM users JOIN kingdoms ON users.id=kingdoms.user_id WHERE username=?;';
    try {
      return await db.query(sqlQuerySelect, [username]);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },
  async getUser(username) {
    const sql = `SELECT users.id, password, kingdoms.id AS kingdomId FROM users
      JOIN kingdoms ON users.id = kingdoms.user_id
      WHERE username = ?
      ORDER BY kingdoms.id ASC
      LIMIT 1`;
    try {
      return await db.query(sql, username);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },
  async getUserKingdomData(userId, kingdomId) {
    const sqlQuery = `SELECT 
                        username,
                        kingdoms.id AS kingdomId,
                        kingdomname as kingdomName,
                        location FROM users
                      JOIN kingdoms ON kingdoms.user_id = users.id
                      WHERE kingdoms.id = ? AND users.id = ?`;
    try {
      const userQuery = await db.query(sqlQuery, [kingdomId, userId]);
      return userQuery.results[0];
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },
};
