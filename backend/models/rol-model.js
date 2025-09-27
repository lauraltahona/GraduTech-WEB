import { sequelize } from "../db.js";
import { DataTypes } from 'sequelize';

const Rol = sequelize.define('roles', {
    idRol: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    nombreRol: {
        type: DataTypes.STRING(50),
        allowNull: false, 
        unique: true
    }
})

Rol.associate = (models) => {
    Rol.hasMany(models.User, { foreignKey: 'idRol' });
    Rol.belongsToMany(models.User, {
        through: 'usersRols',
        foreignKey: 'idRoles',
        otherKey: 'idUsers'
    })
}
export default Rol;
