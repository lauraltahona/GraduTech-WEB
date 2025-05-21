import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
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

//CON ORM

export const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERDB,
  process.env.PASSWORDDB,
  {
    host: process.env.HOSTDB,
    port: 3308,
    dialect: 'mysql',
    logging:false,
    pool: {
      max: 50,      // máximo de conexiones activas al mismo tiempo
      min: 0,       // mínimo de conexiones
      acquire: 30000, // tiempo máximo (ms) que Sequelize intentará obtener una conexión antes de lanzar error
      idle: 10000    // tiempo máximo (ms) que una conexión puede estar inactiva antes de ser liberada
    }
  }
);

export const Connect = async ()=>{
    try { 

      await sequelize.authenticate()
      await sequelize.sync({ force: false })
        
        console.log('✅ Conexion establecida y sincronizadas');
    } catch (error) {
        console.log('❌ Error al conectar con MySQL:', error);
        
    }
}
