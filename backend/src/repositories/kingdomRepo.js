import { db } from '../data/connection';

export const kingdomRepo = {
  async getKingdom(kingdomId) {
    const sqlQueryListOfKingdom = 'SELECT * FROM kingdoms WHERE id = ?;';
    return await db.query(sqlQueryListOfKingdom, [kingdomId]);
  },

  async insertNewKingdom(kingdomname, userId) {
    const sqlQueryInsertKingdom = 'INSERT INTO kingdoms(kingdomname, user_id) VALUES(?,?);';
    return await db.query(sqlQueryInsertKingdom, [kingdomname, userId]);
  },

  async getKingdomMap() {
    try {
      const kingdomsQuery = 'SELECT id AS kingdom_id, kingdomname, population, location FROM kingdoms';
      const queryData = await db.query(kingdomsQuery);
      return queryData.results;
    } catch (error) {
      throw { status: 500, message: 'Internal server error' };
    }
  },

  async postRegisterMap(kingdomId, location) {
    try {
      const registerMapQuery = 'UPDATE kingdoms SET location=? WHERE id=?;';
      await db.query(registerMapQuery, [location, kingdomId]);
      return;
    } catch (error) {
      throw { status: 500, message: 'Internal server error' };
    }
  },
  async updateName(kingdomname, kingdomId) {
    const sqlQuery = 'UPDATE kingdoms SET kingdomname=? WHERE id=?;';
    return await db.query(sqlQuery, [kingdomname, kingdomId]);
  },
};
