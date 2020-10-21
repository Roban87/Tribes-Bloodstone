import { db } from '../data/connection';

export const buildingsRepo = {
  async getBuildings(kingdomId) {
    const buildingsQuery =
      'SELECT buildings.id, type, level, hp, started_at, finished_at FROM buildings WHERE kingdom_id=?';
    const queryData = await db.query(buildingsQuery, [kingdomId]);
    return queryData.results;
  },
};
