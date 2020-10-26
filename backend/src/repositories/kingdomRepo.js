import { db } from '../data/connection';

export const kingdomRepo = {
  async getKingdom(kingdomId) {
    const sqlQueryListOfKingdom = 'SELECT * FROM kingdoms WHERE id = ?;';
    return await db.query(sqlQueryListOfKingdom, [kingdomId]);
  },

  async insertNewKingdom(kingdomname, user_id) {
    const sqlQueryInsertKingdom =
      'INSERT INTO kingdoms(kingdomname, user_id) VALUES(?,?);';
    return await db.query(sqlQueryInsertKingdom, [kingdomname, user_id]);
  },

  async getKingdomMap() {
    try {
      const kingdomsQuery =
        'SELECT id AS kingdom_id, kingdomname, population, location FROM kingdoms';
      const queryData = await db.query(kingdomsQuery);
      return queryData.results;
    } catch (error) {
      throw { status: 500, message: 'Internal server error' };
    }
  },

  async postRegisterMap(kingdomId, location) {
    try {
      const registerMapQuery = `UPDATE kingdoms SET location=? WHERE id=?;`;
      const queryData = await db.query(registerMapQuery, [location, kingdomId]);

      const resKingdomsIdQuery = `SELECT id FROM kingdoms WHERE id=?;`;
      const resKingdomsNameQuery = `SELECT kingdomname FROM kingdoms WHERE id=?;`;
      const resKingdomsUserQuery = `SELECT user_id FROM kingdoms WHERE id=?;`;
      const resBuildingsQuery = `SELECT building_id, type, level, hp, started_at, finished_at FROM buildings WHERE kingdom_id=?;`;
      const resResourcesQuery = `SELECT type, amount, generation FROM resources WHERE kingdomId=?;`;
      const resTroopsQuery = `SELECT id, level, hp, attack, defence, started_at, finished_at FROM troops WHERE kingdom_id=?;`;
      const resLocationQuery = `SELECT location FROM kingdoms WHERE id=?;`;
      const resKingdomsIdData = await db.query(resKingdomsIdQuery, [kingdomId]);
      const resKingdomsNameData = await db.query(resKingdomsNameQuery, [
        kingdomId,
      ]);
      const resKingdomsUserData = await db.query(resKingdomsUserQuery, [
        kingdomId,
      ]);
      const resBuildingsData = await db.query(resBuildingsQuery, [kingdomId]);
      const resResourcesData = await db.query(resResourcesQuery, [kingdomId]);
      const resTroopsData = await db.query(resTroopsQuery, [kingdomId]);
      const resLocationData = await db.query(resLocationQuery, [kingdomId]);

      const kingdom = {
        id: resKingdomsIdData.results[0].id,
        name: resKingdomsNameData.results[0].kingdomname,
        userId: resKingdomsUserData.results[0].user_id,
        buildings: resBuildingsData.results,
        resources: resResourcesData.results,
        troops: resTroopsData.results,
        locaion: { country_code: resLocationData.results[0].location },
      };

      return kingdom;
    } catch (error) {
      throw { status: 500, message: 'Internal server error' };
    }
  },
  async updateName(kingdomname, kingdom_id) {
    const sqlQuery = 'UPDATE kingdoms SET kingdomname=? WHERE id=?;';
    return await db.query(sqlQuery, [kingdomname, kingdom_id]);
  },
};
