import { useState, useRef } from 'react';
import '../styles/RegistrarProyecto.css';
export default function ProyectoEstudiante() {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('Pasantía');
  const [idEstudiante, setIdEstudiante] = useState('');
  const [preview, setPreview] = useState([]);
  const [rutaDocumento, setRutaDocumento] = useState('');
  const inputRef = useRef(null);

  const handleFileInput = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
            status: 'Cargando...',
            file,
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

      setRutaDocumento(data.fileUrl); // ⬅️ Guarda la ruta para usarla después

      setPreview((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: (
                  <span className="text-green-600">
                    {data.message} - <a href={`http://localhost:5001${data.fileUrl}`} target="_blank" rel="noreferrer" className="underline">Ver archivo</a>
                  </span>
                ),
              }
            : item
        )
      );
    } catch (error) {
      console.error(error);
      setPreview((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: <span className="text-red-600">Error al subir</span> } : item
        )
      );
    }
  };

  const handleGuardar = async () => {
    if (!titulo || !tipo || !idEstudiante || !rutaDocumento) {
      alert('Por favor completa todos los campos y sube un archivo.');
      return;
    }

    const proyecto = {
      titulo,
      tipo,
      ruta_documento: rutaDocumento,
      id_estudiante: idEstudiante
    };

    try {
      const res = await fetch('http://localhost:5001/proyectos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(proyecto)
      });

      const data = await res.json();
      alert('Proyecto guardado exitosamente');
      console.log(data);

      // Limpiar campos si deseas
      setTitulo('');
      setTipo('Pasantía');
      setIdEstudiante('');
      setRutaDocumento('');
      setPreview([]);

    } catch (error) {
      console.error('Error al guardar proyecto:', error);
      alert('Hubo un error al guardar el proyecto');
    }
  };

  return (
    <div className="min-h-screen bg-green-gradient p-8">
      <h1 className="title">Registrar Proyecto</h1>

      <div className="max-w-2xl mx-auto form-card space-y-6">
        <div>
          <label className="block text-green-700 font-semibold mb-1">Título del proyecto</label>
          <input
            type="text"
            placeholder="Escribe el título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-green-700 font-semibold mb-1">Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="select-field"
          >
            <option value="Pasantía">Pasantía</option>
            <option value="Proyecto de grado">Proyecto de grado</option>
          </select>
        </div>

        <div>
          <label className="block text-green-700 font-semibold mb-1">ID del estudiante</label>
          <input
            type="text"
            placeholder="Ej: 12345678"
            value={idEstudiante}
            onChange={(e) => setIdEstudiante(e.target.value)}
            className="input-field"
          />
        </div>

        <div
          className="drop-zone"
          onClick={() => inputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className="text-green-700 text-lg font-semibold mb-2">Arrastra y suelta tu archivo aquí</p>
          <p className="text-sm text-green-600">O haz clic para seleccionar</p>
          <input
            type="file"
            hidden
            ref={inputRef}
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx"
          />
        </div>

        {preview.length > 0 && (
          <div className="preview-box">
            {preview.map((file) => (
              <div key={file.id} className="flex flex-col text-green-800">
                <span className="font-semibold">{file.name}</span>
                <span className="text-sm">{file.status}</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleGuardar}
          className="save-button"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
