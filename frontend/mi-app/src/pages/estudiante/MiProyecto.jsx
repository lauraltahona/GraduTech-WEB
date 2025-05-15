import { useState, /*useEffect*/ } from "react";

export default function MiProyecto() {
  const [proyecto, /*setProyecto*/] = useState({
    titulo: "Gestión de procesos de grado",
    tipo: "Pasantía",
    estado: "En revisión por asesor",
    asesor: "Dra. Mariana Pérez",
    entregas: [
      {
        numero: 1,
        fecha: "2025-03-12",
        archivo: "entrega1.pdf",
        comentario: "Revisar la redacción del marco teórico."
      },
      {
        numero: 2,
        fecha: "2025-04-10",
        archivo: "entrega2.pdf",
        comentario: "Agregar resultados del estudio de caso."
      }
    ]
  });

  return (
    <div className="min-h-screen bg-green-50 p-8 font-sans">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Mi Proyecto</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-green-700">Título</h2>
          <p className="text-gray-800">{proyecto.titulo}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Tipo</h2>
          <p className="text-gray-800">{proyecto.tipo}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Estado</h2>
          <p className="text-gray-800">{proyecto.estado}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Asesor Asignado</h2>
          <p className="text-gray-800">{proyecto.asesor}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-green-700">Entregas</h2>
          <ul className="list-disc list-inside text-gray-700">
            {proyecto.entregas.map((entrega) => (
              <li key={entrega.numero} className="mb-2">
                <span className="font-semibold">Entrega {entrega.numero}</span> ({entrega.fecha}) - <a className="text-green-600 underline" href={`/${entrega.archivo}`}>Ver archivo</a>
                <p className="ml-4 text-sm text-gray-600 italic">"{entrega.comentario}"</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-right">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
            Subir nueva entrega
          </button>
        </div>
      </div>
    </div>
  );
}