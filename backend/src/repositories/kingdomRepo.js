import { db } from '../data/connection';

export const kingdomRepo = {

  async getKingdom(kingdomId) {
    const sqlQueryListOfKingdom = 'SELECT * FROM kingdoms WHERE id = ?;';
    return await db.query(sqlQueryListOfKingdom, [kingdomId]);
  },

  async insertNewKingdom(kingdomname, user_id) {
    const sqlQueryInsertKingdom =
      'INSERT INTO kingdoms(kingdomname, user_id) VALUES(?,?);';
    return await db.query(sqlQueryInsertKingdom, [kingdomname, user_id]);
  },
};
