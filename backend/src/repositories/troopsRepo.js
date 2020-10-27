import { db } from '../data/connection';

export const troopsRepo = {
  async getTroops(kingdomId) {
    const sqlQuery =
      'SELECT id, level, hp, attack, defence, started_at, finished_at FROM troops WHERE kingdom_id=?';
    const troopsData = await db.query(sqlQuery, [kingdomId]);
    return troopsData.results;
  },
};
