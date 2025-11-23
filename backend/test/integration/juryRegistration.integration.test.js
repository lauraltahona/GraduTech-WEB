import request from 'supertest';
import { app } from '../../index.js';
import { sequelize } from '../../db.js';
import { UserService } from '../../service/user-service.js';
import Jury from '../../models/jury-model.js';
import User from '../../models/user-model.js';
import Rol from '../../models/rol-model.js';

describe('Caso de Prueba Usuario - Flujo Completo Registro Jurado', () => {
  let adminToken;
  let adminUser;
  let adminRole;

  beforeAll(async () => {
    // Configurar base de datos de prueba
    await sequelize.sync({ force: true });
    
    // Crear rol admin
    adminRole = await Rol.create({
      nombreRol: 'admin'
    });

    // Crear usuario administrador con UserService (que hashea)
    adminUser = await UserService.createUser({
      cedula: '1067592444',
      nombre: 'Natalia Caballero',
      correo: 'admin@unicesar.edu.co',
      password: 'hola1234',
      idRol: adminRole.idRol
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  // IO001 - Login de Administrador
  describe('IO001 - Login Administrador', () => {
    test('debe autenticar usuario administrador correctamente', async () => {
      const response = await request(app)
        .post('/usuario/login')
        .send({
          correo: 'admin@unicesar.edu.co',
          password: 'hola1234'
        })
        .expect(200);

      expect(response.body.user).toBeDefined();
      expect(response.body.user.correo).toBe('admin@unicesar.edu.co');
      expect(response.body.token).toBeDefined();

      adminToken = response.body.token;
    });

    test('debe rechazar contraseña incorrecta', async () => {
      const response = await request(app)
        .post('/usuario/login')
        .send({
          correo: 'admin@unicesar.edu.co',
          password: 'incorrecta'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  
});