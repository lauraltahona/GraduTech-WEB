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


export const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERDB,
  process.env.PASSWORDDB,
  {
    host: process.env.HOSTDB,
    port: 3308,
    dialect: 'mysql',
    logging:false
  }
);

export const Connect = async ()=>{
    try { 

      await sequelize.authenticate()
      await sequelize.sync({ force: true })
        
        console.log('✅ Conexion establecida y sincronizadas');
    } catch (error) {
        console.log('❌ Error al conectar con MySQL:', error);
        
    }
}
