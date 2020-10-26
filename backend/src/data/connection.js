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
          return reject(error);
        }
        const query = (query, values) => {
          return new Promise ((resolve, reject) => {
            connection.query(query, values, (error, results, fields) => {
              if (error) {
                reject(error);
              }
              resolve({results, fields});
            });
          });
        };
        const release = () => {
          return new Promise ((resolve, reject) => {
            if (error) {
              reject(error);
            }
            resolve(connection.release());
          });
        };
        const commit = () => {
          return new Promise ((resolve, reject) => {
            if (error) {
              reject(error);
            }
            resolve(connection.commit());
          });
        };
        const rollback = () => {
          return new Promise ((resolve, reject) => {
            if (error) {
              reject(error);
            }
            resolve(connection.rollback());
          });
        };
        resolve({query, release, commit, rollback});
      });
    });
  },
};

