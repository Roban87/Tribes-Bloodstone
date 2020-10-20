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
  db.addForeignKey('kingdoms', 'users', 'user_id_FK',
  {
    'user_id': 'id'
  },
  {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT'
  }, callback);
};

exports.down = function(db, callback) {
  db.removeForeignKey('kingdoms', 'user_id_FK', callback)
};

exports._meta = {
  "version": 1
};
