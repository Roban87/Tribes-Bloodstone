import { db } from '../data/connection';

export const updateKingdomName = {
  async update(kingdomname, kingdom_id) {
    const sqlQuery = 'UPDATE kingdoms SET kingdomname=? WHERE id=?;';
    return await db.query(sqlQuery, [kingdomname, kingdom_id]);
  },
};
