import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

const Student = sequelize.define("students", {
    idEstudiante: {
        type: DataTypes.INTEGER(), 
        autoIncrement: true,
        primaryKey: true,
    },
    idUser: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        references: { model: 'users', key: "idUsers"}
    },
    carrera:{
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    semestre: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    }
});

Student.associate = (models) => {
    Student.belongsTo(models.User, { foreignKey: "idUser" });
    Student.hasOne(models.Project, { foreignKey: 'idEstudiante' });
    Student.hasMany(models.Entrega, { foreignKey: 'id_estudiante' });
}

export default Student;