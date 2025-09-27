import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

const Jury = sequelize.define('juries',{
    idJurado: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true,
    },
    idUser: {
        type: DataTypes.INTEGER(),
        unique: true,
        referenes: { model: 'users', key: 'idUsers'}
    },
    carrera: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
});

Jury.associate = (models) => {
    Jury.belongsTo(models.User, {foreignKey: 'idUser'});
    Jury.hasMany(models.Project, { foreignKey: 'idJurado' });
}

export default Jury;