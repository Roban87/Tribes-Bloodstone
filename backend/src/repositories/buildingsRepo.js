import { db } from '../data/connection';
import { resourceRepo } from './resourceRepo';

export const buildingsRepo = {

  async getBuildings(kingdomId) {
    const buildingsQuery =
      'SELECT id, type, level, hp, started_at, finished_at FROM buildings WHERE kingdom_id=?';
    const queryData = await db.query(buildingsQuery, [kingdomId]);
    return queryData.results;
  },

  async getSingleBuilding(buildingId) {
    try {
      const sql = 'SELECT * FROM buildings WHERE id = ?';
      return await db.query(sql, buildingId);
    } catch(err) {
      throw {status: 500, message: 'Internal server error'};
    }
  },

  async addBuilding(type, kingdomId) {
    const addBuildingQuery = `INSERT INTO buildings (type, kingdom_id, finished_at) VALUES (?, ?, TIMESTAMPADD(MINUTE, 1, CURRENT_TIMESTAMP));`;
    return await db.query(addBuildingQuery, [type, kingdomId]);
  },

  async getNewBuilding(kingdomId) {
    const getNewBuildingQuery = `SELECT id, type, level, hp, UNIX_TIMESTAMP(started_at) AS started_at, UNIX_TIMESTAMP(finished_at) AS finished_at FROM buildings WHERE id=LAST_INSERT_ID() AND kingdom_id=?;`;
    const newBuildingData =  await db.query(getNewBuildingQuery, [kingdomId]);
    return newBuildingData.results;
  },

  async addNewBuilding(type, kingdomId) {
    const sqlBuyBuilding = `UPDATE resources SET amount = amount - 100 WHERE type = 'gold' AND kingdom_id = ?;`;
    const addBuildingQuery = `INSERT INTO buildings (type, kingdom_id, finished_at) VALUES (?, ?, TIMESTAMPADD(MINUTE, 1, CURRENT_TIMESTAMP));`;
    const getNewBuildingQuery = `SELECT id, type, level, hp, UNIX_TIMESTAMP(started_at) AS started_at, UNIX_TIMESTAMP(finished_at) AS finished_at FROM buildings WHERE id=LAST_INSERT_ID() AND kingdom_id=?;`;

    const connection = await db.connection();

    try {

      await connection.query(sqlBuyBuilding, [kingdomId]);
      await connection.query(addBuildingQuery, [type, kingdomId]);
      const newBuildingData = await connection.query(getNewBuildingQuery, [kingdomId]);
      
      await connection.commit();
      return newBuildingData.results;

    } catch (error) {

      await connection.rollback();
      throw error;

    } finally {

      connection.release();

    }
  },
  
  async upgradeBuilding(buildingId, hpIncrease, upgradeTime) {
    try {
      const sql = `
        UPDATE TABLE buildings 
        SET 
        level = level + 1,
        started_at = CURRENT_TIMESTAMP(), 
        finished_at = DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL ? SECOND),
        hp = hp + ?
        WHERE id = ?
        `
      return await db.query(sql, [upgradeTime, hpIncrease, buildingId])
    } catch(err) {
      throw {status: 500, message: 'Internal server error'};
    } 
  },
};
