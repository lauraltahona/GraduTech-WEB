import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/SubirEntrega.css'

export default function EntregaEstudiante() {
  const { id_plan_entrega } = useParams(); 
  const [descripcion, setDescripcion] = useState('');
  const idUsuario = localStorage.getItem('userId');
  const [preview, setPreview] = useState([]);
  const [rutaDocumento, setRutaDocumento] = useState('');
  const [entregasAnteriores, setEntregasAnteriores] = useState([]);
  const [errorEntregas, setErrorEntregas] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    const obtenerEntregasEstudiante = async () => {
      try {
        const res = await fetch(`http://localhost:5001/entrega/entrega-por-plan/${id_plan_entrega}`); 
        if (!res.ok) throw new Error('Error al obtener entregas anteriores');
        const data = await res.json();
        setEntregasAnteriores(data);
      } catch (error) {
        console.error('Error al traer entregas anteriores:', error);
        setErrorEntregas('No se pudieron cargar las entregas previas.');
      }
    };

    if (idUsuario) {
      obtenerEntregasEstudiante();
    }
  }, [id_plan_entrega, idUsuario]);
   
  const handleFileInput = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleFiles = (files) => {
    for (const file of files) {
      const validTypes = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
      ];

      if (!validTypes.includes(file.type)) {
        alert('Solo se permiten archivos PDF o Word');
        continue;
      }

      const reader = new FileReader();
      const id = `file-${Math.random().toString(32).substring(7)}`;

      reader.onload = () => {
        const fileUrl = reader.result;

        setPreview((prev) => [
          ...prev,
          {
            id,
            name: file.name,
            url: fileUrl,
            status: 'cargando',
            file,
            fileUrlServer: null,
          },
        ]);

        uploadFile(file, id);
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadFile = async (file, id) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setRutaDocumento(data.fileUrl);

      setPreview((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: 'subido', fileUrlServer: data.fileUrl }
            : item
        )
      );
    } catch (error) {
      console.error(error);
      setPreview((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: 'error' } : item
        )
      );
    }
  };

  const handleGuardar = async () => {
    if (!descripcion || !idUsuario || !rutaDocumento) {
      alert('Por favor completa todos los campos y sube un archivo.');
      return;
    }

    const data = {
      id_plan_entrega: id_plan_entrega,
      id_usuario: idUsuario,
      descripcion,
      ruta_documento: rutaDocumento,
    };

    
    try {
      const res = await fetch('http://localhost:5001/entrega/subir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( data ),
      });

      const result = await res.json();
      alert(result.message || 'Entrega subida con éxito');

      setDescripcion('');
      setRutaDocumento('');
      setPreview([]);
    } catch (error) {
      console.error('Error al subir entrega:', error);
      alert('Hubo un error al subir la entrega');
    }
  };

  const renderStatus = (file) => {
    switch (file.status) {
      case 'cargando':
        return <span className="text-yellow-600">Cargando...</span>;
      case 'subido':
        return (
          <span className="text-green-600">
            Archivo subido -{' '}
            <a
              href={`http://localhost:5001${file.fileUrlServer}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Ver archivo
            </a>
          </span>
        );
      case 'error':
        return <span className="text-red-600">Error al subir</span>;
      default:
        return null;
    }
  };

  return (
  <div className="contenedor-entregas-verdes">
    {entregasAnteriores.length > 0 ? (
      <>
        <h2 className="titulo-entregas-verdes">Entregas para este plan</h2>
        {errorEntregas && <p className="error-entregas-verdes">{errorEntregas}</p>}

        <div className="lista-tarjetas-verdes">
          {entregasAnteriores.map((entrega) => (
            <div key={entrega.id_entrega} className="tarjeta-entrega-verde">
              <p><span className="etiqueta-verde">ID:</span> {entrega.id_entrega}</p>
              <p><span className="etiqueta-verde">Fecha Envío:</span> {new Date(entrega.fecha_envio).toLocaleDateString()}</p>
              <p><span className="etiqueta-verde">Descripción:</span> {entrega.descripcion}</p>
              <p>
                <a
                  href={`http://localhost:5001${entrega.ruta_documento}`}
                  target="_blank"
                  rel="noreferrer"
                  className="enlace-documento-verde"
                >
                  📄Ver documento
                </a>
              </p>

              {entrega.retroalimentacion && (
                <p><span className="etiqueta-verde">Retroalimentación:</span> {entrega.retroalimentacion}</p>
              )}

              {entrega.ruta_retroalimentacion && (
                <p>
                  <a
                    href={`http://localhost:5001${entrega.ruta_retroalimentacion}`}
                    target="_blank"
                    rel="noreferrer"
                    className="enlace-documento-verde"
                  >
                    📄Ver documento de retroalimentación
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>

        <button className="boton-editar-verde">Editar entregas</button>
      </>
    ) : (
      <>
        <h1 className="titulo-subida-verde">Subir Entrega</h1>
        <div className="formulario-subida-verde">
          <div className="campo-formulario-verde">
            <label className="label-verde">Descripción</label>
            <input
              type="text"
              placeholder="Escribe una descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="input-verde"
            />
          </div>

          <div
            className="zona-drop-verde"
            onClick={() => inputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="drop-titulo-verde">Arrastra y suelta tu archivo aquí</p>
            <p className="drop-subtitulo-verde">O haz clic para seleccionar</p>
            <input
              type="file"
              hidden
              ref={inputRef}
              onChange={handleFileInput}
              accept=".pdf,.doc,.docx"
            />
          </div>

          {preview.length > 0 && (
            <div className="preview-verde">
              {preview.map((file) => (
                <div key={file.id} className="archivo-verde">
                  <span className="archivo-nombre-verde">{file.name}</span>
                  <span className="archivo-estado-verde">{renderStatus(file)}</span>
                </div>
              ))}
            </div>
          )}

          <button onClick={handleGuardar} className="boton-subida-verde">
            Subir Entrega
          </button>
        </div>
      </>
    )}
  </div>


);
}
