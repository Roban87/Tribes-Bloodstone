import { db } from '../data/connection';

export const getKingdomInformations = {
  async get(kingdom_id) {
    const sqlQuery = 'SELECT id, kingdomname, population, location FROM kingdoms WHERE id=?;';
    return await db.query(sqlQuery, [kingdom_id]);
  }
};