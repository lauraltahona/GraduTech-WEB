import { jest } from '@jest/globals';
import { StudentService } from '../../service/student-service.js';
import { StudentRepository } from '../../repository/student-repository.js';

describe('Validaciones en StudentModel.createStudent', () => {
  let createStudentSpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    createStudentSpy = jest.spyOn(StudentRepository, 'createStudent');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debería crear un estudiante exitosamente', async () => {
    const mockData = {
      cedula: '6666695874',
      nombre: 'Juan Pérez',
      carrera: 'Ingeniería de Sistemas',
      semestre: 9
    };

    const inputData = {
      carrera: 'Ingeniería de Sistemas',
      semestre: 9,
      usuario: {
        cedula: '6666695874',
        nombre: 'Juan Pérez',
        correo: 'juan@unicesar.edu.co',
        password: 'password123'
      }
    };

    createStudentSpy.mockResolvedValue(mockData);

    const result = await StudentService.createStudent(inputData);

    expect(result).toEqual(mockData);
    expect(createStudentSpy).toHaveBeenCalledTimes(1);
    expect(createStudentSpy).toHaveBeenCalledWith({
      carrera: inputData.carrera,
      semestre: inputData.semestre,
      usuario: inputData.usuario
    });
  });

  // ============================================================
  // 1. ID ESTUDIANTE (cedula)
  // ============================================================
  it('debería lanzar un error si la cédula es menor a 8 dígitos', async () => {
    const inputData = {
      carrera: 'Ingeniería de Sistemas',
      semestre: 55555,
      usuario: {
        cedula: '6666695874',
        nombre: 'Juan',
        correo: 'uan@unicesar.edu.co',
        password: 'abcdef'
      }
    };

    await expect(StudentService.createStudent(inputData))
      .rejects.toThrow('Validation error');
  });

  // ============================================================
  // 2. NOMBRE
  // ============================================================
  it('debería lanzar un error si el nombre tiene menos de 3 caracteres', async () => {
    const inputData = {
      carrera: 'Ingeniería de Sistemas',
      semestre: 5,
      usuario: {
        cedula: '12345678',
        nombre: 'Jo',
        correo: 'juan@unicesar.edu.co',
        password: 'abcdef'
      }
    };

    await expect(StudentService.createStudent(inputData))
      .rejects.toThrow('ALREADY_REGISTERED');
  });

  // ============================================================
  // 3. CORREO
  // ============================================================
  it('debería lanzar un error si el correo no tiene formato válido', async () => {
    const inputData = {
      carrera: 'Ingeniería de Sistemas',
      semestre: 9,
      usuario: {
        cedula: '6666695874',
        nombre: 'Juan',
        correo: 'correo-invalido',
        password: 'abcdef'
      }
    };

    await expect(StudentService.createStudent(inputData))
      .rejects.toThrow('Validation error');
  });

  // ============================================================
  // 4. CONTRASEÑA
  // ============================================================
  it('debería lanzar un error si la contraseña tiene menos de 6 caracteres', async () => {
    const inputData = {
      carrera: 'Ingeniería de Sistemas',
      semestre: 5,
      usuario: {
        cedula: '6666695874',
        nombre: 'Juan',
        correo: 'juan@example.com',
        password: 'abc'
      }
    };

    await expect(StudentService.createStudent(inputData))
      .rejects.toThrow('ALREADY_REGISTERED');
  });

  // ============================================================
  // 5. SEMESTRE
  // ============================================================
  it('debería lanzar un error si el semestre no es válido', async () => {
    const inputData = {
      carrera: 'Ingeniería de Sistemas',
      semestre: 0,
      usuario: {
        cedula: '12345678',
        nombre: 'Juan',
        correo: 'juan@example.com',
        password: 'abcdef'
      }
    };

    await expect(StudentService.createStudent(inputData))
      .rejects.toThrow('ALREADY_REGISTERED');
  });

  // ============================================================
  // 6. CARRERA
  // ============================================================
  it('debería lanzar un error si la carrera no es válida', async () => {
    const inputData = {
      carrera: 'Arquitectura',
      semestre: 5,
      usuario: {
        cedula: '12345678',
        nombre: 'Juan',
        correo: 'juan@example.com',
        password: 'abcdef'
      }
    };

    await expect(StudentService.createStudent(inputData))
      .rejects.toThrow('ALREADY_REGISTERED');
  });

});