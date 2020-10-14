import { db } from '../data/connection';

export const loginRepo = {
  async getUser(username) {
    try {
      const sql = 'SELECT * FROM users WHERE username = ?';
      return await db.query(sql, username);
    } catch(err) {
        throw {status: 500, message: 'Internal server error'}
    }
  }
}