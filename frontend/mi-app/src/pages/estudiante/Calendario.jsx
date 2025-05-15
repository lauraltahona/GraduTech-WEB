import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const fechasImportantes = [
  { fecha: new Date(2025, 4, 20), descripcion: 'Entrega de avance 1' },
  { fecha: new Date(2025, 4, 27), descripcion: 'Revisión del jurado' },
];

export default function Calendario() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const obtenerEntrega = (fecha) => {
    return fechasImportantes.find(f =>
      f.fecha.toDateString() === fecha.toDateString()
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-green-50 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Calendario de Entregas</h2>
      
      <Calendar
        onClickDay={(value) => setFechaSeleccionada(value)}
        tileClassName={({ date }) => {
          return fechasImportantes.some(f =>
            f.fecha.toDateString() === date.toDateString()
          )
            ? 'marcado'
            : null;
        }}
      />

      {fechaSeleccionada && (
        <div className="mt-4 p-3 border rounded-lg bg-white shadow">
          <h3 className="text-green-700 font-semibold">
            {fechaSeleccionada.toDateString()}
          </h3>
          <p>
            {obtenerEntrega(fechaSeleccionada)?.descripcion || 'Sin entregas programadas.'}
          </p>
        </div>
      )}
    </div>
  );
}
