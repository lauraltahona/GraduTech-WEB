"use client"
import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import "../../styles/docente/EntregaPorPlan.css";
import HeaderDocente from '../auth/HeaderDocente.jsx';
const EntregasPorPlan = () => {
  const { id_plan_entrega } = useParams()
  const [entregas, setEntregas] = useState([])
  const [error, setError] = useState("")
  const [retroData, setRetroData] = useState({})
  const fileInputRef = useRef(null)

  useEffect(() => {
    const obtenerEntregas = async () => {
      setError("")
      setEntregas([])

      try {
        const response = await fetch(`http://localhost:5001/entrega/entrega-por-plan/${id_plan_entrega}`)
        if (!response.ok) throw new Error("Error en la respuesta del servidor")
        const data = await response.json()

        if (data.length === 0) setError("No se encontraron entregas para este plan.")
        else setEntregas(data)
      } catch (err) {
        console.error("Error al obtener entregas:", err)
        setError("Hubo un error al consultar las entregas.")
      }
    }

    obtenerEntregas()
  }, [id_plan_entrega])

  const toggleRetroForm = (idEntrega) => {
    setRetroData((prev) => ({
      ...prev,
      [idEntrega]: {
        show: !prev[idEntrega]?.show,
        comentario: "",
        archivo: null,
        filePreview: "",
        status: "",
      },
    }))
  }

  const handleComentarioChange = (idEntrega, value) => {
    setRetroData((prev) => ({
      ...prev,
      [idEntrega]: {
        ...prev[idEntrega],
        comentario: value,
      },
    }))
  }

  const handleFileChange = (idEntrega, file) => {
  if (!file) return;

  const validTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (!validTypes.includes(file.type)) {
    setRetroData(prev => ({
      ...prev,
      [idEntrega]: {
        ...prev[idEntrega],
        status: "❌ Solo se permiten PDF o Word"
      }
    }));
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    setRetroData(prev => ({
      ...prev,
      [idEntrega]: {
        ...prev[idEntrega],
        archivo: file,
        filePreview: reader.result,
        status: "Subiendo archivo... ⏳"
      }
    }));
  };
  reader.readAsDataURL(file);

  // Subir el archivo inmediatamente
  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) throw new Error("Error en subida");
      const result = await res.json();

      setRetroData(prev => ({
        ...prev,
        [idEntrega]: {
          ...prev[idEntrega],
          ruta_retro: result.fileUrl, // Guardamos la URL aquí
          status: "✅ Archivo subido correctamente"
        }
      }));
      
    } catch (error) {
      console.error("Error subiendo archivo:", error);
      setRetroData(prev => ({
        ...prev,
        [idEntrega]: {
          ...prev[idEntrega],
          status: "❌ Error al subir archivo"
        }
      }));
    }
  };

  uploadFile();
};

