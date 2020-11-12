import { db } from '../data/connection';

export const kingdomRepo = {
  async getKingdom(kingdomId) {
    const sqlQueryListOfKingdom = 'SELECT * FROM kingdoms WHERE id = ?;';
    try {
      return await db.query(sqlQueryListOfKingdom, [kingdomId]);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },

  async insertNewKingdom(kingdomname, userId) {
    const sqlQueryInsertKingdom = 'INSERT INTO kingdoms(kingdomname, user_id) VALUES(?,?);';
    try {
      return await db.query(sqlQueryInsertKingdom, [kingdomname, userId]);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },

  async getKingdomMap() {
    const kingdomsQuery = `SELECT kingdoms.id AS kingdomId, kingdomname, IFNULL(COUNT(troops.id), 0) AS population, location 
    FROM kingdoms 
    LEFT JOIN troops ON kingdoms.id = troops.kingdom_id 
    GROUP BY kingdoms.id, kingdomname, location`;
    try {
      const queryData = await db.query(kingdomsQuery);
      return queryData.results;
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },

  async postRegisterMap(kingdomId, location) {
    const registerMapQuery = 'UPDATE kingdoms SET location=? WHERE id=?;';
    try {
      await db.query(registerMapQuery, [location, kingdomId]);
      return;
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },
  async updateName(kingdomname, kingdomId) {
    const sqlQuery = 'UPDATE kingdoms SET kingdomname=? WHERE id=?;';
    try {
      return await db.query(sqlQuery, [kingdomname, kingdomId]);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },
};
