import { db } from '../data/connection';

export const loginRepo = {
  async getUser(username) {
    try {
      const sql = `SELECT users.id, password, kingdoms.id AS kingdomId FROM users
        JOIN kingdoms ON users.id = kingdoms.user_id
        WHERE username = ?
        ORDER BY kingdoms.id ASC
        LIMIT 1`;
      return await db.query(sql, username);
    } catch(err) {
        throw {status: 500, message: 'Internal server error'};
    }
  }
}
