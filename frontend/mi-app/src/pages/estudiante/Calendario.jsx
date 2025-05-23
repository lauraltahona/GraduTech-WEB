import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/Calendario.css'; // Asegúrate de tener este archivo

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
        const response = await fetch(`http://localhost:5001/entrega/fechas/${id_usuario}`);
        const data = await response.json();

        const fechas = data.map(entrega => ({
          fecha: new Date(entrega.fecha_limite),
          descripcion: entrega.titulo
        }));

        setFechasImportantes(fechas);
      } catch (error) {
        console.error('Error al cargar entregas:', error);
      }
    };

    obtenerEntregas();
  }, [id_usuario]);

  const obtenerEntrega = (fecha) => {
    return fechasImportantes.find(f => esMismaFecha(f.fecha, fecha));
  };

  return (
    <div className="calendario-container">
      <h2 className="titulo">📅 Calendario de Entregas</h2>
      <h3 className="subtitulo">¡Este es tu calendario! Aquí verás marcadas las fechas donde tienes que entregar algún avance.</h3>
      
      <div className="calendario-wrapper">
        <Calendar
          onClickDay={(value) => setFechaSeleccionada(value)}
          tileClassName={({ date }) =>
            fechasImportantes.some(f => esMismaFecha(f.fecha, date)) ? 'marcado' : null
          }
          tileContent={({ date, view }) => {
            const entrega = fechasImportantes.find(f => esMismaFecha(f.fecha, date));
            return entrega && view === 'month' ? (
              <abbr title={entrega.descripcion}>📌</abbr>
            ) : null;
          }}
        />
      </div>

      {fechaSeleccionada && (
        <div className="detalle-entrega">
          <h3>{fechaSeleccionada.toDateString()}</h3>
          <p>
            {obtenerEntrega(fechaSeleccionada)?.descripcion || 'Sin entregas programadas.'}
          </p>
        </div>
      )}
    </div>
  );
}
