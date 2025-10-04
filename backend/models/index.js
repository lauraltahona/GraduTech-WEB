import Student from "./student-model.js";
import User from "./user-model.js";
import Teacher from "./teacher-model.js";
import Jury from "./jury-model.js";
import Project from "./proyect-model.js";
import Rol from "./rol-model.js";
import { PlanEntrega, Entrega } from "../shared/schemas.js";

const models = {Student, User, Teacher, Jury, Project, Rol, PlanEntrega, Entrega};

Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

export default models;