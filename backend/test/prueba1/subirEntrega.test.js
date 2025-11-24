import { jest } from '@jest/globals';
import { EntregaModel } from '../../models/entrega-model.js';

describe('EntregaModel - subirEntrega', () => {
  let subirEntregaSpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    subirEntregaSpy = jest.spyOn(EntregaModel, 'subirEntrega');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debería subir una entrega exitosamente', async () => {
    const mockData = {
      id: 1,
      id_plan_entrega: 1,
      id_estudiante: 1,
      fecha_envio: new Date(),
      ruta_documento: '/uploads/doc.pdf',
      descripcion: 'Entrega final'
    };

    const inputData = {
      id_plan_entrega: 1,
      id_usuario: '123456789',
      ruta_documento: '/uploads/doc.pdf',
      descripcion: 'Entrega final',
      correo_docente: 'docente@unicesar.edu.co'
    };

    subirEntregaSpy.mockResolvedValue(mockData);

    const result = await EntregaModel.subirEntrega(
      inputData.id_plan_entrega,
      inputData.id_usuario,
      inputData.ruta_documento,
      inputData.descripcion,
      inputData.correo_docente
    );

    expect(result).toEqual(mockData);
    expect(subirEntregaSpy).toHaveBeenCalledWith(
      inputData.id_plan_entrega,
      inputData.id_usuario,
      inputData.ruta_documento,
      inputData.descripcion,
      inputData.correo_docente
    );
  });

  it('debería lanzar un error si el formato del archivo no es válido', async () => {
    const inputData = {
      id_plan_entrega: 1,
      id_usuario: '999999999',
      ruta_documento: '/uploads/doc.pdf',
      descripcion: 'Entrega final',
      correo_docente: 'docente@unicesar.edu.co'
    };

    subirEntregaSpy.mockRejectedValue(new Error('No se encontró un estudiante con ese usuario.'));

    await expect(EntregaModel.subirEntrega(
      inputData.id_plan_entrega,
      inputData.id_usuario,
      inputData.ruta_documento,
      inputData.descripcion,
      inputData.correo_docente
    )).rejects.toThrow('No se encontró un estudiante con ese usuario.');
  });
});