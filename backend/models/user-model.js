import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


const User = sequelize.define("users", {

  idUsers: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cedula: {
    type: DataTypes.STRING(),
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  correo: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },

  idRol: {
    type: DataTypes.INTEGER,
    references: {model: 'roles', key: 'idRol' }
  }
});

// asociaciones
User.associate = (models) => {
  User.belongsTo(models.Rol, { foreignKey: "idRol" });
  User.belongsToMany(models.Rol, {
    through: "usersRols",
    foreignKey: "idUsers",
    otherKey: "idRoles",
  });
};

export default User;
