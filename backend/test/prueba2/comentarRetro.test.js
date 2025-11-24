import { jest } from '@jest/globals';
import { EntregaModel } from '../../models/entrega-model.js';

describe('Validación de EntregaModel.comentarRetroalimentación()', () => {
  let comentarRetroalimentacionSpy;

  beforeEach(() => {
    jest.restoreAllMocks();
    comentarRetroalimentacionSpy = jest.spyOn(EntregaModel, 'comentarRetroalimentación');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debería agregar retroalimentación exitosamente', async () => {
    const mockData = {
      success: true,
      message: 'Retroalimentación guardada correctamente.'
    };

    const inputData = {
      id_entrega: 1,
      retroalimentacion: 'Buen trabajo',
      ruta_retroalimentacion: '/uploads/retro.pdf'
    };

    comentarRetroalimentacionSpy.mockResolvedValue(mockData);

    const result = await EntregaModel.comentarRetroalimentación(
      inputData.id_entrega,
      inputData.retroalimentacion,
      inputData.ruta_retroalimentacion
    );

    expect(result).toEqual(mockData);
    expect(comentarRetroalimentacionSpy).toHaveBeenCalledWith(
      inputData.id_entrega,
      inputData.retroalimentacion,
      inputData.ruta_retroalimentacion
    );
  });

  it('debería lanzar un error si la retroalimentación está vacía', async () => {
    const inputData = {
      id_entrega: 1,
      retroalimentacion: '',
      ruta_retroalimentacion: '/uploads/retro.pdf'
    };

    comentarRetroalimentacionSpy.mockResolvedValue({
      success: false,
      message: 'La retroalimentación es obligatoria.'
    });

    const result = await EntregaModel.comentarRetroalimentación(
      inputData.id_entrega,
      inputData.retroalimentacion,
      inputData.ruta_retroalimentacion
    );

    expect(result.success).toBe(false);
    expect(result.message).toBe('La retroalimentación es obligatoria.');
  });

  it('debería lanzar un error si la entrega no existe', async () => {
    const inputData = {
      id_entrega: 999,
      retroalimentacion: 'Buen trabajo',
      ruta_retroalimentacion: '/uploads/retro.pdf'
    };

    comentarRetroalimentacionSpy.mockResolvedValue({
      success: false,
      message: 'Entrega no encontrada.'
    });

    const result = await EntregaModel.comentarRetroalimentación(
      inputData.id_entrega,
      inputData.retroalimentacion,
      inputData.ruta_retroalimentacion
    );

    expect(result.success).toBe(false);
    expect(result.message).toBe('Entrega no encontrada.');
  });
});