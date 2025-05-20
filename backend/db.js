import mysql from 'mysql2/promise';
import {drizzle} from 'drizzle-orm/mysql2'
import 'dotenv/config'

console.log(process.env.HOSTDB);
export const db = mysql.createPool({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASE,
    port: 3308,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export const connect = async ()=>{
    try { 
        const db1 = await mysql.createConnection({
        host: process.env.HOSTDB,
        user: process.env.USERDB,
        password: process.env.PASSWORDDB,
        database: process.env.DATABASE,
        port: 3308
        })
        const [rows] = await db.query('SELECT 1 + 1 AS result')
        console.log("conecto");
        await db.end()
    } catch (error) {
        console.error('❌ Error de conexión:', error);
    }
}

export const client = drizzle({ client:db })