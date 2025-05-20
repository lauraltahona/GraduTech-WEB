import mysql from 'mysql2/promise';
import 'dotenv/config'

export const db = mysql.createPool({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASE,
    port: 3308,
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0
})
