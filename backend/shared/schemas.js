import { sequelize } from "../db.js";
import { DataTypes } from 'sequelize';


export const PlanEntrega = sequelize.define('plan_entrega', {
  id_plan_entrega: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  idProyecto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'projects',
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
    type: DataTypes.INTEGER(),
    allowNull: false,
    references: {
      model: 'students',
      key: 'idEstudiante'
    }
  }, 
  retroalimentacion: {
  type: DataTypes.TEXT,
  allowNull: true,
  },
  ruta_retroalimentacion: {
  type: DataTypes.STRING(250),
  allowNull: true,
  }
});


PlanEntrega.associate = (models) => {
  PlanEntrega.belongsTo(models.Project, { foreignKey: 'idProyecto' });
  PlanEntrega.hasMany(models.Entrega, { foreignKey: 'id_plan_entrega' });
}

Entrega.associate = (models) => {
  Entrega.belongsTo(models.PlanEntrega, { foreignKey: 'id_plan_entrega' });
  Entrega.belongsTo(models.Student, { foreignKey: 'id_estudiante' });
}

