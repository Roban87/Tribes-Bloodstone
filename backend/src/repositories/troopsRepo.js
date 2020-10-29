import { db } from '../data/connection';

export const troopsRepo = {
  async getTroops(kingdomId) {
    const sqlQuery = 'SELECT id, level, hp, attack, defence, started_at, finished_at FROM troops WHERE kingdom_id=?';
    const troopsData = await db.query(sqlQuery, [kingdomId]);
    return troopsData.results;
  },
  async addTroop(kingdomId, rules) {
    const {
      hp, attack, defense, time,
    } = rules;
    try {
      const sql = 'INSERT INTO troops (level, hp, attack, defence, started_at, finished_at, kingdom_id) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(), DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL ? SECOND), ?);';
      return await db.query(sql, [1, hp, attack, defense, time, kingdomId]);
    } catch (err) {
      throw { message: 'Internal server error', status: 500 };
    }
  },
  async getSingleTroop(kingdomId, troopId) {
    try {
      const sqlQuery = 'SELECT id, level, hp, attack, defence, started_at, finished_at FROM troops WHERE kingdom_id = ? AND id = ?';
      return await db.query(sqlQuery, [kingdomId, troopId]);
    } catch (err) {
      throw { message: 'Internal server error', status: 500 };
    }
  },
};
