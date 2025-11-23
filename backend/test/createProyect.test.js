import { jest } from '@jest/globals';
import { ProjectService } from '../service/proyect-service.js';
import { ProjectRepository } from '../repository/project-repository.js';

describe('Validaciones en ProjectModel.createProject', () => {
  let createProjectSpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    createProjectSpy = jest.spyOn(ProjectRepository, 'createProject');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debería crear un proyecto exitosamente', async () => {
    const mockData = {
      id: 1,
      title: 'Sistema de Gestión',
      tipo: 'Investigación',
      estado: 'PENDIENTE',
      rutaDocumento: '/uploads/proyecto.pdf',
      idEstudiante: 1,
      descripcion: 'Proyecto de grado'
    };

    const inputData = {
      title: 'Sistema de Gestión',
      tipo: 'Investigación',
      rutaDocumento: '/uploads/proyecto.pdf',
      idEstudiante: '1234567890',
      descripcion: 'Proyecto de grado'
    };

    createProjectSpy.mockResolvedValue(mockData);

    const result = await ProjectModel.createProject(inputData);

    expect(result).toEqual(mockData);
    expect(createProjectSpy).toHaveBeenCalledTimes(1);
    expect(createProjectSpy).toHaveBeenCalledWith(inputData);
  });

  // ============================================================
  // 1. TÍTULO VACÍO
  // ============================================================
  it('debería lanzar un error si el título está vacío', async () => {
    const inputData = {
      title: '',
      tipo: 'Investigación',
      rutaDocumento: '/uploads/proyecto.pdf',
      idEstudiante: '1234567890',
      descripcion: 'Proyecto de grado'
    };

    createProjectSpy.mockRejectedValue(new Error('Ya existe un proyecto con el mismo título o estudiante'));

    await expect(ProjectService.createProject(inputData))
      .rejects.toThrow('Ya existe un proyecto con el mismo título o estudiante');
  });

  // ============================================================
  // 2. TIPO VACÍO
  // ============================================================
  it('debería lanzar un error si el tipo está vacío', async () => {
    const inputData = {
      title: 'Sistema de Gestión',
      tipo: '',
      rutaDocumento: '/uploads/proyecto.pdf',
      idEstudiante: '1234567890',
      descripcion: 'Proyecto de grado'
    };

    createProjectSpy.mockRejectedValue(new Error('Ya existe un proyecto con el mismo título o estudiante'));

    await expect(ProjectService.createProject(inputData))
      .rejects.toThrow('Ya existe un proyecto con el mismo título o estudiante');
  });

  // ============================================================
  // 3. ID ESTUDIANTE INVÁLIDO
  // ============================================================
  it('debería lanzar un error si el idEstudiante es inválido', async () => {
    const inputData = {
      title: 'Sistema de Gestión',
      tipo: 'Investigación',
      rutaDocumento: '/uploads/proyecto.pdf',
      idEstudiante: '',
      descripcion: 'Proyecto de grado'
    };

    createProjectSpy.mockRejectedValue(new Error('Ya existe un proyecto con el mismo título o estudiante'));

    await expect(ProjectService.createProject(inputData))
      .rejects.toThrow('Ya existe un proyecto con el mismo título o estudiante');
  });

  // ============================================================
  // 4. RUTA DOCUMENTO VACÍA
  // ============================================================
  it('debería lanzar un error si la ruta del documento está vacía', async () => {
    const inputData = {
      title: 'Sistema de Gestión',
      tipo: 'Investigación',
      rutaDocumento: '',
      idEstudiante: '1234567890',
      descripcion: 'Proyecto de grado'
    };

    createProjectSpy.mockRejectedValue(new Error('Ya existe un proyecto con el mismo título o estudiante'));

    await expect(ProjectService.createProject(inputData))
      .rejects.toThrow('Ya existe un proyecto con el mismo título o estudiante');
  });

  // ============================================================
  // 5. PROYECTO DUPLICADO
  // ============================================================
  it('debería lanzar un error si ya existe un proyecto con el mismo título', async () => {
    const inputData = {
      title: 'Proyecto Existente',
      tipo: 'Investigación',
      rutaDocumento: '/uploads/proyecto.pdf',
      idEstudiante: '1234567890',
      descripcion: 'Proyecto de grado'
    };

    createProjectSpy.mockRejectedValue(new Error('Ya existe un proyecto con el mismo título o estudiante'));

    await expect(ProjectService.createProject(inputData))
      .rejects.toThrow('Ya existe un proyecto con el mismo título o estudiante');
  });

  // ============================================================
  // 6. ESTUDIANTE CON PROYECTO EXISTENTE
  // ============================================================
  it('debería lanzar un error si el estudiante ya tiene un proyecto', async () => {
    const inputData = {
      title: 'Nuevo Proyecto',
      tipo: 'Investigación',
      rutaDocumento: '/uploads/proyecto.pdf',
      idEstudiante: '9999999999',
      descripcion: 'Proyecto de grado'
    };

    createProjectSpy.mockRejectedValue(new Error('Ya existe un proyecto con el mismo título o estudiante'));

    await expect(ProjectService.createProject(inputData))
      .rejects.toThrow('Ya existe un proyecto con el mismo título o estudiante');
  });

});