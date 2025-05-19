import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function EntregaEstudiante() {
  const { id_plan_entrega } = useParams(); 
  const [descripcion, setDescripcion] = useState('');
  const idUsuario = localStorage.getItem('userId');
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
    console.log(data);
    
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
    <div className="min-h-screen bg-green-100 p-8 font-sans">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Subir Entrega</h1>

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <div>
          <label className="block text-green-700 font-semibold mb-1">Descripción</label>
          <input
            type="text"
            placeholder="Escribe una descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border border-green-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>


        <div
          className="border-2 border-dashed border-green-400 rounded-xl p-6 text-center cursor-pointer hover:bg-green-50"
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
          <div className="bg-green-50 rounded p-4 space-y-4 border border-green-200">
            {preview.map((file) => (
              <div key={file.id} className="flex flex-col text-green-800">
                <span className="font-semibold">{file.name}</span>
                <span className="text-sm">{renderStatus(file)}</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleGuardar}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
        >
          Subir Entrega
        </button>
      </div>
    </div>
  );
}
