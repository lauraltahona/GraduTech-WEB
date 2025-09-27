import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

const Teacher = sequelize.define('teachers', {
  idDocente: {
    type: DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true,
  },
  idUser: {
    type: DataTypes.INTEGER(),
    allowNull: false,
    references: { model: 'users', key: 'idUsers' }
  },
  profesion: {
    type: DataTypes.STRING(30),
    disponibilidad: {
      type: DataTypes.ENUM('DISPONIBLE', 'NO DISPONIBLE'),
      allowNull: false,
      defaultValue: 'DISPONIBLE',
    },
  },
  carrera: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  disponibilidad:{
    type: DataTypes.ENUM('DISPONIBLE', 'NO DISPONIBLE'),
    allowNull: false,
    defaultValue: 'DISPONIBLE',
  }
});

Teacher.associate = (models) => {
  Teacher.belongsTo(models.User, { foreignKey: 'idUser' });
  Teacher.hasMany(models.Project, { foreignKey: 'idDocente' });
}

export default Teacher;