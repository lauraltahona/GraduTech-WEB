import { useState, useEffect } from "react";
import {
  CheckCircle,
  Users,
  Upload,
  Award,
  Calendar,
  FileText,
  X,
} from "lucide-react";
import "../../styles/estudiante/revisionJurado.css";

export default function RevisionJurados() {
  const [jurados, setJurados] = useState([]);
  const [proyecto, setProyecto] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false); 
  // eslint-disable-next-line
  const [mostrarSubida, setMostrarSubida] = useState(false);

  useEffect(() => {
    const idUsuario = localStorage.getItem("userId");

    if (!idUsuario) return;

    fetch(`http://localhost:5001/proyectos/obtener/${idUsuario}`)
      .then((res) => res.json())
      .then((data) => {
        setProyecto(data);
        setMostrarSubida(data.estado === "APROBADO");

        if (!data.idJurado) {
          setJurados([
            {
              name: "No tienes jurado asignado",
              role: "-",
              specialty: "-",
              status: "Pendiente",
            },
          ]);
          return;
        }

        fetch(`http://localhost:5001/jurado/getById/${data.idJurado}`)
          .then((res) => res.json())
          .then((jurado) => {
            if (!jurado || !jurado.user) {
              setJurados([
                {
                  name: "No tienes jurado asignado",
                  role: "-",
                  specialty: "-",
                  status: "Pendiente",
                },
              ]);
              return;
            }
            setJurados([
              {
                name: jurado.user.nombre || "Sin nombre",
                role: "Jurado Principal",
                specialty: jurado.carrera || "Sin especialidad",
                status: jurado.idJurado || "Pendiente",
              },
            ]);
          })
          .catch(() => {
            setJurados([
              {
                name: "Error al cargar jurado",
                role: "-",
                specialty: "-",
                status: "Pendiente",
              },
            ]);
          });
      });
  }, []);

  const handleAutorizacion = async () => {
    try {
      const res = await fetch("http://localhost:5001/proyectos/autorizacion", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idProyecto: proyecto.idProyecto,
          autorizacion_repositorio: "SI",
        }),
      });

      if (res.ok) {
        alert("✅ Autorización enviada con éxito");
        setMostrarModal(false);
      } else {
        alert("❌ Hubo un error al enviar la autorización");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="jury-review-container">
      <div className="page-header">
        <div className="header-content-juryReview">
          <div className="header-icon">
            <Users />
          </div>
          <div className="header-text-juryReview">
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
            {jurados.map((jury, index) => (
              <div key={index} className="jury-card">
                <div className="jury-avatar">
                  <span>
                    {jury.name.split(" ")[0][0]}
                    {jury.name.split(" ")[1][0]}
                  </span>
                </div>
                <div className="jury-info">
                  <h3 className="jury-name">{jury.name}</h3>
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

          {proyecto && (
            <div className="final-status">
              <div className="status-content">
                <div className="status-icon">
                  <CheckCircle />
                </div>
                <div className="status-text">
                  <h3 className="status-title">{proyecto.estado}</h3>
                  <p className="status-description">
                    {proyecto.estado === "APROBADO"
                      ? "Tu proyecto ha sido aprobado por el jurado evaluador. ¡Felicidades!"
                      : "Tu proyecto aún no ha sido aprobado o está en revisión por los jurados."}
                  </p>
                </div>
              </div>

              <div className="status-details">
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>Fecha: {formatearFecha(proyecto.updatedAt)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 👇 Mostrar solo si el estado es APROBADO */}
        {proyecto?.estado === "APROBADO" && (
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
              <p className="actions-description">
                ¿Deseas darnos la autorización para subir tu proyecto al
                repositorio?
              </p>

              <div className="additional-actions">
                <button
                  className="secondary-button"
                  onClick={() => setMostrarModal(true)} // 👈 abre el modal
                >
                  <FileText size={16} />
                  <span>Dar autorización</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🧾 Modal de términos y condiciones */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setMostrarModal(false)}>
              <X size={18} />
            </button>
            <h3>📜 Términos y Condiciones</h3>
            <p>
              Al aceptar, autorizas que tu proyecto sea publicado en el
              repositorio institucional de la Universidad. Tu trabajo podrá ser
              consultado por la comunidad académica y será de acceso público con
              fines educativos y de investigación. Conservas los derechos de
              autor sobre tu obra.
            </p>
            <p>¿Deseas continuar con la autorización?</p>
            <div className="modal-buttons">
              <button
                className="accept-button"
                onClick={handleAutorizacion}
              >
                Aceptar y autorizar
              </button>
              <button
                className="cancel-button"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
