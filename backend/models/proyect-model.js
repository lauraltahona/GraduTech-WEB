import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

const Project = sequelize.define('projects', {
  idProyecto: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('APROBADO POR DOCENTE', 'EN REVISIÓN', 'RECHAZADO', 'PENDIENTE', 'APROBADO'),
  },
  rutaDocumento: {
    type: DataTypes.STRING(250),
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  idEstudiante: {
    type: DataTypes.INTEGER(),
    references: { model: 'students', key: 'idEstudiante' },
  },
  idDocente: {
    type: DataTypes.INTEGER(),
    references: { model: 'teachers', key: 'idDocente' },
  },
  idJurado: {
    type: DataTypes.INTEGER(),
    references: {model: 'juries', key: 'idJurado' }
  },
  autorizacion_repositorio: {
    type: DataTypes.ENUM('SI', 'NO'),
    allowNull: true,
  }
})

Project.associate = (models) => {
  Project.belongsTo(models.Student, { foreignKey: 'idEstudiante' });
  Project.belongsTo(models.Jury , {foreignKey: 'idJurado'});
  Project.belongsTo(models.Teacher, { foreignKey: 'idDocente' });
  Project.hasMany(models.PlanEntrega, { foreignKey: 'idProyecto' });


}
export default Project;