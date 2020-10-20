import { db } from '../data/connection';

export const regMapRepo = {
  async postRegMap(kingdomId, location) {
    // try {
      const regMapQuery = `UPDATE kingdoms SET location=? WHERE id=?`;
      const queryData = await db.query(regMapQuery, [location, kingdomId]);
      console.log('inserted');
    //   const resQuery = await `SELECT k.*, b.*, u.*
    // FROM kingdoms k, buildings b, users u
    // WHERE k.id = ? AND k.id = b.kingdom_id AND k.user_id = u.id;`;
      const resQuery = `SELECT * FROM kingdoms JOIN buildings on kingdoms.id=building_id `
      const resData = await db.query(resQuery, [kingdomId]);
      return resData.results;
    // } catch (error) {
    //   throw { status: 500, message: 'Internal server error' };
    // }
  },
};
