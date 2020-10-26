import { db } from '../data/connection';

export const resourceRepo = {

  async getResources(kingdomId) {
    const sqlGetResources = `SELECT type, amount, generation, UNIX_TIMESTAMP(updatedAt) as updatedAt FROM resources WHERE kingdom_id = ?;`;
    return await db.query(sqlGetResources, kingdomId);
  },

  async updateResources(kingdomId) {
    const sql = `UPDATE resources 
                SET amount=amount + (FLOOR(((UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(updatedAt)) / 60 )) * generation ) 
                WHERE kingdom_id=?;`;
    return await db.query(sql, kingdomId);
  },

  async getGoldAmount(kingdomId) {
    const sqlGetGoldAmount = `SELECT amount FROM resources WHERE type = 'gold' AND kingdom_id = ?;`;
    const getGoldAmount = await db.query(sqlGetGoldAmount, [kingdomId]);
    return getGoldAmount.results;
  },

  async buyBuilding(kingdomId) {
    const sqlBuyBuilding = `UPDATE resources SET amount = amount - 100 WHERE type = 'gold' AND kingdom_id = ?;`;
    return await db.query(sqlBuyBuilding, kingdomId);
  },
  
}