const handleUploadRetroalimentacion = async (idEntrega) => {
  const data = retroData[idEntrega];
  
  if (!data?.comentario) {
    alert("Debes escribir un comentario");
    return;
  }

  try {
    setRetroData(prev => ({
      ...prev,
      [idEntrega]: { ...prev[idEntrega], status: "Guardando retroalimentación... ⏳" }
    }));

    const retroRes = await fetch(`http://localhost:5001/entrega/${idEntrega}/retroalimentacion`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        retroalimentacion: data.comentario,
        ruta_documento: data.ruta_retro // Usamos la URL ya subida
      })
    });

    if (!retroRes.ok) throw new Error("Error guardando retro");

    // Actualizar la lista de entregas con la nueva retroalimentación
    setEntregas(prev => prev.map(entrega => 
      entrega.idEntrega === idEntrega ? {
        ...entrega,
        retroalimentacion: data.comentario,
        ruta_retroalimentacion: data.ruta_retro
      } : entrega
    ));

    setRetroData(prev => ({
      ...prev,
      [idEntrega]: {
        show: false,
        comentario: "",
        archivo: null,
        filePreview: "",
        status: "✅ Retroalimentación guardada"
      }
    }));

  } catch (error) {
    console.error("Error:", error);
    setRetroData(prev => ({
      ...prev,
      [idEntrega]: {
        ...prev[idEntrega],
        status: `❌ Error: ${error.message}`
      }
    }));
  }
};

  return (
<>
  <HeaderDocente />
  <div className="contenedor-entregas">
    <div className="header-section">
      <h2 className="titulo-principal">Entregas para el plan #{id_plan_entrega}</h2>
    </div>

    {error && (
      <div className="mensaje-error">
        <span className="error-icon">⚠️</span>
        {error}
      </div>
    )}

    {entregas.length > 0 ? (
      <>
        <div className="tabla-container">
          <table className="tabla-entregas">
            <thead>
              <tr>
                <th>Fecha Envío</th>
                <th>Documento</th>
                <th>Descripción</th>
                <th>ID Estudiante</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {entregas.map((entrega) => (
                <tr className="fila-entrega" key={entrega.idEntrega}>
                  <td>{new Date(entrega.fecha_envio).toLocaleDateString()}</td>
                  <td>
                    <a
                      href={`http://localhost:5001${entrega.ruta_documento}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="enlace-documento"
                    >
                      📄 Ver documento
                    </a>
                  </td>
                  <td className="celda-descripcion">{entrega.descripcion}</td>
                  <td>
                    <span className="badge-estudiante">{entrega.id_estudiante}</span>
                  </td>
                  <td>
                    <button
                      className="btn-retro"
                      onClick={() => toggleRetroForm(entrega.idEntrega)}
                    >
                      {retroData[entrega.idEntrega]?.show
                        ? "✕ Cancelar"
                        : "💬 Agregar retroalimentación"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Retroalimentaciones existentes y formularios debajo de la tabla */}
        <div className="retroalimentaciones-contenedor">
          {entregas.map((entrega) => (
            <div key={`retro-${entrega.idEntrega}`} className="bloque-retro">
              {entrega.retroalimentacion && (
                <div className="retro-display">
                  <p className="retro-text">
                    📝 Retroalimentación dada: {entrega.retroalimentacion}
                  </p>
                  {entrega.ruta_retroalimentacion && (
                    <a
                      href={`http://localhost:5001${entrega.ruta_retroalimentacion}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="enlace-retro"
                    >
                      📎 Ver documento de retroalimentación
                    </a>
                  )}
                </div>
              )}

              {retroData[entrega.idEntrega]?.show && (
                <div className="retro-form">
                  <div className="form-header-deliveryForPlan">
                    <h4>Agregar Retroalimentación</h4>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Comentario:</label>
                    <textarea
                      rows="4"
                      value={retroData[entrega.idEntrega]?.comentario || ""}
                      onChange={(e) =>
                        handleComentarioChange(entrega.idEntrega, e.target.value)
                      }
                      className="textarea-retro"
                      placeholder="Escribe tu retroalimentación aquí..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Archivo adjunto (opcional):</label>
                    <div className="input-file-container">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) =>
                          handleFileChange(entrega.idEntrega, e.target.files[0])
                        }
                        accept=".pdf,.doc,.docx"
                        className="input-file"
                        id={`file-${entrega.idEntrega}`}
                      />
                      <label htmlFor={`file-${entrega.idEntrega}`} className="file-label">
                        📎 Seleccionar archivo
                      </label>
                    </div>
                  </div>

                  <div className="form-footer">
                    <button
                      className="btn-guardar-retro"
                      onClick={() => handleUploadRetroalimentacion(entrega.idEntrega)}
                    >
                      Guardar retroalimentación
                    </button>
                    <span className="estado-retro">{retroData[entrega.idEntrega]?.status}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    ) : (
      <p className="mensaje-sin-entregas">No hay entregas disponibles para mostrar.</p>
    )}
  </div>
</>
)
}

export default EntregasPorPlan
