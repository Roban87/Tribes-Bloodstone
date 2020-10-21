'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  return db.createTable('troops', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    level: 'int',
    hp: 'int',
    attack: 'int',
    defence: 'int',
    started_at: 'timestamp',
    finished_at: 'timestamp',
    kingdom_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'kingdom_id_fk',
        table: 'kingdoms',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT',
        },
        mapping: 'id',
      },
    },
  }, callback);
};

exports.down = function (db) {
  return db.dropTable('troops');
};

exports._meta = {
  version: 1,
};
