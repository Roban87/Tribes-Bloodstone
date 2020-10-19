import { db } from '../data/connection';

export const regMapRepo = {
  async postRegMap(kingdomId, location) {
    const regMapQuery =
      'INSERT INTO kingdoms (location) VALUES (?) WHERE kingdoms.id=?';
    const queryData = await db.query(regMapQuery, [location, kingdomId]);
    const resQuery = await `SELECT k.*, b.*, u.*
    FROM kingdoms k, buildings b, users u
    WHERE k.id = ? AND k.id = b.kingdom_id AND k.user_id = u.id;`
    const resData = await db.query(resQuery, [kingdomId]);
    return resData.results;
  },
};
