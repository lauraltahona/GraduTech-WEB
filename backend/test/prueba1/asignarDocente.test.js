import { jest } from '@jest/globals';
import { ProjectService } from '../../service/proyect-service.js';
import { ProjectRepository } from '../../repository/project-repository.js';

describe('ProjectModel - asignarDocenteAProyecto', () => {
  let asignarDocenteAProyectoSpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    asignarDocenteAProyectoSpy = jest.spyOn(ProjectRepository, 'asignarDocenteAProyecto');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debería asignar un docente a un proyecto exitosamente', async () => {
    const title = 'Proyecto de Prueba';
    const cedulaDocente = '1234567890';
    const mockProyecto = {
      title: 'Proyecto de Prueba',
      idDocente: cedulaDocente,
      estado: 'EN REVISIÓN'
    };

    asignarDocenteAProyectoSpy.mockResolvedValue(mockProyecto);

    const result = await ProjectService.asignarDocenteAProyecto(title, cedulaDocente);

    expect(result).toEqual(mockProyecto);
    expect(asignarDocenteAProyectoSpy).toHaveBeenCalledWith(title, cedulaDocente);
  });

  it('debería lanzar un error cuando el proyecto no existe', async () => {
    const title = 'Proyecto Inexistente';
    const cedulaDocente = '1234567890';

    asignarDocenteAProyectoSpy.mockRejectedValue(new Error('No se encontró un proyecto con ese título.'));

    await expect(ProjectService.asignarDocenteAProyecto(title, cedulaDocente))
      .rejects.toThrow('No se encontró un proyecto con ese título.');
  });

  it('debería lanzar un error cuando el docente no existe', async () => {
    const title = 'Proyecto de Prueba';
    const cedulaDocente = '9999999999';

    asignarDocenteAProyectoSpy.mockRejectedValue(new Error('No se encontró un docente con esa id.'));

    await expect(ProjectService.asignarDocenteAProyecto(title, cedulaDocente))
      .rejects.toThrow('No se encontró un docente con esa id.');
  });
});