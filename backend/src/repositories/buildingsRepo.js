import { db } from '../data/connection';

export const buildingsRepo = {

  async getBuildings(kingdomId) {
    const buildingsQuery = 'SELECT id, type, level, hp, started_at AS startedAt, finished_at AS finishedAt FROM buildings WHERE kingdom_id=?';
    try {
      const queryData = await db.query(buildingsQuery, [kingdomId]);
      return queryData.results;
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },

  async getSingleBuilding(buildingId) {
    try {
      const sql = 'SELECT id, type, level, hp, started_at AS startedAt, finished_at AS finishedAt, kingdom_id AS kingdomId FROM buildings WHERE id = ?';
      return await db.query(sql, buildingId);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },

  async addBuilding(type, kingdomId) {
    const addBuildingQuery = 'INSERT INTO buildings (type, kingdom_id, finished_at) VALUES (?, ?, TIMESTAMPADD(MINUTE, 1, CURRENT_TIMESTAMP));';
    try {
      return await db.query(addBuildingQuery, [type, kingdomId]);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },

  async getNewBuilding(kingdomId) {
    const getNewBuildingQuery = 'SELECT id, type, level, hp, UNIX_TIMESTAMP(started_at) AS startedAt, UNIX_TIMESTAMP(finished_at) AS finishedAt FROM buildings WHERE id=LAST_INSERT_ID() AND kingdom_id=?;';
    try {
      const newBuildingData = await db.query(getNewBuildingQuery, [kingdomId]);
      return newBuildingData.results;
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },

  async addNewBuilding(type, kingdomId, price) {
    const sqlBuyBuilding = 'UPDATE resources SET amount = amount - ? WHERE type = \'gold\' AND kingdom_id = ?;';
    const addBuildingQuery = 'INSERT INTO buildings (type, kingdom_id, finished_at) VALUES (?, ?, TIMESTAMPADD(MINUTE, 1, CURRENT_TIMESTAMP));';
    const getNewBuildingQuery = 'SELECT id, type, level, hp, UNIX_TIMESTAMP(started_at) AS startedAt, UNIX_TIMESTAMP(finished_at) AS finishedAt FROM buildings WHERE id=LAST_INSERT_ID() AND kingdom_id=?;';

    const connection = await db.connection();

    try {
      await connection.query(sqlBuyBuilding, [price, kingdomId]);
      await connection.query(addBuildingQuery, [type, kingdomId]);
      const newBuildingData = await connection.query(getNewBuildingQuery, [kingdomId]);

      await connection.commit();
      return newBuildingData.results;
    } catch (err) {
      await connection.rollback();
      throw { status: 500, message: err.sqlMessage };
    } finally {
      connection.release();
    }
  },

  async upgradeBuilding(buildingId, hp, upgradeTime) {
    try {
      const sql = `
        UPDATE buildings 
        SET 
        level = level + 1,
        started_at = CURRENT_TIMESTAMP(), 
        finished_at = DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL ? SECOND),
        hp = hp + ?
        WHERE id = ?
        `;
      return await db.query(sql, [upgradeTime, hp, buildingId]);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },

  async resetBuildingsAfterBattle(kingdomId) {
    const sqlQuery = 'UPDATE buildings SET level = 1 WHERE kingdom_id = ? AND type IN ("townhall", "academy");';
    try {
      return await db.query(sqlQuery, [kingdomId]);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },

  async removeBuilding(buildingId) {
    const sqlQuery = 'DELETE FROM buildings WHERE id = ?;';
    try {
      return await db.query(sqlQuery, [buildingId]);
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },

  async getLeadersBuildings() {
    const leadersSql = `
      SELECT kingdomname, SUM(level) AS buildingsLevel 
      FROM kingdoms 
      JOIN buildings ON kingdoms.id = buildings.kingdom_id
      GROUP BY kingdomname
      ORDER BY SUM(level)
      DESC;
    `;
    try {
      const leadersResult = await db.query(leadersSql);
      return leadersResult.results;
    } catch (err) {
      throw { status: 500, message: err.sqlMessage };
    }
  },
};
