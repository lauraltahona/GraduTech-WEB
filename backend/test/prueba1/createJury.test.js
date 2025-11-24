import { jest } from '@jest/globals';
import { JuryService } from '../../service/juryService.js';
import { JuryRepository } from '../../repository/jury-repository.js';

describe('Validaciones en JuryModel.createJury', () => {
  let createJurySpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    createJurySpy = jest.spyOn(JuryRepository, 'createJury');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debería crear un jurado exitosamente', async () => {
    const mockData = {
      cedula: '1234567890',
      nombre: 'Juan Pérez',
      carrera: 'Ingeniería de Sistemas'
    };

    const inputData = {
      carrera: 'Ingeniería de Sistemas',
      usuario: {
        cedula: '6666695874',
        nombre: 'Juan Pérez',
        correo: 'juan@unicesar.edu.co',
        password: 'password123'
      }
    };

    createJurySpy.mockResolvedValue(mockData);

    const result = await JuryService.createJury(inputData);

    expect(result).toEqual(mockData);
    expect(createJurySpy).toHaveBeenCalledTimes(1);
    expect(createJurySpy).toHaveBeenCalledWith({
      carrera: inputData.carrera,
      usuario: inputData.usuario
    });
  });
  // ============================================================
  // 1. ID JURADO (cedula)
  // ============================================================
  it('debería lanzar un error si la cédula es menor a 8 dígitos', async () => {
    const inputData = {
      carrera: 'Ingeniería de Sistemas',
      usuario: {
        cedula: '1', // 
        nombre: 'Juan',
        correo: 'juan@example.com',
        password: 'abcdef'
      }
    };

    await expect(JuryService.createJury(inputData))
      .rejects.toThrow('ALREADY_REGISTERED');
  });

  // ============================================================
  // 2. NOMBRE
  // ============================================================
  it('debería lanzar un error si el nombre tiene menos de 3 caracteres', async () => {
    const inputData = {
      carrera: 'Ingeniería de Sistemas',
      usuario: {
        cedula: '12345678',
        nombre: 'Jo', // ❌ muy corto
        correo: 'jo@example.com',
        password: 'abcdef'
      }
    };

    await expect(JuryService.createJury(inputData))
      .rejects.toThrow('ALREADY_REGISTERED');
  });

  // ============================================================
  // 3. CORREO
  // ============================================================
  it('debería lanzar un error si el correo no tiene formato válido', async () => {
    const inputData = {
      carrera: 'Ingeniería de Sistemas',
      usuario: {
        cedula: '12345678',
        nombre: 'Juan',
        correo: 'correo-invalido', // ❌ no es email
        password: 'abcdef'
      }
    };

    await expect(JuryService.createJury(inputData))
      .rejects.toThrow('ALREADY_REGISTERED');
  });

  // ============================================================
  // 4. CONTRASEÑA
  // ============================================================
  it('debería lanzar un error si la contraseña tiene menos de 6 caracteres', async () => {
    const inputData = {
      carrera: 'Ingeniería de Sistemas',
      usuario: {
        cedula: '12345678',
        nombre: 'Juan',
        correo: 'juan@example.com',
        password: 'abc' // ❌ corta
      }
    };

    await expect(JuryService.createJury(inputData))
      .rejects.toThrow('ALREADY_REGISTERED');
  });

  // ============================================================
  // 5. CARRERA
  // ============================================================
  it('debería lanzar un error si la carrera no es válida', async () => {
    const inputData = {
      carrera: 'Arquitectura', // ❌ no está en la lista
      usuario: {
        cedula: '12345678',
        nombre: 'Juan',
        correo: 'juan@example.com',
        password: 'abcdef'
      }
    };

    await expect(JuryService.createJury(inputData))
      .rejects.toThrow('ALREADY_REGISTERED');
  });

});
