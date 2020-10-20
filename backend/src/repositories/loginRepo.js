import { db } from '../data/connection';

export const loginRepo = {
  async getUser(username) {
    try {
<<<<<<< HEAD
      const sql = `SELECT users.id, password, kingdoms.id AS kingdomId FROM users
        JOIN kingdoms ON users.id = kingdoms.user_id
        WHERE username = ?
        ORDER BY kingdoms.id ASC
        LIMIT 1`;
=======
      const sql = `
      SELECT users.id, kingdoms.id AS kingdomId, users.password FROM users 
      JOIN kingdoms ON kingdoms.user_id = users.id
      WHERE username = ?
      ORDER BY kingdoms.id ASC
      LIMIT 1
      `;
>>>>>>> 8358911...  added handlers for One Building request in buildingsService and buildingsController
      return await db.query(sql, username);
    } catch(err) {
        throw {status: 500, message: 'Internal server error'};
    }
  }
}
