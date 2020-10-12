import { db } from '../data/connection';

export const loginRepo = {
  async getUser(username) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    return await db.query(sql, username);
  }
}