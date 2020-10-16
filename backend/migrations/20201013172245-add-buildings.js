'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('buildings', {
    building_id: { type: 'int', primaryKey: true },
    type: 'string',
    level: 'int',
    hp: 'int',
    started_at: 'timestamp',
    finished_at: 'timestamp',
    kingdom_id: 'int'
  });
};

exports.down = function (db) {
  return db.dropTable('buildings');
};

exports._meta = {
  "version": 1
};
