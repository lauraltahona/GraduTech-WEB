import { useState, useEffect } from "react";

export default function RevisionJurados() {
  const [jurados, setJurados] = useState([]);
  const [estadoFinal, setEstadoFinal] = useState("");
  const [mostrarSubida, setMostrarSubida] = useState(false);

  // Simular carga desde backend
  useEffect(() => {
    // Datos de ejemplo
    setJurados(["Dra. Ana Pérez", "Dr. Juan Gómez"]);
    setEstadoFinal("Aprobado para grado"); // Cambia a "Reprobado, repetir próximo semestre" para probar
    setMostrarSubida(true); // Solo true si fue aprobado
  }, []);

  const handleSubirRepositorio = () => {
    alert("Redirigir al formulario de subida al repositorio");
  };

  return (
    <div className="min-h-screen bg-green-50 p-8 font-sans">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        Revisión de Jurados
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-green-700 font-semibold text-lg">Jurados Asignados</h2>
          <ul className="list-disc list-inside mt-2 text-green-900">
            {jurados.map((jurado, index) => (
              <li key={index}>{jurado}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-green-700 font-semibold text-lg">Estado Final</h2>
          <p
            className={`mt-2 font-bold ${
              estadoFinal === "Aprobado para grado"
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {estadoFinal}
          </p>
        </div>

        {mostrarSubida && (
          <div>
            <button
              onClick={handleSubirRepositorio}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Subir a Repositorio Institucional
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
