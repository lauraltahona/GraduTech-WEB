import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable("users",{
    idUsers: int().primaryKey().autoincrement(),
    nombre:varchar({length:150}).unique().notNull(),
    correo:varchar({length:150}).unique().notNull(),
    contraseña: varchar({length:250}).notNull(),
    idRol: int().references(rolsTable)
})

export const rolsTable = mysqlTable('rols',{
    idRol: int().primaryKey().autoincrement(),
    nombreRol: varchar({length:50})
})
