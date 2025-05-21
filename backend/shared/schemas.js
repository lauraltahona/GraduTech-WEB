import { sequelize } from "../db.js";
import { DataTypes } from 'sequelize';

export const Rol = sequelize.define('rols', {
  idRol: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombreRol: { type: DataTypes.STRING(50) }
});

export const User = sequelize.define('users', {
  idUsers: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  correo: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  contraseña: { type: DataTypes.STRING(250), allowNull: false },
  idRol: { type: DataTypes.INTEGER, references: { model: Rol, key: 'idRol' } }
});

export const UsersRols = sequelize.define('usersRols', {
  idRols: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: Rol, key: 'idRol' }
  },
  idUsersRol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: { model: User, key: 'idUsers' }
  }
});

export const Student = sequelize.define('students', {
  idEstudiante: { type: DataTypes.STRING(20), primaryKey: true },
  carrera: { type: DataTypes.STRING(50) },
  semestre: { type: DataTypes.INTEGER },
  idUser: { type: DataTypes.INTEGER, references: { model: User, key: 'idUsers' } }
});

export const Teacher = sequelize.define('teachers', {
  idDocente: { type: DataTypes.STRING(20), primaryKey: true },
  profesion: { type: DataTypes.STRING(50) },
  disponibilidad: {
    type: DataTypes.ENUM('DISPONIBLE', 'NO DISPONIBLE'),
    allowNull: false
  },
  idUser: { type: DataTypes.INTEGER, references: { model: User, key: 'idUsers' } },
  carrera: { type: DataTypes.STRING(50) }
});

export const Jury = sequelize.define('jurys', {
  idJurado: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idUser: { type: DataTypes.INTEGER, references: { model: User, key: 'idUsers' } },
  carrera: { type: DataTypes.STRING(50) }
});

export const Project = sequelize.define('projects', {
  idProyecto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(60) },
  tipo: { type: DataTypes.STRING(40) },
  estado: { type: DataTypes.ENUM('APROBADO', 'EN REVISIÓN') },
  rutaDocumento: { type: DataTypes.STRING(250) },
  idEstudiante: {
    type: DataTypes.STRING(20),
    references: { model: Student, key: 'idEstudiante' }
  },
  idDocente: {
    type: DataTypes.STRING(20),
    references: { model: Teacher, key: 'idDocente' }
  }
});

export const PlanEntrega = sequelize.define('plan_entrega', {
  id_plan_entrega: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idProyecto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: 'idProyecto'
    }
  },
  nro_entrega: { type: DataTypes.INTEGER },
  titulo: { type: DataTypes.STRING(100) },
  descripcion: { type: DataTypes.TEXT },
  fecha_limite: { type: DataTypes.DATE }
});

export const Entrega = sequelize.define('entrega', {
  idEntrega: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_plan_entrega: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: PlanEntrega,
      key: 'id_plan_entrega'
    }
  },
  fecha_envio: { type: DataTypes.DATE },
  ruta_documento: { type: DataTypes.STRING(255) },
  descripcion: { type: DataTypes.TEXT },
  id_estudiante: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: Student,
      key: 'idEstudiante'
    }
  }
});

export async function syncModels() {
  try {
    await sequelize.sync({ alter: true }); // o { force: true } si quieres reiniciar
    console.log('✅ Modelos sincronizados');
  } catch (err) {
    console.error('❌ Error sincronizando modelos:', err);
  }
}

// Definir relaciones entre modelos
User.belongsTo(Rol, { foreignKey: 'idRol' });
Rol.hasMany(User, { foreignKey: 'idRol' });

User.belongsToMany(Rol, { through: UsersRols, foreignKey: 'idUsersRol' });
Rol.belongsToMany(User, { through: UsersRols, foreignKey: 'idRols' });

UsersRols.belongsTo(Rol, { foreignKey: 'idRols' });
UsersRols.belongsTo(User, { foreignKey: 'idUsersRol' });

Rol.hasMany(UsersRols, { foreignKey: 'idRols' });
User.hasMany(UsersRols, { foreignKey: 'idUsersRol' });

Student.belongsTo(User, { foreignKey: 'idUser' });
User.hasOne(Student, { foreignKey: 'idUser' });

Teacher.belongsTo(User, { foreignKey: 'idUser' });
User.hasOne(Teacher, { foreignKey: 'idUser' });

Jury.belongsTo(User, { foreignKey: 'idUser' });
User.hasOne(Jury, { foreignKey: 'idUser' });

Project.belongsTo(Student, { foreignKey: 'idEstudiante' });
Student.hasMany(Project, { foreignKey: 'idEstudiante' });

Project.belongsTo(Teacher, { foreignKey: 'idDocente' });
Teacher.hasMany(Project, { foreignKey: 'idDocente' });

PlanEntrega.belongsTo(Project, { foreignKey: 'idProyecto' });
Project.hasMany(PlanEntrega, { foreignKey: 'idProyecto' });

Entrega.belongsTo(PlanEntrega, { foreignKey: 'id_plan_entrega' });
PlanEntrega.hasMany(Entrega, { foreignKey: 'id_plan_entrega' });

Entrega.belongsTo(Student, { foreignKey: 'id_estudiante' });
Student.hasMany(Entrega, { foreignKey: 'id_estudiante' });