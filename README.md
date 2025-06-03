CONFIGURACIÓN DEL PROYECTO
Este proyecto está estructurado en dos carpetas principales:
frontend/mi-app: contiene el código del cliente, desarrollado con React.


backend: contiene la API desarrollada con Node.js y Express.
Instalación de dependencias
Antes de ejecutar el proyecto, asegúrate de instalar las dependencias tanto en el frontend como en el backend. Esto se hace de la mediante los siguientes comandos que puede copiar y pegar:
 Comandos para instalar dependencias del backend en la consola:
cd backend
npm install
 Comandos para instalar dependencias del frontend en la consola:
cd frontend/mi-app
npm install




Ejecución del proyecto

Con las dependencias instaladas, ya podrá correr el proyecto, los comandos para ejecutarlo:
Levantar el backend (API):
cd backend
npm run dev

Levantar el frontend:
cd frontend/mi-app
npm start

Esto iniciará la aplicación React en el navegador (por defecto en el http://localhost:3000/).

Configuración inicial de la base de datos
Antes de usar el sistema, se debe tener creada la base de datos correspondiente en tu entorno local en este caso MySql y ejecutar las siguientes sentencias para crear un usuario administrador:
CREATE TABLE rols (
  idRol INT PRIMARY KEY AUTO_INCREMENT,
  nombreRol VARCHAR(50) UNIQUE NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME
);

CREATE TABLE users (
  idUsers INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(150) UNIQUE NOT NULL,
  correo VARCHAR(150) UNIQUE NOT NULL,
  contraseña VARCHAR(250) NOT NULL,
  idRol INT,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (idRol) REFERENCES rols(idRol)
);

Insertar roles iniciales:
INSERT INTO rols(nombreRol, createdAt, updatedAt) VALUES 
('Estudiante', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Docente', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Jurado', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Administrador', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

Insertar usuario administrador:
INSERT INTO users(nombre, correo, contraseña, idRol, createdAt, updatedAt) VALUES ('Camila Diaz', 'cami@unicesar.edu.co', '$2b$10$KBZEyzmD1hPco5jnQVsvtORiZHSjPCRLIj518em3gCVxUuc0//Oia', 4, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
 NOTA: La contraseña está encriptada con bcrypt, pero esta significa “hola1234”. Puedes iniciar sesión con ese usuario para acceder como Administrador.
Configuración del archivo .env
Debes crear en la raíz del backend un archivo llamado .env, con el siguiente contenido:
# Base de datos
HOSTDB=localhost
USERDB=root (o tu usuario de base de datos)
PASSWORDDB=tu_contraseña_de_root
DATABASE=nombre_base_de_datos

# Correo para notificaciones
USER_EMAIL=tu_correo@gmail.com
PASSWORD_EMAIL=tu_contraseña_generada
SERVICE_EMAIL=gmail
