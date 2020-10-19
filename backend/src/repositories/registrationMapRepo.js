import { db } from '../data/connection';

export const registrationMapRepo = {
  async postRegMap(kingdomId, code) {
    const regMapQuery =
      'INSERT INTO kingdoms (location) VALUES (?) WHERE kingdoms.id=?';
    const queryData = await db.query(regMapQuery, [code, kingdomId]);
    const resData = await db.
    return queryData.results;
  },
};
