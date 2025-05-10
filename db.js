import mysql from 'mysql2/promise';
export const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'berlin1234',
    database: 'proyectodb',
    port: 3308,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})