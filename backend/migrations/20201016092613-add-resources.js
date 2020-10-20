'use strict';

let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('resources', {
    id: {
      type: 'bigint',
      notNull: true,
      primaryKey: true,
      autoIncrement: true
    },
    kingdom_id: {
      type: 'int',
      notNull: true
    },
    type: {
      type: 'char',
      length: 8,
      notNull: true
    },
    amount: {
      type: 'int',
      defaultValue: 1
    },
    generation: {
      type: 'int',
      defaultValue: 1
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP'),
      onUpdate: new String('CURRENT_TIMESTAMP')
    }
  });
};

exports.down = function(db) {
  return db.dropTable('resources');
};

exports._meta = {
  "version": 1
};
