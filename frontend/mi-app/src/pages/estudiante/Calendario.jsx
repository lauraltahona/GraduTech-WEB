import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarDays } from "lucide-react";
import "../../styles/estudiante/Calendario.css"; // Asegúrate de tener este archivo

export default function Calendario({ idEstudiante }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [fechasImportantes, setFechasImportantes] = useState([]);
  const id_usuario = localStorage.getItem("userId");

  const esMismaFecha = (f1, f2) =>
    f1.getFullYear() === f2.getFullYear() &&
    f1.getMonth() === f2.getMonth() &&
    f1.getDate() === f2.getDate();

  useEffect(() => {
    const obtenerEntregas = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/entrega/fechas/${id_usuario}`
        );
        const data = await response.json();

        const fechas = data.map((entrega) => ({
          fecha: new Date(entrega.fecha_limite),
          descripcion: entrega.titulo,
        }));

        setFechasImportantes(fechas);
      } catch (error) {
        console.error("Error al cargar entregas:", error);
      }
    };

    obtenerEntregas();
  }, [id_usuario]);

  const obtenerEntrega = (fecha) => {
    return fechasImportantes.find((f) => esMismaFecha(f.fecha, fecha));
  };

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <div className="header-content-calendar">
          <div className="header-icon">
            <CalendarDays />
          </div>
          <div className="header-text-calendar">
            <h1 className="page-title">Calendario de Entregas</h1>
            <p className="page-subtitle">
              ¡Este es tu calendario! Aquí verás marcadas las fechas donde
              tienes que entregar algún avance.
            </p>
          </div>
        </div>
      </div>

      {/* Calendar Container */}
      <div className="calendar-wrapper">
        <Calendar
          onClickDay={(value) => setFechaSeleccionada(value)}
          tileClassName={({ date }) =>
            fechasImportantes.some((f) => esMismaFecha(f.fecha, date))
              ? "marcado"
              : null
          }
          tileContent={({ date, view }) => {
            const entrega = fechasImportantes.find((f) =>
              esMismaFecha(f.fecha, date)
            );
            return entrega && view === "month" ? (
              <abbr title={entrega.descripcion}>📌</abbr>
            ) : null;
          }}
        />
      </div>

      {fechaSeleccionada && (
        <div className="detalle-entrega">
          <h3>{fechaSeleccionada.toDateString()}</h3>
          <p>
            {obtenerEntrega(fechaSeleccionada)?.descripcion ||
              "Sin entregas programadas."}
          </p>
        </div>
      )}
    </div>
  );
}
