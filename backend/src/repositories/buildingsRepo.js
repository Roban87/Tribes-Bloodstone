import { db } from '../data/connection';

export const buildingsRepo = {
  async getBuildings(kingdomId) {
    const buildingsQuery =
      'SELECT buildings.id, type, level, hp, started_at, finished_at FROM buildings WHERE kingdom_id=?';
    const queryData = await db.query(buildingsQuery, [kingdomId]);
    return queryData.results;
  },
  async getSingleBuilding(buildingId) {
    try {
      const sql = 'SELECT * FROM buildings WHERE id = ?';
      return await db.query(sql, buildingId);
    } catch(err) {
<<<<<<< HEAD
        throw {status: 500, message: 'Internal server error'};
=======
      throw {status: 500, message: 'Internal server error'};
>>>>>>> f73dc9b... added getSingleBuilding method to buildingsRepo
    }
  },
};
