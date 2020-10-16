import { db } from '../data/connection';

export const resourceRepo = {

  async getResources(kingdomId) {
    try {
      const sql = `SELECT type, amount, generation, UNIX_TIMESTAMP(updatedAt) as updatedAt FROM resources WHERE kingdomId = ?;`;
      return await db.query(sql, kingdomId);
    } catch(error) {
      throw {status: 500, message: 'Internal server error'};
    }
  }
  
}