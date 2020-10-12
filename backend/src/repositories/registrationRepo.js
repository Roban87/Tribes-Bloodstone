import { db } from '../data/connection';

export const registrationRepo = {
    async getUserByUsername(username){
        const sqlQuery = 'SELECT * FROM users WHERE username=?;';
        return await db.query(sqlQuery, [ username ]);
    },
    async insertNewUserWithKingdom(username, password, kingdomname){
        const sqlQueryInsertUser = 'INSERT INTO users(username, password) VALUES(?,?);';
        const sqlQueryInsertKingdom = 'INSERT INTO kingdoms(kingdomname, user_id) VALUES(?,?);';
        const sqlQuerySelect = 'SELECT users.id, users.username, kingdoms.id as kingdom_id FROM users JOIN kingdoms ON users.id=kingdoms.user_id WHERE username=?;';
        const insertUser = await db.query(sqlQueryInsertUser, [ username, password ]);
        const insertKingdom = await db.query(sqlQueryInsertKingdom, [ kingdomname, insertUser.results.insertId ]);     
        return await db.query(sqlQuerySelect, [username]);
    }
} 