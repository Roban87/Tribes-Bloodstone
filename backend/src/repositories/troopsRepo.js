import { db } from '../data/connection';

export const troopsRepo = {
  async getTroops(kingdomId) {
    const sqlQuery = 'SELECT id, level, hp, attack, defence, started_at AS startedAt, finished_at AS finishedAt FROM troops WHERE kingdom_id=?';
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
      const sqlQuery = 'SELECT id, level, hp, attack, defence, started_at AS startedAt, finished_at AS finishedAt FROM troops WHERE kingdom_id = ? AND id = ?';
      return await db.query(sqlQuery, [kingdomId, troopId]);
    } catch (err) {
      throw { message: 'Internal server error', status: 500 };
    }
  },
  async removeTroops(troopIdArray) {
    const sqlQuery = 'DELETE FROM troops WHERE id IN (?)';
    try {
      return await db.query(sqlQuery, [troopIdArray]);
    } catch (err) {
      throw { message: 'Internal server error', status: 500 };
    }
  },
  async injureTroop(troop) {
    const sqlQuery = 'UPDATE troops SET hp = ? WHERE id = ?';
    try {
      return await db.query(sqlQuery, [troop.hp, troop.id]);
    } catch (error) {
      throw { message: 'Internal server error', status: 500 };
    }
  },
  async upgradeTroops(amount, level, kingdomId, rules) {
    try {
      const {
        time, hp, attack, defense,
      } = rules;
      const sqlQuery = `
      UPDATE troops SET 
      level = level + 1, 
      hp = level * ?, 
      attack = level * ?, 
      defence = level * ?, 
      started_at = CURRENT_TIMESTAMP(), 
      finished_at = DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL (level * ?) SECOND)
      WHERE kingdom_id = ? AND level = ?
      LIMIT ?;
      `;
      await db
        .query(sqlQuery, [hp, attack, defense, time, kingdomId, level, Number(amount)]);
      const responseQuery = 'SELECT * FROM troops WHERE kingdom_id = ? ORDER BY started_at DESC LIMIT ?;';
      return await db.query(responseQuery, [kingdomId, Number(amount)]);
    } catch (error) {
      throw { message: 'Internal server error', status: 500 };
    }
  },
};
