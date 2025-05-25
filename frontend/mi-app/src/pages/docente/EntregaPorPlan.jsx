"use client"
import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import "../../styles/docente/EntregaPorPlan.css";
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
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setRetroData((prev) => ({
        ...prev,
        [idEntrega]: {
          ...prev[idEntrega],
          archivo: file,
          filePreview: reader.result,
          status: "Cargando...",
        },
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleUploadRetroalimentacion = async (idEntrega) => {
    const data = retroData[idEntrega]
    if (!data || !data.comentario) {
      alert("Faltan campos por completar")
      return
    }

    const formData = new FormData()
    formData.append("file", data.archivo)

    try {
      const res = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(`Upload falló: ${res.status} - ${text}`)
      }
      const result = await res.json()
      const rutaDocumento = result.fileUrl

      const retro = {
        comentario: data.comentario,
        ruta_documento: rutaDocumento,
        id_entrega: idEntrega,
      }

      const retroRes = await fetch(`http://localhost:5001/entrega/${idEntrega}/retroalimentacion`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(retro),
      })

      if (!retroRes.ok) {
        const text = await retroRes.text()
        throw new Error(`Retroalimentación falló: ${retroRes.status} - ${text}`)
      }
      const retroResult = await retroRes.json()

      alert("Retroalimentación guardada", retroResult)

      setRetroData((prev) => ({
        ...prev,
        [idEntrega]: {
          show: false,
          comentario: "",
          archivo: null,
          filePreview: "",
          status: "Retroalimentación guardada",
        },
      }))
    } catch (error) {
      console.error("Error al subir retroalimentación:", error)
      alert("Error al guardar retroalimentación")
    }
  }

  return (
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
                <React.Fragment key={entrega.idEntrega}>
                  <tr className="fila-entrega">
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
                      <button className="btn-retro" onClick={() => toggleRetroForm(entrega.idEntrega)}>
                        {retroData[entrega.idEntrega]?.show ? "✕ Cancelar" : "💬 Agregar retroalimentación"}
                      </button>
                    </td>
                  </tr>

                  {retroData[entrega.idEntrega]?.show && (
                    <tr className="fila-retro">
                      <td colSpan="6">
                        <div className="retro-form">
                          <div className="form-header">
                            <h4>Agregar Retroalimentación</h4>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Comentario:</label>
                            <textarea
                              rows="4"
                              value={retroData[entrega.idEntrega]?.comentario || ""}
                              onChange={(e) => handleComentarioChange(entrega.idEntrega, e.target.value)}
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
                                onChange={(e) => handleFileChange(entrega.idEntrega, e.target.files[0])}
                                accept=".pdf,.doc,.docx"
                                className="input-file"
                                id={`file-${entrega.idEntrega}`}
                              />
                              <label htmlFor={`file-${entrega.idEntrega}`} className="file-label">
                                📎 Seleccionar archivo
                              </label>
                            </div>
                          </div>

                          {retroData[entrega.idEntrega]?.status && (
                            <div className="estado-retro">
                              <span className="status-icon">ℹ️</span>
                              {retroData[entrega.idEntrega]?.status}
                            </div>
                          )}

                          <div className="form-actions">
                            <button
                              onClick={() => handleUploadRetroalimentacion(entrega.idEntrega)}
                              className="btn-guardar-retro"
                            >
                              💾 Guardar retroalimentación
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && (
          <div className="mensaje-cargando">
            <div className="spinner"></div>
            <p>Cargando entregas...</p>
          </div>
        )
      )}
    </div>
  )
}

export default EntregasPorPlan
