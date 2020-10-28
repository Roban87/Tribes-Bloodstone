import mysql from 'mysql';

import config from '../config';

const pool = mysql.createPool({
  connectionLimit: 2,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
});

export const db = {
  query(query, values) {
    return new Promise((resolve, reject) => {
      pool.query(query, values, (err, results, fields) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ results, fields });
      });
    });
  },

  connection() {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
          return;
        }
        const query = (sqlQuery, values) => new Promise((resolveQuery, rejectQuery) => {
          connection.query(sqlQuery, values, (errorQuery, results, fields) => {
            if (errorQuery) {
              rejectQuery(errorQuery);
            }
            resolveQuery({ results, fields });
          });
        });
        const release = () => new Promise((resolveRelease, rejectRelease) => {
          if (error) {
            rejectRelease(error);
          }
          resolveRelease(connection.release());
        });
        const commit = () => new Promise((resolveCommit, rejectCommit) => {
          if (error) {
            rejectCommit(error);
          }
          resolveCommit(connection.commit());
        });
        const rollback = () => new Promise((resolveRollback, rejectRollback) => {
          if (error) {
            rejectRollback(error);
          }
          resolveRollback(connection.rollback());
        });
        resolve({
          query, release, commit, rollback,
        });
      });
    });
  },
};
