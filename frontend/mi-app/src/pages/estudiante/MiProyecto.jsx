import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  User,
  Download,
  Edit,
  Eye,
  Clock,
  BookOpen,
} from "lucide-react";
import "../../styles/estudiante/MiProyecto.css";
import "../../shared/shared.css";

export default function MiProyecto() {
  const [proyecto, setProyecto] = useState(null);
  const id_usuario = localStorage.getItem("userId");
  const navigate = useNavigate();
  useEffect(() => {
    if (!id_usuario) return;
    fetch(`http://localhost:5001/proyectos/obtener/${id_usuario}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la petición");
        return res.json();
      })
      .then((data) => {
        setProyecto(data);
      })
      .catch((error) => {
        console.error("Error al obtener el proyecto:", error);
      });
  }, [id_usuario]);

  if (!proyecto) {
    return <div className="loading">Cargando proyecto...</div>;
  }

  localStorage.setItem("idProyecto", proyecto.idProyecto)


  // Formateo de fecha
  const fechaFormateada = new Date(proyecto.createdAt).toLocaleDateString(
    "es-ES",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
  const handleEditar = () => {
    navigate("/menuEstudiante/editarProyecto");
  }
  return (
    <div className="my-project-container">
      {/* Header */}
      <div className="page-header-myProject">
        <div className="header-decoration">
          <div className="plant-icon">🌱</div>
          <h1 className="page-title">Mi Proyecto</h1>
          <div className="plant-icon">🌿</div>
        </div>
        <p className="page-subtitle">
          Información detallada de tu proyecto académico
        </p>
      </div>

      {/* Project Card */}
      <div className="project-card">
        <div className="project-header">
          <div className="project-icon">
            <BookOpen />
          </div>
          <div className="project-basic-info">
            <h2 className="project-title">{proyecto.title}</h2>
            <p className="project-type">Proyecto de Grado</p>
          </div>
          <div className="project-status">
            <div className="status-badge approved">
              <CheckCircle size={16} />
              <span>{proyecto.estado}</span>
            </div>
          </div>
        </div>

        <div className="project-content">
          {/* Description */}
          <div className="project-section">
            <h3 className="section-title-project">Descripción del Proyecto</h3>
            <p className="project-description">
              {proyecto.descripcion || "Sin descripción disponible."}
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="project-details-grid">
            <div className="detail-card">
              <div className="detail-icon">
                <User />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Estudiante</h4>
                <p className="detail-value">ID: {proyecto.idEstudiante}</p>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">
                <User />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Asesor</h4>
                <p className="detail-value">ID: {proyecto.idDocente}</p>
              </div>
            </div>
          </div>

          {/* Document Section */}
          <div className="project-section">
            <h3 className="section-title-project">Documento Final</h3>
            <div className="document-card">
              <div className="document-icon">
                <FileText />
              </div>
              <div className="document-info">
                <h4 className="document-title">Documento del Proyecto</h4>
                <div className="document-meta">
                  <span className="document-size">Desconocido</span>
                  <span className="document-separator">•</span>
                  <span className="document-date">
                    <Clock size={14} />
                    Modificado: {fechaFormateada}
                  </span>
                </div>
              </div>
              <div className="document-actions">
                <button className="action-button secondary">
                  <Eye size={16} />
                  <a
                    href={`http://localhost:5001${proyecto.rutaDocumento}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver documento final
                  </a>
                </button>
                <button className="action-button secondary">
                  <Download size={16} />
                  <span>Descargar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="project-actions">
            <button className="action-button primary" onClick={handleEditar}>
              <Edit size={18} />
              <span>Editar Proyecto</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
