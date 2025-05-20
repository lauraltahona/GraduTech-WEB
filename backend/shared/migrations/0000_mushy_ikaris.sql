CREATE TABLE `teachers` (
	`idDocente` varchar(20) NOT NULL,
	`profesion` varchar(50),
	`disponibilidad` enum('DISPONIBLE','NO DISPONIBLE') NOT NULL,
	`idUserDocente` int,
	CONSTRAINT `teachers_idDocente` PRIMARY KEY(`idDocente`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`idUsers` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(150) NOT NULL,
	`correo` varchar(150) NOT NULL,
	`contraseña` varchar(250) NOT NULL,
	`idRol` int,
	CONSTRAINT `users_idUsers` PRIMARY KEY(`idUsers`),
	CONSTRAINT `users_nombre_unique` UNIQUE(`nombre`),
	CONSTRAINT `users_correo_unique` UNIQUE(`correo`)
);
--> statement-breakpoint
CREATE TABLE `students` (
	`idEstudiante` varchar(20) NOT NULL,
	`carrera` varchar(50),
	`semestre` int,
	`idUser` int,
	CONSTRAINT `students_idEstudiante` PRIMARY KEY(`idEstudiante`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`idProject` int AUTO_INCREMENT NOT NULL,
	`title` varchar(60),
	`tipo` varchar(40),
	`estado` enum('APROBADO','EN REVISIÓN'),
	`rutaDocumento` varchar(20),
	`idUserProjec` varchar(20),
	`idDocente` varchar(20),
	CONSTRAINT `projects_idProject` PRIMARY KEY(`idProject`)
);
--> statement-breakpoint
CREATE TABLE `jurys` (
	`idJurado` int NOT NULL,
	`idDocente` varchar(20) NOT NULL,
	`idUserJury` int,
	CONSTRAINT `jurys_idJurado` PRIMARY KEY(`idJurado`)
);
--> statement-breakpoint
CREATE TABLE `usersRols` (
	`idUsersRols` int NOT NULL,
	`idRol` int NOT NULL,
	CONSTRAINT `usersRols_idUsersRols` PRIMARY KEY(`idUsersRols`)
);
--> statement-breakpoint
CREATE TABLE `rols` (
	`idRol` int AUTO_INCREMENT NOT NULL,
	`nombreRol` varchar(50),
	CONSTRAINT `rols_idRol` PRIMARY KEY(`idRol`)
);
--> statement-breakpoint

ALTER TABLE `jurys` ADD CONSTRAINT `jurys_idDocente_teachers_idDocente_fk` FOREIGN KEY (`idDocente`) REFERENCES `teachers`(`idDocente`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jurys` ADD CONSTRAINT `jurys_idUserJury_users_idUsers_fk` FOREIGN KEY (`idUserJury`) REFERENCES `users`(`idUsers`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `projects_idUserProjec_students_idEstudiante_fk` FOREIGN KEY (`idUserProjec`) REFERENCES `students`(`idEstudiante`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `projects_idDocente_teachers_idDocente_fk` FOREIGN KEY (`idDocente`) REFERENCES `teachers`(`idDocente`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `students` ADD CONSTRAINT `students_idUser_users_idUsers_fk` FOREIGN KEY (`idUser`) REFERENCES `users`(`idUsers`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_idUserDocente_users_idUsers_fk` FOREIGN KEY (`idUserDocente`) REFERENCES `users`(`idUsers`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `usersRols` ADD CONSTRAINT `usersRols_idUsersRols_rols_idRol_fk` FOREIGN KEY (`idUsersRols`) REFERENCES `rols`(`idRol`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `usersRols` ADD CONSTRAINT `usersRols_idRol_users_idUsers_fk` FOREIGN KEY (`idRol`) REFERENCES `users`(`idUsers`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_idRol_rols_idRol_fk` FOREIGN KEY (`idRol`) REFERENCES `rols`(`idRol`) ON DELETE no action ON UPDATE no action;