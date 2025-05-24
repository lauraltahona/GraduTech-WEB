import { useState, useEffect } from "react";
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

//Laura, esto lo quitas, es solo por probar
const projectData = {
  title: "Proyecto de graduación",
  type: "Tesis de Grado",
  status: "Aprobado",
  studentId: "2020-1234",
  studentName: "Juan Carlos Pérez",
  advisor: "Dr. María González",
  startDate: "Enero 2023",
  endDate: "Diciembre 2023",
  description:
    "Sistema de gestión académica para optimizar los procesos administrativos y mejorar la experiencia estudiantil en instituciones educativas.",
  progress: 100,
  grade: "Excelente",
  documentSize: "2.4 MB",
  lastModified: "15 de Enero, 2024",
};

export default function MiProyecto() {
  const [proyecto, setProyecto] = useState(null);
  const id_usuario = localStorage.getItem("userId");

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

  return (
    <div className="my-project-container">
      {/* Header */}
      <div className="page-header">
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
            {/* Tipo de proyecto: {proyecto.type} */}
            <p className="project-type">{projectData.type}</p>
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
            {/* Descripcion del proyecto: {proyecto.description} */}
            <p className="project-description">{projectData.description}</p>
          </div>

          {/* Project Details Grid */}
          <div className="project-details-grid">
            <div className="detail-card">
              <div className="detail-icon">
                <User />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Estudiante</h4>
                <p className="detail-value">{projectData.studentName}</p>
                <p className="detail-subtitle">ID: {projectData.studentId}</p>
              </div>
            </div>

            <div className="detail-card">
              <div className="detail-icon">
                <User />
              </div>
              <div className="detail-content">
                <h4 className="detail-title">Asesor</h4>
                <p className="detail-value">{projectData.advisor}</p>
                <p className="detail-subtitle">Director de tesis</p>
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
                <h4 className="document-title">Documento de Tesis</h4>
                <div className="document-meta">
                  <span className="document-size">
                    {projectData.documentSize}
                  </span>
                  <span className="document-separator">•</span>
                  <span className="document-date">
                    <Clock size={14} />
                    Modificado: {projectData.lastModified}
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
            <button className="action-button primary">
              <Edit size={18} />
              <span>Editar Proyecto</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
