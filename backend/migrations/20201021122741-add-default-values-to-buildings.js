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

exports.up = function(db) {
  return db.changeColumn('buildings', 'level', {
    type: 'int',
    defaultValue: 1
  })
  .then(
    function(result) {
      db.changeColumn('buildings', 'hp', {
        type: 'int',
        defaultValue: 100
      })
    },
    function(err) {
      return;
    }
  )
  .then(
    function(result) {
      db.changeColumn('buildings', 'started_at', {
        type: 'timestamp',
        defaultValue: new String('CURRENT_TIMESTAMP')
      })
    },
    function(err) {
      return;
    }
  )
  .then(
    function(result) {
      db.changeColumn('buildings', 'finished_at', {
        type: 'timestamp',
        defaultValue: null
      })
    },
    function(err) {
      return;
    }
  );
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
