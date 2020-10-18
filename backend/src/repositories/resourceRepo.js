import { db } from '../data/connection';

export const resourceRepo = {

  async getResources(kingdomId) {
      const sql = `SELECT type, amount, generation, UNIX_TIMESTAMP(updatedAt) as updatedAt FROM resources WHERE kingdom_id = ?;`;
      return await db.query(sql, kingdomId);
  },

  async updateResources(kingdomId) {
      const sql = `UPDATE resources 
                  SET amount=amount + (FLOOR(((UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(updatedAt)) / 60 )) * generation ) 
                  WHERE kingdom_id=?;`;
      return await db.query(sql, [kingdomId]);
  }
  
}