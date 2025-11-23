import { jest } from '@jest/globals';
import { ProjectService } from '../service/proyect-service.js';
import { ProjectRepository } from '../repository/project-repository.js';

describe('ProjectService - cambiarEstado', () => {
  let cambiarEstadoSpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    cambiarEstadoSpy = jest.spyOn(ProjectRepository, 'cambiarEstado');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debería cambiar el estado de un proyecto exitosamente', async () => {
    const idProyecto = 1;
    const estado = 'APROBADO';
    const mockProyecto = {
      id: idProyecto,
      estado: estado,
      title: 'Proyecto de Prueba'
    };

    cambiarEstadoSpy.mockResolvedValue(mockProyecto);

    const result = await ProjectService.cambiarEstado(idProyecto, estado);

    expect(result).toEqual(mockProyecto);
    expect(cambiarEstadoSpy).toHaveBeenCalledWith(idProyecto, estado);
  });

  it('debería lanzar un error cuando el proyecto no existe', async () => {
    const idProyecto = 999;
    const estado = 'APROBADO';

    cambiarEstadoSpy.mockRejectedValue(new Error('Proyecto no encontrado'));

    await expect(ProjectService.cambiarEstado(idProyecto, estado))
      .rejects.toThrow('Proyecto no encontrado');
  });
});