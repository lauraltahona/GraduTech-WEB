import { int, mysqlEnum, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const rolsTable = mysqlTable('rols',{
    idRol: int().primaryKey().autoincrement(),
    nombreRol: varchar({length:50})
})

export const usersTable = mysqlTable("users",{
    idUsers: int().primaryKey().autoincrement(),
    nombre:varchar({ length:150 }).unique().notNull(),
    correo:varchar({ length:150 }).unique().notNull(),
    contraseña: varchar({length:250}).notNull(),
    idRol: int().references(() => rolsTable.idRol)
})

export const usersRolsTable = mysqlTable('usersRols',{
    idUsersRols:int().primaryKey().references(()=>rolsTable.idRol),
    idRol:int().primaryKey().references(()=>usersTable.idUsers)
})

export const studentTable = mysqlTable('students',{
    idEstudiante:varchar({length:20}).primaryKey(),
    carrera:varchar({length:50}),
    semestre:int(),
    idUser:int().references(()=>usersTable.idUsers)
}) 

export const teacherTable = mysqlTable('teachers',{
    idDocente:varchar({length:20}).primaryKey(),
    profesion: varchar({length:50}),
    disponibilidad : mysqlEnum('disponibilidad',['DISPONIBLE','NO DISPONIBLE']).notNull(),
    idUserDocente: int().references(()=> usersTable.idUsers),
    carrera: varchar({length:50})
})

export const juryTable = mysqlTable('jurys',{
    idJurado:int().primaryKey().autoincrement(),
    idUserJury:int().references(()=>usersTable.idUsers),
    carrera: varchar({ length:50 })
})

export const projectTable = mysqlTable('projects',{
    idProject:int().primaryKey().autoincrement(),
    title:varchar({length:60}),
    tipo:varchar({length:40}),
    estado: mysqlEnum('estado',['APROBADO','EN REVISIÓN']),
    rutaDocumento: varchar({length:20}),
    idUserProjec: varchar({length:20}).references(()=>studentTable.idEstudiante),
    idDocente: varchar({length:20}).references(()=> teacherTable.idDocente)
})

// CREATE TABLE PlanEntrega (
//     id_plan_entrega INT AUTO_INCREMENT PRIMARY KEY,
//     id_proyecto INT,
//     nro_entrega INT,
//     titulo VARCHAR(100),
//     descripcion TEXT,
//     fecha_limite DATE,
//     FOREIGN KEY (id_proyecto) REFERENCES Proyecto(id_proyecto)
// );

// CREATE TABLE Entrega (
//     id_entrega INT AUTO_INCREMENT PRIMARY KEY,
//     id_plan_entrega INT,
//     fecha_envio DATETIME,
//     ruta_documento VARCHAR(255),
//     descripcion TEXT,
//     IDSTUDENT:VARCHAR(20)
//     FOREIGN KEY (id_plan_entrega) REFERENCES PlanEntrega(id_plan_entrega)
//     ALTER TABLE Entrega ADD FOREIGN KEY (id_estudiante) REFERENCES Estudiante(id_estudiante);
// );