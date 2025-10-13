import { useState, useRef } from "react";
import "../../styles/estudiante/RegistrarProyecto.css";
import { Upload } from "lucide-react";

export default function EditarProyecto() {
  const [title, setTitle] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [preview, setPreview] = useState([]);
  const [rutaDocumento, setRutaDocumento] = useState("");
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
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
      ];

      if (!validTypes.includes(file.type)) {
        alert("Solo se permiten archivos PDF o Word");
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
            status: "Cargando...",
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
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5001/upload", {
        method: "POST",
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
                    {data.message} -{" "}
                    <a
                      href={`http://localhost:5001${data.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      Ver archivo
                    </a>
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
          item.id === id
            ? {
                ...item,
                status: <span className="text-red-600">Error al subir</span>,
              }
            : item
        )
      );
    }
  };

  const handleGuardar = async () => {
    if (!title || !descripcion || !rutaDocumento) {
      alert("Por favor completa todos los campos y sube un archivo.");
      return;
    }

    const proyecto = {
      title,
      descripcion,
      rutaDocumento: rutaDocumento
    };

    try {
        const idProyecto = localStorage.getItem("idProyecto");
      const res = await fetch(`http://localhost:5001/proyectos/update/${idProyecto}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proyecto),
      });

      const data = await res.json();
      alert("Proyecto actualizado exitosamente");
      console.log(data);

      // Limpiar campos si deseas
      setTitle("");
      setDescripcion("");
      setRutaDocumento("");
      setPreview([]);
    } catch (error) {
      console.error("Error al guardar proyecto:", error);
      alert("Hubo un error al guardar el proyecto");
    }
  };

  return (
    <div className="register-form-container">
      <div className="register-form-card">
        <div className="form-header-register-project">
          <h1 className="form-title-register-project">Actualizar Proyecto</h1>
          <p className="form-subtitle-register-project">
            Completa la información de tu proyecto académico
          </p>
        </div>

        <form className="form-content">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Título del proyecto
            </label>
            <input
              type="text"
              placeholder="Escribe el título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentId" className="form-label">
              Descripción
            </label>
            <input
              type="text"
              placeholder="Ej: 12345678"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Documento del proyecto</label>
            <div
              className="file-upload-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => inputRef.current.click()}
            >
              <div className="file-upload-content">
                <Upload className="upload-icon" />
                <div className="upload-text">
                  <p className="upload-primary">
                    Arrastra y suelta tu archivo aquí
                  </p>
                  <p className="upload-secondary">
                    O haz clic para seleccionar
                  </p>
                </div>
                <p className="upload-hint">PDF, DOC, DOCX</p>
              </div>
              <input
                className="file-input-hidden"
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
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary">
              Cancelar
            </button>
            <button type="button" onClick={handleGuardar} className="btn-primary">
              Guardar Proyecto
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
