import { Sequelize } from 'sequelize';
import 'dotenv/config'
import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});


export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // desactiva logs de SQL en consola
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  },
  pool: {
    max: 50,
    min: 10,
    acquire: 30000,
    idle: 10000
  }
});


export const Connect = async ()=>{
    try { 

      await sequelize.authenticate()
      await sequelize.sync({ force: false });
        
        console.log('✅ Conexion establecida y sincronizadas');
    } catch (error) {
        console.log('❌ Error al conectar con PostgreSql:', error);
        
    }
}
