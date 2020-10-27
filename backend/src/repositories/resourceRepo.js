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

  async handlePurchase(kingdomId, price) {
    try {
      const sql = `
        UPDATE resources
        SET amount = amount - ?
        WHERE kingdom_id = ?
        AND type = 'gold';  
      `
      return await db.query(sql, [price, kingdomId]);
    } catch(err) {
      throw {status: 500, message: 'Internal server error'};
    }
  },
  
  async updateResourceRate(kingdomId, resourceType, increment) {
    try {
      const sql = `
        UPDATE resources
        SET generation = generation + ?
        WHERE kingdom_id = ? 
        AND type = ?;
      `;
      return await db.query(sql, [increment, kingdomId, resourceType]);
    } catch(err) {
      throw {status: 500, message: 'Internal server error'};
    }
  }, 
}