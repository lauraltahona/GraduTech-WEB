import { useState, useEffect } from "react";
import {
  CheckCircle,
  Users,
  Upload,
  Award,
  Calendar,
  FileText,
} from "lucide-react";
import "../../styles/estudiante/revisionJurado.css";

const juryMembers = [
  {
    name: "Dra. Ana Pérez",
    role: "Jurado Principal",
    specialty: "Ingeniería de Software",
    status: "Aprobado",
  },
  {
    name: "Dr. Juan Gómez",
    role: "Jurado Secundario",
    specialty: "Sistemas de Información",
    status: "Aprobado",
  },
];

export default function RevisionJurados() {
  // const [jurados, setJurados] = useState([]);
  // const [estadoFinal, setEstadoFinal] = useState("");
  const [mostrarSubida, setMostrarSubida] = useState(false);

  // Simular carga desde backend
  // useEffect(() => {
  //   // Datos de ejemplo
  //   setJurados(["Dra. Ana Pérez", "Dr. Juan Gómez"]);
  //   setEstadoFinal("Aprobado para grado"); // Cambia a "Reprobado, repetir próximo semestre" para probar
  //   setMostrarSubida(true); // Solo true si fue aprobado
  // }, []);

  const handleSubirRepositorio = () => {
    alert("Redirigir al formulario de subida al repositorio");
  };

  return (
    <div className="jury-review-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-icon">
            <Users />
          </div>
          <div className="header-text">
            <h1 className="page-title">Revisión de Jurados</h1>
            <p className="page-subtitle">
              Estado de evaluación y aprobación del proyecto
            </p>
          </div>
        </div>
      </div>

      <div className="content-grid">
        {/* Jurados Asignados */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-icon">
              <Users />
            </div>
            <h2 className="section-title">Jurados Asignados</h2>
          </div>

          <div className="jury-list">
            {juryMembers.map((jury, index) => (
              <div key={index} className="jury-card">
                <div className="jury-avatar">
                  <span>
                    {jury.name.split(" ")[0][0]}
                    {jury.name.split(" ")[1][0]}
                  </span>
                </div>
                <div className="jury-info">
                  <h3 className="jury-name">{jury.name}</h3>
                  <p className="jury-role">{jury.role}</p>
                  <p className="jury-specialty">{jury.specialty}</p>
                </div>
                <div className="jury-status">
                  <div className="status-badge approved">
                    <CheckCircle size={16} />
                    <span>{jury.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estado Final */}
        <div className="section-card">
          <div className="section-header">
            <div className="section-icon success">
              <Award />
            </div>
            <h2 className="section-title">Estado Final</h2>
          </div>

          <div className="final-status">
            <div className="status-content">
              <div className="status-icon">
                <CheckCircle />
              </div>
              <div className="status-text">
                <h3 className="status-title">Aprobado para grado</h3>
                <p className="status-description">
                  Tu proyecto ha sido aprobado por el jurado evaluador. Puedes
                  proceder con la sustentación final.
                </p>
              </div>
            </div>

            <div className="status-details">
              <div className="detail-item">
                <Calendar size={16} />
                <span>Fecha de aprobación: 15 de Enero, 2024</span>
              </div>
              <div className="detail-item">
                <FileText size={16} />
                <span>Calificación: Excelente</span>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="section-card actions-card">
          <div className="section-header">
            <div className="section-icon">
              <Upload />
            </div>
            <h2 className="section-title">Próximos Pasos</h2>
          </div>

          <div className="actions-content">
            <p className="actions-description">
              Con la aprobación del jurado, ahora puedes subir tu proyecto al
              repositorio institucional.
            </p>

            {mostrarSubida && (
              <button className="upload-button">
                <Upload size={20} />
                <span>Subir a Repositorio Institucional</span>
              </button>
            )}

            <div className="additional-actions">
              <button
                className="secondary-button"
                onClick={handleSubirRepositorio}
              >
                <FileText size={16} />
                <span>Descargar Certificado</span>
              </button>
              <button className="secondary-button">
                <Calendar size={16} />
                <span>Programar Sustentación</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
