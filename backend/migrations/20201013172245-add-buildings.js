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

exports.up = function (db, callback) {
  db.createTable('buildings', {
<<<<<<< HEAD
<<<<<<< HEAD
    id: { type: 'int', primaryKey: true, autoIncrement: true },
=======
    id: { type: 'int', primaryKey: true },
>>>>>>> 43b9448... added kingdom_id FK to buildings and resources tables in migration
=======
    id: { type: 'int', primaryKey: true },
>>>>>>> 43b9448... added kingdom_id FK to buildings and resources tables in migration
    type: 'string',
    level: 'int',
    hp: 'int',
    started_at: 'timestamp',
    finished_at: 'timestamp',
    kingdom_id: 'int'
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('buildings', callback);
};

exports._meta = {
  "version": 1
};
