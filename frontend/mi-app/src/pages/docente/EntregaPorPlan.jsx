import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const EntregasPorPlan = () => {
  const { id_plan_entrega } = useParams();
  const [entregas, setEntregas] = useState([]);
  const [error, setError] = useState('');
  const [retroData, setRetroData] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    const obtenerEntregas = async () => {
      setError('');
      setEntregas([]);

      try {
        const response = await fetch(`http://localhost:5001/entrega/entrega-por-plan/${id_plan_entrega}`);
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();

        if (data.length === 0) setError('No se encontraron entregas para este plan.');
        else setEntregas(data);
      } catch (err) {
        console.error('Error al obtener entregas:', err);
        setError('Hubo un error al consultar las entregas.');
      }
    };

    obtenerEntregas();
  }, [id_plan_entrega]);

  const toggleRetroForm = (idEntrega) => {
    setRetroData(prev => ({
      ...prev,
      [idEntrega]: {
        show: !prev[idEntrega]?.show,
        comentario: '',
        archivo: null,
        filePreview: '',
        status: ''
      }
    }));
  };

  const handleComentarioChange = (idEntrega, value) => {
    setRetroData(prev => ({
      ...prev,
      [idEntrega]: {
        ...prev[idEntrega],
        comentario: value
      }
    }));
  };

  const handleFileChange = (idEntrega, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setRetroData(prev => ({
        ...prev,
        [idEntrega]: {
          ...prev[idEntrega],
          archivo: file,
          filePreview: reader.result,
          status: 'Cargando...'
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUploadRetroalimentacion = async (idEntrega) => {
    const data = retroData[idEntrega];
    if (!data || !data.comentario ) {
      alert('Faltan campos por completar');
      return;
    }

    const formData = new FormData();
    formData.append('file', data.archivo);

    try {
      // Subir archivo
      const res = await fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Upload falló: ${res.status} - ${text}`);
      }
      const result = await res.json();
      const rutaDocumento = result.fileUrl;

      // Guardar retroalimentación
      const retro = {
        comentario: data.comentario,
        ruta_documento: rutaDocumento,
        id_entrega: idEntrega
      };

      const retroRes = await fetch(`http://localhost:5001/entrega/${idEntrega}/retroalimentacion`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(retro)
      });

      if (!retroRes.ok) {
        const text = await retroRes.text();
        throw new Error(`Retroalimentación falló: ${retroRes.status} - ${text}`);
      }
      const retroResult = await retroRes.json();

      alert('Retroalimentación guardada', retroResult);

      // Limpia el estado para ese id
      setRetroData(prev => ({
        ...prev,
        [idEntrega]: {
          show: false,
          comentario: '',
          archivo: null,
          filePreview: '',
          status: 'Retroalimentación guardada'
        }
      }));
    } catch (error) {
      console.error('Error al subir retroalimentación:', error);
      alert('Error al guardar retroalimentación');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Entregas para el plan #{id_plan_entrega}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {entregas.length > 0 ? (
        <table border="1" cellPadding="8" style={{ marginTop: '1rem', width: '100%' }}>
          <thead>
            <tr>
              <th>ID Entrega</th>
              <th>Fecha Envío</th>
              <th>Ruta Documento</th>
              <th>Descripción</th>
              <th>ID Estudiante</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {entregas.map((entrega) => (
              <React.Fragment key={entrega.idEntrega}>
                <tr>
                  <td>{entrega.idEntrega}</td>
                  <td>{new Date(entrega.fecha_envio).toLocaleDateString()}</td>
                  <td>
                    <a href={`http://localhost:5001${entrega.ruta_documento}`} target="_blank" rel="noopener noreferrer">
                      Ver documento
                    </a>
                  </td>
                  <td>{entrega.descripcion}</td>
                  <td>{entrega.id_estudiante}</td>
                  <td>
                    <button onClick={() => toggleRetroForm(entrega.idEntrega)}>
                      {retroData[entrega.idEntrega]?.show ? 'Cancelar' : 'Agregar retroalimentación'}
                    </button>
                  </td>
                </tr>

                {retroData[entrega.idEntrega]?.show && (
                  <tr>
                    <td colSpan="6">
                      <div style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
                        <label>
                          Comentario:
                          <textarea
                            rows="3"
                            value={retroData[entrega.idEntrega]?.comentario || ''}
                            onChange={(e) => handleComentarioChange(entrega.idEntrega, e.target.value)}
                            style={{ width: '100%', marginTop: '0.5rem' }}
                          />
                        </label>

                        <div style={{ marginTop: '0.5rem' }}>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFileChange(entrega.idEntrega, e.target.files[0])}
                            accept=".pdf,.doc,.docx"
                          />
                        </div>

                        {retroData[entrega.idEntrega]?.status && (
                          <p style={{ color: 'green', marginTop: '0.5rem' }}>
                            {retroData[entrega.idEntrega]?.status}
                          </p>
                        )}

                        <button
                          onClick={() => handleUploadRetroalimentacion(entrega.idEntrega)}
                          style={{ marginTop: '0.5rem' }}
                        >
                          Guardar retroalimentación
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Cargando entregas...</p>
      )}
    </div>
  );
};

export default EntregasPorPlan;
