import { jest } from '@jest/globals';
import { TeacherService } from '../service/teacher-service.js';
import { TeacherRepository } from '../repository/teacher-repository.js';

describe('Validaciones en TeacherModel.createTeacher', () => {
  let createTeacherSpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    createTeacherSpy = jest.spyOn(TeacherRepository, 'createTeacher');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debería crear un docente exitosamente', async () => {
    const mockData = {
      id_usuario: 1,
      cedula: '1234567890',
      nombre: 'Juan Pérez',
      profesion: 'Ingeniero',
      disponibilidad: 'DISPONIBLE',
      carrera: 'Ingeniería de Sistemas'
    };

    const inputData = {
      profesion: 'Ingeniero',
      carrera: 'Ingeniería de Sistemas',
      usuario: {
        cedula: '6666695874',
        nombre: 'Juan Pérez',
        correo: 'juan@unicesar.edu.co',
        password: 'password123'
      }
    };

    createTeacherSpy.mockResolvedValue(mockData);

    const result = await TeacherService.createTeacher(inputData);

    expect(result).toEqual(mockData);
    expect(createTeacherSpy).toHaveBeenCalledTimes(1);
    expect(createTeacherSpy).toHaveBeenCalledWith({
      profesion: inputData.profesion,
      carrera: inputData.carrera,
      usuario: inputData.usuario
    });
  });

  // ============================================================
  // 1. ID DOCENTE (cedula)
  // ============================================================
  it('debería lanzar un error si la cédula es menor a 8 dígitos', async () => {
    const inputData = {
      profesion: 'Ingeniero',
      carrera: 'Ingeniería de Sistemas',
      usuario: {
        cedula: '1',
        nombre: 'Juan',
        correo: 'juan@example.com',
        password: 'abcdef'
      }
    };

    await expect(TeacherService.createTeacher(inputData))
      .rejects.toThrow('EMAIL_ALREADY_REGISTERED');
  });

  // ============================================================
  // 2. NOMBRE
  // ============================================================
  it('debería lanzar un error si el nombre tiene menos de 3 caracteres', async () => {
    const inputData = {
      profesion: 'Ingeniero',
      carrera: 'Ingeniería de Sistemas',
      usuario: {
        cedula: '12345678',
        nombre: 'Jo',
        correo: 'jo@example.com',
        password: 'abcdef'
      }
    };

    await expect(TeacherService.createTeacher(inputData))
      .rejects.toThrow('EMAIL_ALREADY_REGISTERED');
  });

  // ============================================================
  // 4. CONTRASEÑA
  // ============================================================
  it('debería lanzar un error si la contraseña tiene menos de 6 caracteres', async () => {
    const inputData = {
      profesion: 'Ingeniero',
      carrera: 'Ingeniería de Sistemas',
      usuario: {
        cedula: '12345678',
        nombre: 'Juan',
        correo: 'juan@example.com',
        password: 'abc'
      }
    };

    await expect(TeacherService.createTeacher(inputData))
      .rejects.toThrow('EMAIL_ALREADY_REGISTERED');
  });

  // ============================================================
  // 5. PROFESIÓN
  // ============================================================
  it('debería lanzar un error si la profesión está vacía', async () => {
    const inputData = {
      profesion: '',
      carrera: 'Ingeniería de Sistemas',
      usuario: {
        cedula: '12345678',
        nombre: 'Juan',
        correo: 'juan@example.com',
        password: 'abcdef'
      }
    };

    await expect(TeacherService.createTeacher(inputData))
      .rejects.toThrow('EMAIL_ALREADY_REGISTERED');
  });

  // ============================================================
  // 6. CARRERA
  // ============================================================
  it('debería lanzar un error si la carrera no es válida', async () => {
    const inputData = {
      profesion: 'Ingeniero',
      carrera: 'Arquitectura',
      usuario: {
        cedula: '12345678',
        nombre: 'Juan',
        correo: 'juan@example.com',
        password: 'abcdef'
      }
    };

    await expect(TeacherService.createTeacher(inputData))
      .rejects.toThrow('EMAIL_ALREADY_REGISTERED');
  });

});